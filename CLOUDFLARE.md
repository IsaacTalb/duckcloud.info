# Cloudflare configuration

The Next.js website can be deployed to Cloudflare Workers with OpenNext. A separate
`duckcloud-api` Worker handles remote lookup tools. Do not put Cloudflare API tokens in
`NEXT_PUBLIC_*` variables; those variables are shipped to browsers.

## 1. DNS for the website

After a successful website Worker deployment, attach `duckcloud.info` and `www.duckcloud.info` as
custom domains for the `duckcloud-info` Worker. Do not manually create conflicting DNS records for
those hostnames.

In **SSL/TLS → Overview**, keep **Full (strict)**. Cloudflare manages certificates for Worker custom
domains.

The website Worker receives the apex and `www` domains. The API Worker should receive only the
`api.duckcloud.info` hostname.

## 2. Website Worker build settings

The checked-in `wrangler.jsonc` intentionally uses `duckcloud-info` for both the Worker name and
the `WORKER_SELF_REFERENCE` service. These values must match. A mismatch was the cause of
Cloudflare API error `10143` during deployment.

In **Workers & Pages → duckcloud-info → Settings → Build**, use:

| Setting | Value |
| --- | --- |
| Root directory | `/` |
| Build command | `npm run cloudflare:build` |
| Deploy command | `npm run deploy` |

Do not use `npm run build` followed by bare `npx wrangler deploy`. A bare Wrangler invocation tries
to migrate the project during every non-interactive deployment and can generate inconsistent
Worker/service names.

## 3. API Worker

Worker source and non-secret configuration are in `workers/duckcloud-api/`. Update:

- `workers/duckcloud-api/wrangler.toml` for the Worker name, compatibility date, and the
  comma-separated `ALLOWED_ORIGINS` value.
- **Workers & Pages → duckcloud-api → Settings → Domains & Routes → Add → Custom domain** to attach
  `api.duckcloud.info`. Allow Cloudflare to create its DNS record.
- **Workers & Pages → duckcloud-api → Settings → Variables and Secrets** for future secrets. Use a
  secret rather than `[vars]` for credentials, and never commit its value.

Deploy the Worker from its package directory:

```sh
cd workers/duckcloud-api
npm ci
npm test
npm run type-check
npm run deploy
```

Before exposing the Worker publicly, add a WAF rate-limiting rule for
`api.duckcloud.info/v1/*`. Start with 30 requests per minute per source IP and a managed challenge,
then tune the threshold using production traffic. Use a tighter threshold for `/v1/http/*`, which
performs outbound HTTP requests.

## 4. Environment variables

In **Cloudflare → duckcloud-info → Settings → Variables and Secrets**, add this as a plain-text
production variable:

```text
NEXT_PUBLIC_DUCKCLOUD_API_URL=https://api.duckcloud.info
```

This is a public URL, not a secret. No Cloudflare account ID, API token, R2 credential, or service
binding value should be added as an application environment variable; Wrangler supplies the
bindings declared in `wrangler.jsonc`.

For the separate `duckcloud-api` Worker, `ALLOWED_ORIGINS` is already declared in
`workers/duckcloud-api/wrangler.toml`. It is not a secret. There are no required API keys for the
current application.

If Vercel is also used for a preview or fallback deployment, add the same
`NEXT_PUBLIC_DUCKCLOUD_API_URL` value in **Vercel → Project → Settings → Environment Variables**.
No other Vercel variable is required for Cloudflare. Use `http://localhost:8787` in `.env.local`
during local Worker development.

## 5. Sitemap and crawler settings

Next.js generates the public sitemap at `https://duckcloud.info/sitemap.xml` from
`src/app/sitemap.ts`. `src/app/robots.ts` advertises that URL at
`https://duckcloud.info/robots.txt`. Both endpoints remain available when the site's maintenance
redirect is enabled.

No Cloudflare setting is required to generate the sitemap. If a Cache Rule is added for XML or
robots files, purge `sitemap.xml` and `robots.txt` after deploying URL changes. Submit
`https://duckcloud.info/sitemap.xml` in each search engine's webmaster console after deployment.
The failed deployment in the supplied log means Google could not read the newly generated route;
fix and complete the Worker deployment before resubmitting it.

## Deployment checklist

1. Confirm `https://duckcloud.info` resolves to the `duckcloud-info` website Worker.
2. Confirm `https://api.duckcloud.info/health` returns a successful Worker response.
3. Confirm `https://duckcloud.info/robots.txt` references the canonical sitemap URL.
4. Confirm `https://duckcloud.info/sitemap.xml` contains static pages, blog posts, tool categories,
   and active tools.
5. Confirm the apex and `www` domains target `duckcloud-info`, while `api` targets `duckcloud-api`.
