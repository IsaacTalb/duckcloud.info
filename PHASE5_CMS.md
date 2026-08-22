# Phase 5 CMS operations

Duck Cloud remains a Next.js application on Vercel. The CMS API is a Cloudflare Worker at `api.duckcloud.info`; structured content is in D1 and immutable media is in R2. Tool execution and the source tool registry remain in Git.

## Configuration and security

The Worker requires the `DB` D1 binding, `MEDIA` R2 binding, `R2_PUBLIC_BASE_URL`, `ALLOWED_ORIGINS`, and secret `ADMIN_API_TOKEN`. Vercel requires `NEXT_PUBLIC_DUCKCLOUD_API_URL`, `DUCKCLOUD_ADMIN_ALLOWED_EMAIL`, the server-only `DUCKCLOUD_ADMIN_API_TOKEN` with the same value as the Worker secret, `CLOUDFLARE_ACCESS_TEAM_DOMAIN`, and `CLOUDFLARE_ACCESS_AUD`. Never expose the latter values as `NEXT_PUBLIC_`.

Cloudflare Access is the authentication boundary for `/admin*` on `www.duckcloud.info`. Keep `www.duckcloud.info` orange-cloud proxied, create a self-hosted Access application, and allow only `DUCKCLOUD_ADMIN_ALLOWED_EMAIL`. Copy the Zero Trust team domain (for example, `my-team.cloudflareaccess.com`) into `CLOUDFLARE_ACCESS_TEAM_DOMAIN`; the application domain is not the issuer. Copy the **Application Audience (AUD) Tag** from the exact Access application protecting `www.duckcloud.info/admin` into `CLOUDFLARE_ACCESS_AUD`. If separate applications protect apex and `www`, provide both tags as a comma-separated value (`aud1,aud2`). Next.js verifies the Access signature, exact team-domain issuer, audience, expiration, and email; its server-only proxy then attaches the Worker bearer token. Configure another Access application or route policy for `api.duckcloud.info/v1/admin/*`; disable `workers.dev`, as configured. Writes also validate Origin. Public reads never expose drafts; scheduled content is readable only after `published_at`.

## Exact deployment procedure

1. In `workers/duckcloud-api`, run `npx wrangler d1 create duckcloud`. Replace `REPLACE_WITH_D1_DATABASE_ID` in `wrangler.toml` with its ID.
2. Back up an existing database with `npx wrangler d1 export duckcloud --remote --output backup-$(date +%F).sql`, then run `npx wrangler d1 migrations apply duckcloud --remote`. Migrations are retained in Git. Do not run `seed.sql` remotely.
3. Run `npx wrangler r2 bucket create duckcloud-media`. Consider R2 object versioning/retention and retain source copies of important assets.
4. Set the secret with `npx wrangler secret put ADMIN_API_TOKEN`. Confirm the `DB` and `MEDIA` bindings and allowed production origins in `wrangler.toml`.
5. Attach `assets.duckcloud.info` as the R2 bucket custom domain and confirm `R2_PUBLIC_BASE_URL`. Uploaded objects use unique `uploads/YYYY/MM/name-random.ext` keys and one-year immutable caching; never overwrite these keys.
6. Deploy from the Worker directory with `npm test && npm run build && npm run deploy`, then route the Worker to `api.duckcloud.info` and apply the Access policy.
7. In Vercel set `NEXT_PUBLIC_DUCKCLOUD_API_URL=https://api.duckcloud.info`, `DUCKCLOUD_ADMIN_ALLOWED_EMAIL`, secret `DUCKCLOUD_ADMIN_API_TOKEN`, `CLOUDFLARE_ACCESS_TEAM_DOMAIN`, and `CLOUDFLARE_ACCESS_AUD`. Environment changes do not affect an existing deployment: redeploy Production after saving them.
8. Optionally run `npm run verify:access-jwks` locally with only `CLOUDFLARE_ACCESS_TEAM_DOMAIN` set, then deploy Next.js with the existing Vercel project; no website hosting migration is required.
9. Sign in through Access, open `/admin`, create a draft, confirm its preview/editor, publish it, and verify an unauthenticated request cannot call every `/v1/admin/*` operation.
10. Verify `/blog`, the article canonical/metadata/structured data, `/feed.xml`, `/sitemap.xml`, an R2 image response, upload limits, referenced-media delete protection, and the retained source-controlled blog URLs.

## Local development and validation

Run `npm run dev` at the repository root and `npm run dev` in `workers/duckcloud-api`. Apply local migrations with `npx wrangler d1 migrations apply duckcloud --local`; optionally load safe development data with `npx wrangler d1 execute duckcloud --local --file=seed.sql`. Wrangler emulates R2 locally. Use a `.dev.vars` file for `ADMIN_API_TOKEN` and corresponding uncommitted root `.env.local`; never commit secrets.

The public article cache is 5–15 minutes, category/tool content cache is 30–60 minutes, and admin traffic is never cached. Editing therefore avoids per-request D1 reads while keeping changes reasonably prompt. A future phase can add authenticated draft rendering and tag-based immediate Vercel invalidation.

## Media and recovery

Uploads travel from the admin browser through the Vercel authorization proxy to the Worker and R2; they do not traverse a Vercel Serverless Function as base64, but this initial controlled proxy does carry the binary body and is limited to 10 MB. JPEG, PNG, WebP, AVIF, and GIF are accepted after extension, declared MIME, size, and file-signature checks. SVG and executable formats are rejected. D1 contains only metadata/URLs. If metadata insertion fails, the Worker removes the just-uploaded R2 object. Deletion checks article image/body references before deleting R2, then D1.

## Intentionally deferred to Phase 6

- Direct presigned browser-to-R2 uploads, client-side resizing, image dimension extraction, and SVG sanitization.
- Polished category, tag, settings, media-selector, relation, tool-editor, and search-index forms (the schema and protected endpoints/lists establish the boundary now).
- Authenticated draft preview, immediate tag revalidation webhook, autosave, revisions, and a richer CommonMark/highlighting pipeline.
- Import tooling for the existing TSX articles. Their published routes are deliberately retained, so no URL or canonical is removed in Phase 5.
- R2 cross-content reference scanning beyond article URL/body references, and full media search UI.

These items are not claimed as implemented in Phase 5.
