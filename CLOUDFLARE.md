# Cloudflare configuration

The website is a static Next.js export deployed with Cloudflare Workers Static Assets. The
separate `duckcloud-api` Worker provides the remote lookup endpoints. OpenNext is intentionally not
used because every website route is statically generated.

## Website build settings

In **Workers & Pages → duckcloud-info → Settings → Build**, use these exact values:

| Setting | Value |
| --- | --- |
| Root directory | `/` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |

`npm run build` now creates the `out/` directory. The checked-in `wrangler.jsonc` deploys that
directory directly, so `.open-next/worker.js` is neither generated nor required.

Attach `duckcloud.info` and `www.duckcloud.info` as custom domains for `duckcloud-info`. Attach only
`api.duckcloud.info` to `duckcloud-api`. Keep SSL/TLS mode at **Full (strict)**.

## Environment variables

In **Cloudflare → duckcloud-info → Settings → Variables and Secrets**, add this plain-text build
variable:

```text
NEXT_PUBLIC_DUCKCLOUD_API_URL=https://api.duckcloud.info
```

Delete `MAINTENANCE_MODE` and `NEXT_PUBLIC_MAINTENANCE_MODE` if present. No Cloudflare API token,
account ID, R2 credential, database key, or other application secret is required by the website.

The API Worker's non-secret `ALLOWED_ORIGINS` value is checked into
`workers/duckcloud-api/wrangler.toml`. Update it there if the production hostnames change. Add
future API credentials through **duckcloud-api → Settings → Variables and Secrets**, never through
`NEXT_PUBLIC_*` variables.

If Vercel remains as a preview deployment, add the same `NEXT_PUBLIC_DUCKCLOUD_API_URL` value to
Vercel. No other Vercel variable is currently required.

## API Worker

Deploy it separately from the website:

```sh
cd workers/duckcloud-api
npm ci
npm test
npm run type-check
npm run deploy
```

Before public launch, add a WAF rate-limiting rule for `api.duckcloud.info/v1/*`. Start with 30
requests per minute per source IP and a managed challenge, then tune it using production traffic.

## Sitemap

The static build writes `out/sitemap.xml` and `out/robots.txt`; Cloudflare publishes them at:

```text
https://duckcloud.info/sitemap.xml
https://duckcloud.info/robots.txt
```

After deployment, purge both URLs from Cloudflare cache, verify they return HTTP 200, and submit
`https://duckcloud.info/sitemap.xml` in Google Search Console.

## Deployment checklist

1. Confirm the build log says `npm run build` and creates `out/`.
2. Confirm the deploy log uploads assets from `out/` and does not reference `.open-next`.
3. Confirm the apex and `www` domains target `duckcloud-info`.
4. Confirm `api.duckcloud.info/health` reaches `duckcloud-api`.
5. Confirm `/`, `/robots.txt`, and `/sitemap.xml` return HTTP 200.
