import { describe, expect, it } from 'vitest';
import { analytics, analyticsInternals } from '../src/analytics';
import type { Env } from '../src/types';

const jsonRequest = (body: unknown, headers: Record<string, string> = {}) => new Request(
  'https://api.duckcloud.info/v1/analytics/page-view',
  { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://duckcloud.info', ...headers }, body: JSON.stringify(body) },
);

class Statement {
  values: unknown[] = [];
  constructor(public query: string, private owner: FakeDb) {}
  bind(...values: unknown[]) { this.values = values; return this; }
  async run() { this.owner.executed.push(this); return { results: [], success: true, meta: {} }; }
  async first() { return { views: 12, blog: 7, tool: 5 }; }
  async all() {
    if (this.query.includes('GROUP BY day')) return { results: [{ day: '2026-09-05', views: 3, blog: 2, tool: 1 }], success: true, meta: {} };
    return { results: [{ kind: 'blog', identifier: 'hello-world', views: 7 }], success: true, meta: {} };
  }
}
class FakeDb {
  executed: Statement[] = [];
  prepared: Statement[] = [];
  prepare(query: string) { const statement = new Statement(query, this); this.prepared.push(statement); return statement; }
  async batch() { return []; }
}
const env = (db = new FakeDb()) => ({
  DB: db,
  MEDIA: { put: async () => null, delete: async () => undefined },
  ALLOWED_ORIGINS: 'https://duckcloud.info,http://localhost:3000',
  ADMIN_API_TOKEN: 'admin-secret',
}) as unknown as Env;

describe('analytics request validation', () => {
  it('accepts only canonical blog and tool identifiers', async () => {
    await expect(analyticsInternals.pageViewBody(jsonRequest({ kind: 'blog', identifier: 'hello-world' }))).resolves.toEqual({ kind: 'blog', identifier: 'hello-world' });
    await expect(analyticsInternals.pageViewBody(jsonRequest({ kind: 'tool', identifier: 'dns-lookup' }))).resolves.toEqual({ kind: 'tool', identifier: 'dns-lookup' });
    await expect(analyticsInternals.pageViewBody(jsonRequest({ kind: 'page', identifier: 'hello-world' }))).rejects.toMatchObject({ code: 'INVALID_KIND' });
    await expect(analyticsInternals.pageViewBody(jsonRequest({ kind: 'blog', identifier: '../Admin' }))).rejects.toMatchObject({ code: 'INVALID_IDENTIFIER' });
  });

  it('rejects extra fields and oversized payloads', async () => {
    await expect(analyticsInternals.pageViewBody(jsonRequest({ kind: 'blog', identifier: 'hello', referrer: 'private' }))).rejects.toMatchObject({ code: 'VALIDATION_ERROR' });
    await expect(analyticsInternals.pageViewBody(jsonRequest({ kind: 'blog', identifier: 'hello' }, { 'content-length': '513' }))).rejects.toMatchObject({ status: 413 });
  });

  it('bounds summary query controls', () => {
    expect(analyticsInternals.boundedInteger(null, 30, 90)).toBe(30);
    expect(() => analyticsInternals.boundedInteger('91', 30, 90)).toThrow(/between 1 and 90/);
    expect(analyticsInternals.rangeStart(7, new Date('2026-09-05T20:00:00Z'))).toBe('2026-08-30');
  });
});

describe('analytics endpoints', () => {
  it('stores only the UTC day, kind, identifier, and aggregate increment', async () => {
    const db = new FakeDb();
    const result = await analytics(jsonRequest({ kind: 'blog', identifier: 'hello-world' }), env(db), new URL('https://api.duckcloud.info/v1/analytics/page-view'), new Date('2026-09-05T23:59:00Z'));
    expect(result).toEqual({ status: 202, data: { accepted: true } });
    expect(db.executed).toHaveLength(1);
    expect(db.executed[0].query).toContain('ON CONFLICT(day,kind,identifier) DO UPDATE SET views=views+1');
    expect(db.executed[0].values).toEqual(['2026-09-05', 'blog', 'hello-world']);
  });

  it('requires an allowed origin for public ingestion', async () => {
    const request = jsonRequest({ kind: 'tool', identifier: 'dns-lookup' }, { origin: 'https://attacker.example' });
    await expect(analytics(request, env(), new URL(request.url))).rejects.toMatchObject({ status: 403, code: 'ORIGIN_REJECTED' });
  });

  it('protects and returns the admin summary contract', async () => {
    const db = new FakeDb();
    const unauthorized = new Request('https://api.duckcloud.info/v1/admin/analytics');
    await expect(analytics(unauthorized, env(db), new URL(unauthorized.url))).rejects.toMatchObject({ status: 401 });
    const request = new Request('https://api.duckcloud.info/v1/admin/analytics?days=7&limit=5', { headers: { authorization: 'Bearer admin-secret' } });
    const result = await analytics(request, env(db), new URL(request.url), new Date('2026-09-05T20:00:00Z'));
    expect(result?.status).toBe(200);
    expect(result?.data).toMatchObject({
      range: { days: 7, from: '2026-08-30', to: '2026-09-05' },
      totals: { views: 12, blog: 7, tool: 5 },
      recent_days: [{ day: '2026-09-05', views: 3, blog: 2, tool: 1 }],
      top_content: [{ kind: 'blog', identifier: 'hello-world', views: 7 }],
    });
  });
});
