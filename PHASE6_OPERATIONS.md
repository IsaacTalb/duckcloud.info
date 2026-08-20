# Phase 6 operations

## Deployment

Apply the new D1 migrations in numeric order before deploying the Worker:

```sh
cd workers/duckcloud-api
npx wrangler d1 migrations apply duckcloud-cms --remote
npm run build
npm run deploy
```

Add the same random `REVALIDATION_SECRET` to the Worker and Vercel when Worker-triggered revalidation is enabled. Keep `DUCKCLOUD_ADMIN_API_TOKEN` server-only in Vercel and as `ADMIN_API_TOKEN` in the Worker. Existing `ALLOWED_ORIGINS`, `R2_PUBLIC_BASE_URL`, D1, R2, Cloudflare Access application, and admin-email settings remain required. No public secret uses a `NEXT_PUBLIC_` prefix.

R2 native presigned PUT URLs were deliberately not added. The current binding API cannot create S3 signatures without adding R2 S3 credentials and a signing implementation. Uploads remain authenticated, validated Worker-controlled uploads (10 MB maximum). This is safer than broadening R2 access; the Vercel proxy streams the request body rather than parsing it. No R2 dashboard change is required.

## Backups and exports

Create a D1 backup before migration and periodically export it:

```sh
npx wrangler d1 export duckcloud-cms --remote --output backups/duckcloud-cms.sql
```

Article/media metadata JSON can be obtained page-by-page from the authenticated admin API. R2 objects are intentionally excluded. Legacy source articles remain authoritative until an editor verifies a CMS import with the same slug; public CMS resolution then takes precedence at `/blog/[slug]`. Never overwrite an existing CMS slug during import.

## Publishing design

Draft autosaves are debounced for 15 seconds and opt out of revisions and audit events. Manual saves, publishing, archiving, and restoration create revisions/audit records. Every update includes `updated_at`; stale editors receive `409 STALE_WRITE`. Scheduled content becomes public when its UTC `published_at` is reached, without a cron write.
