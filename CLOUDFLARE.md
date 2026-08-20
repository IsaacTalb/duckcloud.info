# Cloudflare configuration

The main Next.js website is deployed by Vercel. Cloudflare is used for DNS/proxying and for the
`duckcloud-api` Worker, so settings live in three different places. Do not put Cloudflare API
tokens in `NEXT_PUBLIC_*` variables; those variables are shipped to browsers.

## 1. DNS for the website

In **Cloudflare Dashboard → duckcloud.info → DNS → Records**, point the apex (`@`) and `www`
records at the values provided by Vercel. Keep the records proxied only if the Vercel domain is
already verified and working through Cloudflare. Vercel remains the origin for the website.

In **SSL/TLS → Overview**, use **Full (strict)** after Vercel has issued a valid certificate. Avoid
Flexible mode because it does not encrypt the Cloudflare-to-origin connection and can cause
redirect loops.

Do not add a Worker route matching `duckcloud.info/*`; that would send the website to the API
Worker. The Worker should receive only the `api.duckcloud.info` hostname.

## 2. API Worker

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

## 3. Frontend Worker URL

In **Vercel → Project → Settings → Environment Variables**, set the production value:

```text
NEXT_PUBLIC_DUCKCLOUD_API_URL=https://api.duckcloud.info
```

Use `http://localhost:8787` in `.env.local` during local Worker development. Redeploy the Vercel
project after changing the production variable.

## 4. Sitemap and crawler settings

Next.js generates the public sitemap at `https://duckcloud.info/sitemap.xml` from
`src/app/sitemap.ts`. `src/app/robots.ts` advertises that URL at
`https://duckcloud.info/robots.txt`. Both endpoints remain available when the site's maintenance
redirect is enabled.

No Cloudflare setting is required to generate the sitemap. If a Cache Rule is added for XML or
robots files, purge `sitemap.xml` and `robots.txt` after deploying URL changes. Submit
`https://duckcloud.info/sitemap.xml` in each search engine's webmaster console after deployment.

## Deployment checklist

1. Confirm `https://duckcloud.info` resolves to the Vercel deployment.
2. Confirm `https://api.duckcloud.info/health` returns a successful Worker response.
3. Confirm `https://duckcloud.info/robots.txt` references the canonical sitemap URL.
4. Confirm `https://duckcloud.info/sitemap.xml` contains static pages, blog posts, tool categories,
   and active tools.
5. Confirm no Cloudflare Worker route captures the apex website.
