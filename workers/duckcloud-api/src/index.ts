import type { Env } from './types';
import { lookupDns, lookupMx } from './services/dns';
import { headers, redirects, status } from './services/http';
import { robots } from './services/robots';
import { validateDnsType, validateDomain } from './utils/validation';
import { cors, json } from './utils/response';
import { cms, CmsError } from './cms';
import { analytics, AnalyticsError } from './analytics';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const started = Date.now(), requestId = crypto.randomUUID(), url = new URL(request.url);
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors(request, env) });
    try {
      const analyticsResult = await analytics(request, env, url);
      if (analyticsResult !== null) {
        return json({ success: true, data: analyticsResult.data, meta: { requestId, durationMs: Date.now() - started } }, analyticsResult.status, request, env);
      }
      const cmsData = await cms(request, env, url);
      if (cmsData !== null) {
        const cache = url.pathname.startsWith('/v1/admin/') ? 'no-store' : url.pathname === '/v1/categories' || url.pathname.startsWith('/v1/tool-content/') ? 'public, max-age=1800, s-maxage=3600' : 'public, max-age=300, s-maxage=900';
        return json({ success: true, data: cmsData, meta: { requestId, durationMs: Date.now() - started } }, request.method === 'POST' ? 201 : 200, request, env, cache);
      }
      if (request.method !== 'GET') return json({ success: false, error: { code: 'METHOD_NOT_ALLOWED', message: 'Method not allowed.' } }, 405, request, env);
      let data: unknown, cache = 'no-store';
      if (url.pathname === '/v1/dns/mx') { const domain = validateDomain(url.searchParams.get('domain') ?? ''); data = { domain, records: await lookupMx(domain) }; cache = 'public, max-age=60, s-maxage=60'; }
      else if (url.pathname === '/v1/dns') { const domain = validateDomain(url.searchParams.get('domain') ?? ''), type = validateDnsType(url.searchParams.get('type') ?? 'A'); data = { domain, type, records: await lookupDns(domain, type) }; cache = 'public, max-age=60, s-maxage=60'; }
      else if (url.pathname === '/v1/http/headers') data = await headers(url.searchParams.get('url') ?? '');
      else if (url.pathname === '/v1/http/status') data = await status(url.searchParams.get('url') ?? '');
      else if (url.pathname === '/v1/http/redirects') data = await redirects(url.searchParams.get('url') ?? '');
      else if (url.pathname === '/v1/robots') { data = await robots(validateDomain(url.searchParams.get('domain') ?? '')); cache = 'public, max-age=300, s-maxage=600'; }
      else if (url.pathname === '/v1/ip') { const cf = (request as Request & { cf?: { country?: unknown; colo?: unknown } }).cf; data = { ip: request.headers.get('CF-Connecting-IP'), country: typeof cf?.country === 'string' ? cf.country : null, region: typeof cf?.colo === 'string' ? cf.colo : null, userAgent: request.headers.get('User-Agent') }; }
      else if (url.pathname === '/health') data = { status: 'ok' };
      else return json({ success: false, error: { code: 'NOT_FOUND', message: 'Endpoint not found.' } }, 404, request, env);
      return json({ success: true, data, meta: { requestId, durationMs: Date.now() - started } }, 200, request, env, cache);
    } catch (error) {
      const e = error as Error & { code?: string }; const knownError = error instanceof CmsError || error instanceof AnalyticsError, timeout = e.name === 'TimeoutError' || e.name === 'AbortError';
      return json({ success: false, error: { code: knownError ? error.code : timeout ? 'TIMEOUT' : e.code ?? 'REQUEST_FAILED', message: knownError ? error.message : timeout ? 'The remote server did not respond within the timeout.' : e.code ? e.message : 'The request could not be completed.' }, meta: { requestId, durationMs: Date.now() - started } }, knownError ? error.status : timeout ? 504 : 400, request, env);
    }
  },
};
