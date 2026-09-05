import type { Env } from './types';

const KINDS = new Set(['blog', 'tool']);
const IDENTIFIER = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MAX_BODY_BYTES = 512;
const DEFAULT_DAYS = 30;
const MAX_DAYS = 90;
const DEFAULT_TOP_LIMIT = 10;
const MAX_TOP_LIMIT = 50;

export class AnalyticsError extends Error {
  constructor(public status: number, public code: string, message: string) {
    super(message);
  }
}

export type AnalyticsResult = { data: unknown; status: number };
type PageView = { kind: 'blog' | 'tool'; identifier: string };

const configuredOrigins = (env: Env) => (env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const requireAllowedOrigin = (request: Request, env: Env) => {
  const origin = request.headers.get('origin');
  if (!origin || !configuredOrigins(env).includes(origin)) {
    throw new AnalyticsError(403, 'ORIGIN_REJECTED', 'Request origin is not allowed.');
  }
};

const acceptsAdminToken = (request: Request, expectedToken?: string) => {
  if (!expectedToken) return false;
  const bearer = request.headers.get('authorization')?.match(/^Bearer\s+(.+)$/i)?.[1];
  return bearer === expectedToken || request.headers.get('x-duckcloud-admin-token') === expectedToken;
};

const pageViewBody = async (request: Request): Promise<PageView> => {
  if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) {
    throw new AnalyticsError(415, 'UNSUPPORTED_MEDIA_TYPE', 'Expected JSON.');
  }
  const declared = Number(request.headers.get('content-length') || 0);
  if (declared > MAX_BODY_BYTES) throw new AnalyticsError(413, 'PAYLOAD_TOO_LARGE', 'Analytics payload is too large.');
  const source = await request.text();
  if (new TextEncoder().encode(source).byteLength > MAX_BODY_BYTES) {
    throw new AnalyticsError(413, 'PAYLOAD_TOO_LARGE', 'Analytics payload is too large.');
  }
  let value: unknown;
  try { value = JSON.parse(source); } catch { throw new AnalyticsError(400, 'INVALID_JSON', 'Request body is not valid JSON.'); }
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new AnalyticsError(422, 'VALIDATION_ERROR', 'Analytics payload must be an object.');
  }
  const record = value as Record<string, unknown>;
  if (Object.keys(record).length !== 2 || !Object.hasOwn(record, 'kind') || !Object.hasOwn(record, 'identifier')) {
    throw new AnalyticsError(422, 'VALIDATION_ERROR', 'Only kind and identifier are accepted.');
  }
  if (typeof record.kind !== 'string' || !KINDS.has(record.kind)) {
    throw new AnalyticsError(422, 'INVALID_KIND', 'kind must be blog or tool.');
  }
  if (typeof record.identifier !== 'string' || record.identifier.length > 160 || !IDENTIFIER.test(record.identifier)) {
    throw new AnalyticsError(422, 'INVALID_IDENTIFIER', 'identifier must be a canonical lowercase slug.');
  }
  return { kind: record.kind as PageView['kind'], identifier: record.identifier };
};

const boundedInteger = (value: string | null, fallback: number, maximum: number) => {
  if (value === null || value === '') return fallback;
  if (!/^\d+$/.test(value)) throw new AnalyticsError(422, 'INVALID_QUERY', 'Analytics query values must be positive integers.');
  const parsed = Number(value);
  if (parsed < 1 || parsed > maximum) throw new AnalyticsError(422, 'INVALID_QUERY', `Analytics query value must be between 1 and ${maximum}.`);
  return parsed;
};

const utcDay = (date: Date) => date.toISOString().slice(0, 10);
const rangeStart = (days: number, current: Date) => {
  const start = new Date(Date.UTC(current.getUTCFullYear(), current.getUTCMonth(), current.getUTCDate()));
  start.setUTCDate(start.getUTCDate() - days + 1);
  return utcDay(start);
};

export async function analytics(request: Request, env: Env, url: URL, current = new Date()): Promise<AnalyticsResult | null> {
  if (url.pathname === '/v1/analytics/page-view') {
    if (request.method !== 'POST') throw new AnalyticsError(405, 'METHOD_NOT_ALLOWED', 'Method not allowed.');
    requireAllowedOrigin(request, env);
    const event = await pageViewBody(request);
    await env.DB.prepare(`INSERT INTO page_view_daily(day,kind,identifier,views) VALUES(?,?,?,1)
      ON CONFLICT(day,kind,identifier) DO UPDATE SET views=views+1`)
      .bind(utcDay(current), event.kind, event.identifier).run();
    return { data: { accepted: true }, status: 202 };
  }

  if (url.pathname === '/v1/admin/analytics') {
    if (request.method !== 'GET') throw new AnalyticsError(405, 'METHOD_NOT_ALLOWED', 'Method not allowed.');
    if (!acceptsAdminToken(request, env.ADMIN_API_TOKEN)) {
      throw new AnalyticsError(401, 'ADMIN_TOKEN_REJECTED', 'The website and API tokens do not match.');
    }
    const days = boundedInteger(url.searchParams.get('days'), DEFAULT_DAYS, MAX_DAYS);
    const topLimit = boundedInteger(url.searchParams.get('limit'), DEFAULT_TOP_LIMIT, MAX_TOP_LIMIT);
    const from = rangeStart(days, current);
    const to = utcDay(current);
    const [totals, recent, top] = await Promise.all([
      env.DB.prepare(`SELECT COALESCE(SUM(views),0) views,
        COALESCE(SUM(CASE WHEN kind='blog' THEN views ELSE 0 END),0) blog,
        COALESCE(SUM(CASE WHEN kind='tool' THEN views ELSE 0 END),0) tool
        FROM page_view_daily`).first(),
      env.DB.prepare(`SELECT day,SUM(views) views,
        SUM(CASE WHEN kind='blog' THEN views ELSE 0 END) blog,
        SUM(CASE WHEN kind='tool' THEN views ELSE 0 END) tool
        FROM page_view_daily WHERE day>=? AND day<=? GROUP BY day ORDER BY day`).bind(from, to).all(),
      env.DB.prepare(`SELECT kind,identifier,SUM(views) views FROM page_view_daily
        WHERE day>=? AND day<=? GROUP BY kind,identifier ORDER BY views DESC,kind,identifier LIMIT ?`).bind(from, to, topLimit).all(),
    ]);
    return {
      status: 200,
      data: {
        generated_at: current.toISOString(),
        range: { days, from, to },
        totals: totals || { views: 0, blog: 0, tool: 0 },
        recent_days: recent.results,
        top_content: top.results,
      },
    };
  }

  return null;
}

export const analyticsInternals = {
  KINDS,
  IDENTIFIER,
  MAX_BODY_BYTES,
  DEFAULT_DAYS,
  MAX_DAYS,
  DEFAULT_TOP_LIMIT,
  MAX_TOP_LIMIT,
  pageViewBody,
  boundedInteger,
  rangeStart,
  acceptsAdminToken,
};
