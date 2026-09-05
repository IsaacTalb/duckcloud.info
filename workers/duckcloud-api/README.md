# Duck Cloud API Worker

This package contains the server-side API and CMS for Duck Cloud. The Next.js site remains on Vercel; deterministic and file-based tools remain in the browser. The Worker performs bounded DNS and public HTTP lookups and stores no lookup history. D1 stores CMS data and privacy-conscious daily page-view aggregates; R2 stores CMS media.

## Endpoints

All responses use the versioned success/error envelope. `GET` is the only application method.

- `GET /v1/dns?domain=example.com&type=A` (`A`, `AAAA`, `CNAME`, `MX`, `TXT`, `NS`)
- `GET /v1/dns/mx?domain=example.com` (MX plus exchanger A/AAAA records)
- `GET /v1/http/headers?url=https%3A%2F%2Fexample.com`
- `GET /v1/http/status?url=https%3A%2F%2Fexample.com`
- `GET /v1/http/redirects?url=https%3A%2F%2Fexample.com`
- `GET /v1/robots?domain=example.com`
- `GET /v1/ip` (never cached)
- `POST /v1/analytics/page-view` with exactly `{ "kind": "blog" | "tool", "identifier": "canonical-slug" }` (allowed origins only; returns `202`)
- `GET /v1/admin/analytics?days=30&limit=10` (admin token required; `days` 1–90, `limit` 1–50; returns all-time totals, recent daily totals, and top content for the selected range)
- `GET /health`

## Local development and deployment

Use Node 20 or newer. From this directory:

```sh
npm install
npm run test
npm run type-check
npm run dev
# after authenticating Wrangler
npx wrangler login
npm run deploy
```

Wrangler 4 reads `wrangler.toml`. Set `ALLOWED_ORIGINS` to a comma-separated allowlist. The checked-in default includes both production hostnames and `http://localhost:3000`; use environment-specific Wrangler configuration if preview origins are needed. There are no secrets today. Do not place user data in Wrangler variables.

In the Cloudflare dashboard, open **Workers & Pages → duckcloud-api → Settings → Domains & Routes → Add → Custom domain**, enter `api.duckcloud.info`, and allow Cloudflare to create the DNS record. Do not configure a route that captures the main site. The repository does not change DNS automatically.

In Vercel, add:

```text
NEXT_PUBLIC_DUCKCLOUD_API_URL=https://api.duckcloud.info
```

Use `http://localhost:8787` in `.env.local`, then redeploy the Vercel project after changing the production variable.

## Security and abuse controls

URL validation permits only HTTP(S), standard ports, no credentials, and at most 2,048 characters. Literal and DNS-resolved loopback, private, link-local, documentation, reserved, metadata, and internal targets are rejected before every redirect hop. DNS uses Cloudflare's DNS-over-HTTPS endpoint. HTTP requests have six-second timeouts, manual redirects (maximum ten), and prefer `HEAD`; headers uses a bounded `GET` fallback only when `HEAD` is unsupported. The API does not return website bodies. robots.txt is limited to 256 KB. Responses use JSON content type, `nosniff`, no-referrer, explicit cache policy, and an origin allowlist.

DNS and robots results advertise short shared-cache lifetimes; IP and variable HTTP responses are not cached. Analytics stores only UTC day, content kind, canonical identifier, and an integer count. It does not store events, cookies, IP addresses, user agents, or referrers. Ingest accepts only a small, exact JSON shape from configured origins; the Next proxy repeats validation, rejects cross-site browser requests, omits credentials and referrers, and sends one request per document/content pair. Disable Worker invocation logs containing request headers if account-level observability settings would capture them.

No in-memory counter is presented as rate limiting because isolates do not share reliable state. Before production, configure a Cloudflare WAF rate-limiting rule for `api.duckcloud.info/v1/*` (for example, 30 requests per minute per source IP with a short mitigation timeout), tighter limits for `/v1/http/*`, and a managed challenge rather than a permanent block. A Cloudflare Rate Limiting binding can be added later without changing service code if available on the selected plan; Redis is not required.

## Deferred features

**SSL certificate inspection is deferred.** Workers `fetch()` exposes the HTTP response and request-side `request.cf` properties, but not a reliable, complete peer-certificate chain for an arbitrary origin. Returning inferred or Cloudflare edge certificate data would be misleading.

**DNS propagation is deferred.** A single DoH resolver cannot represent global propagation, and the project does not depend on multiple third-party resolver APIs.

## Cost and operation

The Worker is stateless and uses native Web APIs, so storage cost is zero. Each lookup uses one or a small bounded number of subrequests; MX enrichment and redirect traces use more. Actual request/subrequest quotas and WAF availability depend on the active Cloudflare plan. Monitor invocation, error, CPU, and subrequest counts after launch, without adding queried values to analytics.
