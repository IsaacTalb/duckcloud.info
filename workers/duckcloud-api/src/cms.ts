import type { Env } from './types';

const STATUSES = new Set(['draft', 'published', 'scheduled', 'archived']);
const RESERVED = new Set(['admin', 'api', 'tools', 'blog', 'privacy', 'terms', 'security']);
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const IMAGE_TYPES: Record<string, { extensions: string[]; signatures: number[][] }> = {
  'image/jpeg': { extensions: ['jpg', 'jpeg'], signatures: [[0xff, 0xd8, 0xff]] },
  'image/png': { extensions: ['png'], signatures: [[0x89, 0x50, 0x4e, 0x47]] },
  'image/webp': { extensions: ['webp'], signatures: [[0x52, 0x49, 0x46, 0x46]] },
  'image/gif': { extensions: ['gif'], signatures: [[0x47, 0x49, 0x46, 0x38]] },
  'image/avif': { extensions: ['avif'], signatures: [] },
};
const SAFE_SETTING_KEYS = new Set(['site_title', 'site_description', 'default_author', 'posts_per_page', 'social_image_url']);
const IMPORT_LIMIT = 500;
const IMPORT_BYTES = 1_000_000;

export class CmsError extends Error { constructor(public status: number, public code: string, message: string) { super(message); } }
const page = (url: URL) => Math.max(1, Math.min(10000, Number(url.searchParams.get('page')) || 1));
const limit = (url: URL) => Math.max(1, Math.min(50, Number(url.searchParams.get('limit')) || 20));
const now = () => new Date().toISOString();
const body = async (request: Request): Promise<Record<string, unknown>> => {
  if (!request.headers.get('content-type')?.includes('application/json')) throw new CmsError(415, 'UNSUPPORTED_MEDIA_TYPE', 'Expected JSON.');
  try { return await request.json(); } catch { throw new CmsError(400, 'INVALID_JSON', 'Request body is not valid JSON.'); }
};
const importBody = async (request: Request): Promise<Record<string, unknown>> => {
  if (!request.headers.get('content-type')?.includes('application/json')) throw new CmsError(415, 'UNSUPPORTED_MEDIA_TYPE', 'Expected JSON.');
  const source = await request.text();
  if (new TextEncoder().encode(source).byteLength > IMPORT_BYTES) throw new CmsError(413, 'IMPORT_TOO_LARGE', `Import payloads are limited to ${IMPORT_BYTES} bytes.`);
  try { return record(JSON.parse(source), 'import document'); } catch (error) { if (error instanceof CmsError) throw error; throw new CmsError(400, 'INVALID_JSON', 'Request body is not valid JSON.'); }
};
const text = (v: unknown, name: string, max: number, required = false) => {
  if (v == null && !required) return null;
  if (typeof v !== 'string' || (required && !v.trim()) || v.length > max) throw new CmsError(422, 'VALIDATION_ERROR', `${name} is invalid.`);
  return v.trim();
};
const acceptsAdminToken = (authorization: string | null, headerToken: string | null, expectedToken?: string) => {
  if (!expectedToken) return false;
  const bearerToken = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  return bearerToken === expectedToken || headerToken === expectedToken;
};
const allowedOrigins = (value: string | undefined) => (value || '').split(',').map(origin => origin.trim()).filter(Boolean);
const auth = (request: Request, env: Env) => {
  if (!acceptsAdminToken(request.headers.get('authorization'), request.headers.get('x-duckcloud-admin-token'), env.ADMIN_API_TOKEN)) throw new CmsError(401, 'ADMIN_TOKEN_REJECTED', 'The website and CMS API tokens do not match.');
  if (!['GET', 'HEAD'].includes(request.method)) {
    const origin = request.headers.get('origin');
    const allowed = allowedOrigins(env.ALLOWED_ORIGINS);
    if (origin && !allowed.includes(origin)) throw new CmsError(403, 'ORIGIN_REJECTED', 'Request origin is not allowed.');
  }
};
const actor = (request: Request) => text(request.headers.get('x-admin-email'), 'admin email', 320) || null;
const audit = (env: Env, request: Request, action: string, targetType: string, targetId: string | null) =>
  env.DB.prepare('INSERT INTO admin_audit_log(id,action,target_type,target_id,admin_email,created_at) VALUES(?,?,?,?,?,?)').bind(crypto.randomUUID(), action, targetType, targetId, actor(request), now()).run();
const revision = async (env: Env, request: Request, articleId: string) => {
  const a = await env.DB.prepare('SELECT * FROM articles WHERE id=?').bind(articleId).first<Record<string, unknown>>();
  if (!a) throw new CmsError(404, 'NOT_FOUND', 'Article not found.');
  await env.DB.prepare(`INSERT INTO article_revisions(id,article_id,title,excerpt,content,seo_title,seo_description,featured_image_url,og_image_url,status,created_at,created_by) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`).bind(crypto.randomUUID(),articleId,a.title,a.excerpt,a.content,a.seo_title,a.seo_description,a.featured_image_url,a.og_image_url,a.status,now(),actor(request)).run();
};
const articleInput = (b: Record<string, unknown>) => {
  const slug = text(b.slug, 'slug', 160, true)!;
  if (!SLUG.test(slug) || RESERVED.has(slug)) throw new CmsError(422, 'INVALID_SLUG', 'Use lowercase letters, numbers and hyphens; this slug may be reserved.');
  const status = text(b.status ?? 'draft', 'status', 20, true)!;
  if (!STATUSES.has(status)) throw new CmsError(422, 'INVALID_STATUS', 'Unknown article status.');
  const published = text(b.published_at, 'published_at', 40);
  if (published && Number.isNaN(Date.parse(published))) throw new CmsError(422, 'INVALID_DATE', 'published_at must be an ISO timestamp.');
  if (status === 'scheduled' && !published) throw new CmsError(422, 'INVALID_DATE', 'Scheduled articles require published_at.');
  const url = text(b.canonical_url, 'canonical_url', 2048);
  if (url) { try { if (new URL(url).protocol !== 'https:') throw new Error(); } catch { throw new CmsError(422, 'INVALID_URL', 'Canonical URL must be HTTPS.'); } }
  return { slug, title: text(b.title, 'title', 240, true)!, excerpt: text(b.excerpt, 'excerpt', 1000), content: text(b.content, 'content', 2_000_000, true)!, status, featured: b.featured ? 1 : 0, category_id: text(b.category_id, 'category_id', 100), seo_title: text(b.seo_title, 'seo_title', 240), seo_description: text(b.seo_description, 'seo_description', 500), canonical_url: url, featured_image_url: text(b.featured_image_url, 'featured_image_url', 2048), og_image_url: text(b.og_image_url, 'og_image_url', 2048), author_name: text(b.author_name, 'author_name', 160), published_at: published };
};

const record = (value: unknown, name: string): Record<string, unknown> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new CmsError(422, 'VALIDATION_ERROR', `${name} must be an object.`);
  return value as Record<string, unknown>;
};
const keysOnly = (value: Record<string, unknown>, allowed: Set<string>, name: string) => {
  const unexpected = Object.keys(value).find(key => !allowed.has(key));
  if (unexpected) throw new CmsError(422, 'VALIDATION_ERROR', `${name} contains unsupported field ${unexpected}.`);
};
const safeSettings = (value: unknown) => {
  const settings = record(value, 'settings');
  keysOnly(settings, SAFE_SETTING_KEYS, 'settings');
  const result: Record<string, string> = {};
  for (const [key, raw] of Object.entries(settings)) {
    const max = key === 'site_description' ? 1000 : key === 'social_image_url' ? 2048 : 240;
    const normalized = key === 'posts_per_page' && typeof raw === 'number' ? String(raw) : raw;
    const value = text(normalized, key, max, key !== 'social_image_url') ?? '';
    if (key === 'posts_per_page' && (!/^\d+$/.test(value) || Number(value) < 1 || Number(value) > 50)) throw new CmsError(422, 'VALIDATION_ERROR', 'posts_per_page must be between 1 and 50.');
    if (key === 'social_image_url' && value) { try { if (new URL(value).protocol !== 'https:') throw new Error(); } catch { throw new CmsError(422, 'INVALID_URL', 'social_image_url must be HTTPS.'); } }
    result[key] = value;
  }
  return result;
};
type ImportEntity = Record<string, unknown> & { id: string };
type ImportPlan = { conflictPolicy: 'skip' | 'update'; validateOnly: boolean; categories: ImportEntity[]; tags: ImportEntity[]; articles: (ReturnType<typeof articleInput> & { id: string })[]; settings: Record<string, string>; total: number };
const importPlan = (value: unknown): ImportPlan => {
  const document = record(value, 'import document');
  keysOnly(document, new Set(['version', 'conflict_policy', 'validate_only', 'categories', 'tags', 'articles', 'settings']), 'import document');
  if (document.version !== 1) throw new CmsError(422, 'UNSUPPORTED_IMPORT_VERSION', 'Import version must be 1.');
  const conflictPolicy = document.conflict_policy ?? 'skip';
  if (conflictPolicy !== 'skip' && conflictPolicy !== 'update') throw new CmsError(422, 'VALIDATION_ERROR', 'conflict_policy must be skip or update.');
  const list = (key: string) => {
    const items = document[key] ?? [];
    if (!Array.isArray(items)) throw new CmsError(422, 'VALIDATION_ERROR', `${key} must be an array.`);
    return items.map((item, index) => record(item, `${key}[${index}]`));
  };
  const categoryRows = list('categories'), tagRows = list('tags'), articleRows = list('articles');
  const total = categoryRows.length + tagRows.length + articleRows.length;
  if (total > IMPORT_LIMIT) throw new CmsError(413, 'IMPORT_LIMIT_EXCEEDED', `Imports are limited to ${IMPORT_LIMIT} records.`);
  const seen = (rows: Record<string, unknown>[], key: string, name: string) => { const values = rows.map(row => String(row[key] ?? '')); if (new Set(values).size !== values.length) throw new CmsError(422, 'IMPORT_DUPLICATE', `${name} contains duplicate ${key} values.`); };
  const categories = categoryRows.map((row, index) => {
    keysOnly(row, new Set(['id', 'slug', 'name', 'description', 'sort_order']), `categories[${index}]`);
    const slug = text(row.slug, 'category slug', 100, true)!; if (!SLUG.test(slug)) throw new CmsError(422, 'INVALID_SLUG', 'Invalid category slug.');
    const sortOrder = row.sort_order == null ? 0 : Number(row.sort_order); if (!Number.isInteger(sortOrder) || sortOrder < 0 || sortOrder > 10000) throw new CmsError(422, 'VALIDATION_ERROR', 'sort_order must be an integer between 0 and 10000.');
    return { id: text(row.id, 'category id', 100) || crypto.randomUUID(), slug, name: text(row.name, 'category name', 120, true)!, description: text(row.description, 'category description', 5000), sort_order: sortOrder };
  });
  const tags = tagRows.map((row, index) => {
    keysOnly(row, new Set(['id', 'slug', 'name']), `tags[${index}]`);
    const slug = text(row.slug, 'tag slug', 100, true)!; if (!SLUG.test(slug)) throw new CmsError(422, 'INVALID_SLUG', 'Invalid tag slug.');
    return { id: text(row.id, 'tag id', 100) || crypto.randomUUID(), slug, name: text(row.name, 'tag name', 120, true)! };
  });
  const articles = articleRows.map((row, index) => {
    keysOnly(row, new Set(['id', 'slug', 'title', 'excerpt', 'content', 'status', 'featured', 'category_id', 'seo_title', 'seo_description', 'canonical_url', 'featured_image_url', 'og_image_url', 'author_name', 'published_at']), `articles[${index}]`);
    return { id: text(row.id, 'article id', 100) || crypto.randomUUID(), ...articleInput(row) };
  });
  seen(categories, 'slug', 'categories'); seen(tags, 'slug', 'tags'); seen(articles, 'slug', 'articles');
  if (document.validate_only != null && typeof document.validate_only !== 'boolean') throw new CmsError(422, 'VALIDATION_ERROR', 'validate_only must be a boolean.');
  return { conflictPolicy, validateOnly: document.validate_only === true, categories, tags, articles, settings: document.settings == null ? {} : safeSettings(document.settings), total };
};

export async function cms(request: Request, env: Env, url: URL): Promise<unknown | null> {
  const p = url.pathname;
  if (request.method === 'GET' && p === '/v1/articles') {
    const l = limit(url), offset = (page(url) - 1) * l;
    const q = `SELECT a.id,a.slug,a.title,a.excerpt,a.featured,a.author_name,a.published_at,a.updated_at,a.featured_image_url,c.name category,c.slug category_slug FROM articles a LEFT JOIN article_categories c ON c.id=a.category_id WHERE a.deleted_at IS NULL AND (a.status='published' OR (a.status='scheduled' AND a.published_at<=?)) AND (a.published_at IS NULL OR a.published_at<=?) ORDER BY COALESCE(a.published_at,a.created_at) DESC LIMIT ? OFFSET ?`;
    return env.DB.prepare(q).bind(now(), now(), l, offset).all();
  }
  if (request.method === 'GET' && p.startsWith('/v1/articles/')) {
    const slug = decodeURIComponent(p.slice(13));
    const item = await env.DB.prepare(`SELECT a.*,c.name category,c.slug category_slug FROM articles a LEFT JOIN article_categories c ON c.id=a.category_id WHERE a.slug=? AND a.deleted_at IS NULL AND (a.status='published' OR (a.status='scheduled' AND a.published_at<=?)) AND (a.published_at IS NULL OR a.published_at<=?)`).bind(slug, now(), now()).first();
    if (!item) throw new CmsError(404, 'NOT_FOUND', 'Article not found.'); return item;
  }
  if (request.method === 'GET' && p === '/v1/categories') return env.DB.prepare('SELECT * FROM article_categories ORDER BY sort_order,name').all();
  if (request.method === 'GET' && p.startsWith('/v1/tool-content/')) return (await env.DB.prepare('SELECT * FROM tool_content WHERE tool_slug=? AND is_visible=1').bind(decodeURIComponent(p.slice(17))).first()) || {};
  if (!p.startsWith('/v1/admin/')) return null;
  auth(request, env);
  if (request.method === 'GET' && p === '/v1/admin/dashboard') { const counts=await env.DB.prepare(`SELECT (SELECT count(*) FROM articles WHERE status='published' AND deleted_at IS NULL) published,(SELECT count(*) FROM articles WHERE status='draft' AND deleted_at IS NULL) drafts,(SELECT count(*) FROM articles WHERE status='scheduled' AND deleted_at IS NULL) scheduled,(SELECT count(*) FROM articles WHERE status='archived' AND deleted_at IS NULL) archived,(SELECT count(*) FROM media) media,(SELECT count(*) FROM tool_content WHERE is_visible=1) active_tools,(SELECT count(*) FROM tool_content WHERE featured=1) featured_tools`).first();const recentArticles=await env.DB.prepare('SELECT id,title,status,updated_at FROM articles WHERE deleted_at IS NULL ORDER BY updated_at DESC LIMIT 5').all();const recentMedia=await env.DB.prepare('SELECT id,filename,url,created_at FROM media ORDER BY created_at DESC LIMIT 5').all();return{...counts,recent_articles:recentArticles.results,recent_media:recentMedia.results}; }
  if (request.method === 'GET' && p === '/v1/admin/articles') { const l=limit(url),offset=(page(url)-1)*l,search=(url.searchParams.get('q')||'').slice(0,160),status=url.searchParams.get('status')||'',category=url.searchParams.get('category')||'',trash=url.searchParams.get('trash')==='1',sort=url.searchParams.get('sort')==='published_at'?'COALESCE(a.published_at,a.created_at)':'a.updated_at',direction=url.searchParams.get('direction')==='asc'?'ASC':'DESC',where=[trash?'a.deleted_at IS NOT NULL':'a.deleted_at IS NULL'],values:unknown[]=[];if(search){where.push('(a.title LIKE ? OR a.slug LIKE ?)');values.push(`%${search}%`,`%${search}%`)}if(status){where.push('a.status=?');values.push(status)}if(category){where.push('a.category_id=?');values.push(category)}const from=` FROM articles a LEFT JOIN article_categories c ON c.id=a.category_id WHERE ${where.join(' AND ')}`;const total=await env.DB.prepare(`SELECT count(*) count${from}`).bind(...values).first<{count:number}>();const rows=await env.DB.prepare(`SELECT a.id,a.slug,a.title,a.status,a.featured,a.published_at,a.updated_at,a.deleted_at,c.name category${from} ORDER BY ${sort} ${direction} LIMIT ? OFFSET ?`).bind(...values,l,offset).all();return{results:rows.results,page:page(url),limit:l,total:total?.count||0}; }
  const readArticleId=p.match(/^\/v1\/admin\/articles\/([^/]+)$/)?.[1];if(request.method === 'GET' && readArticleId) { const item=await env.DB.prepare('SELECT * FROM articles WHERE id=?').bind(readArticleId).first(); if(!item) throw new CmsError(404,'NOT_FOUND','Article not found.'); return item; }
  if (request.method === 'POST' && p === '/v1/admin/articles') { const a=articleInput(await body(request)), id=crypto.randomUUID(), t=now(); try { await env.DB.prepare(`INSERT INTO articles(id,slug,title,excerpt,content,status,featured,category_id,seo_title,seo_description,canonical_url,featured_image_url,og_image_url,author_name,published_at,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(id,...Object.values(a),t,t).run(); } catch { throw new CmsError(409,'SLUG_EXISTS','This slug is already in use.'); } await revision(env,request,id);await audit(env,request,a.status==='published'?'article.published':'article.created','article',id);return {id,...a,updated_at:t}; }
  const articleId = p.match(/^\/v1\/admin\/articles\/([^/]+)$/)?.[1];
  if (articleId && request.method === 'PATCH') { const b=await body(request),a=articleInput(b); const found=await env.DB.prepare('SELECT updated_at FROM articles WHERE id=?').bind(articleId).first<{updated_at:string}>(); if(!found)throw new CmsError(404,'NOT_FOUND','Article not found.');if(b.updated_at!==found.updated_at)throw new CmsError(409,'STALE_WRITE','This article was updated elsewhere. Reload before overwriting.');const t=now(); try { await env.DB.prepare(`UPDATE articles SET slug=?,title=?,excerpt=?,content=?,status=?,featured=?,category_id=?,seo_title=?,seo_description=?,canonical_url=?,featured_image_url=?,og_image_url=?,author_name=?,published_at=?,updated_at=? WHERE id=? AND updated_at=?`).bind(...Object.values(a),t,articleId,found.updated_at).run(); } catch { throw new CmsError(409,'SLUG_EXISTS','This slug is already in use.'); }if(b.create_revision!==false){await revision(env,request,articleId);await audit(env,request,a.status==='published'?'article.published':a.status==='archived'?'article.archived':'article.saved','article',articleId)} return {id:articleId,...a,updated_at:t}; }
  if (articleId && request.method === 'DELETE') { const permanent=url.searchParams.get('permanent')==='1';if(permanent){await env.DB.prepare('DELETE FROM articles WHERE id=? AND deleted_at IS NOT NULL').bind(articleId).run();await audit(env,request,'article.deleted','article',articleId);return{deleted:true}}await env.DB.prepare('UPDATE articles SET deleted_at=?,updated_at=? WHERE id=?').bind(now(),now(),articleId).run();await audit(env,request,'article.trashed','article',articleId);return {trashed:true}; }
  const restoreId=p.match(/^\/v1\/admin\/articles\/([^/]+)\/restore$/)?.[1];if(restoreId&&request.method==='POST'){await env.DB.prepare('UPDATE articles SET deleted_at=NULL,status=\'draft\',updated_at=? WHERE id=?').bind(now(),restoreId).run();await audit(env,request,'article.restored','article',restoreId);return{restored:true};}
  const previewId=p.match(/^\/v1\/admin\/articles\/([^/]+)\/preview$/)?.[1];if(previewId&&request.method==='GET'){const item=await env.DB.prepare('SELECT a.*,c.name category,c.slug category_slug FROM articles a LEFT JOIN article_categories c ON c.id=a.category_id WHERE a.id=? AND a.deleted_at IS NULL').bind(previewId).first();if(!item)throw new CmsError(404,'NOT_FOUND','Article not found.');return item;}
  const revisionsId=p.match(/^\/v1\/admin\/articles\/([^/]+)\/revisions$/)?.[1];if(revisionsId&&request.method==='GET')return env.DB.prepare('SELECT id,article_id,title,excerpt,seo_title,seo_description,status,created_at,created_by FROM article_revisions WHERE article_id=? ORDER BY created_at DESC LIMIT ? OFFSET ?').bind(revisionsId,limit(url),(page(url)-1)*limit(url)).all();
  const revisionId=p.match(/^\/v1\/admin\/articles\/([^/]+)\/revisions\/([^/]+)$/);if(revisionId&&request.method==='GET'){const item=await env.DB.prepare('SELECT * FROM article_revisions WHERE id=? AND article_id=?').bind(revisionId[2],revisionId[1]).first();if(!item)throw new CmsError(404,'NOT_FOUND','Revision not found.');return item;}
  const restoreRevision=p.match(/^\/v1\/admin\/articles\/([^/]+)\/revisions\/([^/]+)\/restore$/);if(restoreRevision&&request.method==='POST'){const current=await env.DB.prepare('SELECT updated_at FROM articles WHERE id=?').bind(restoreRevision[1]).first<{updated_at:string}>(),r=await env.DB.prepare('SELECT * FROM article_revisions WHERE id=? AND article_id=?').bind(restoreRevision[2],restoreRevision[1]).first<Record<string,unknown>>();if(!current||!r)throw new CmsError(404,'NOT_FOUND','Revision not found.');await revision(env,request,restoreRevision[1]);const t=now();await env.DB.prepare('UPDATE articles SET title=?,excerpt=?,content=?,seo_title=?,seo_description=?,featured_image_url=?,og_image_url=?,status=?,updated_at=? WHERE id=?').bind(r.title,r.excerpt,r.content,r.seo_title,r.seo_description,r.featured_image_url,r.og_image_url,r.status,t,restoreRevision[1]).run();await revision(env,request,restoreRevision[1]);await audit(env,request,'article.revision_restored','article',restoreRevision[1]);return{restored:true,updated_at:t};}
  if (request.method === 'GET' && p === '/v1/admin/categories') return env.DB.prepare('SELECT * FROM article_categories ORDER BY sort_order,name').all();
  if (request.method === 'POST' && p === '/v1/admin/categories') { const b=await body(request), slug=text(b.slug,'slug',100,true)!, name=text(b.name,'name',120,true)!; if(!SLUG.test(slug))throw new CmsError(422,'INVALID_SLUG','Invalid category slug.'); const id=crypto.randomUUID(),t=now(); await env.DB.prepare('INSERT INTO article_categories VALUES(?,?,?,?,?,?,?)').bind(id,slug,name,text(b.description,'description',5000),Number(b.sort_order)||0,t,t).run(); return {id,slug,name}; }
  if (request.method === 'GET' && p === '/v1/admin/tags') return env.DB.prepare('SELECT t.id,t.slug,t.name,t.created_at,t.updated_at,count(at.article_id) article_count FROM tags t LEFT JOIN article_tags at ON at.tag_id=t.id GROUP BY t.id ORDER BY t.name').all();
  if (request.method === 'POST' && p === '/v1/admin/tags') { const b=await body(request);keysOnly(b,new Set(['slug','name']),'tag');const slug=text(b.slug,'slug',100,true)!,name=text(b.name,'name',120,true)!;if(!SLUG.test(slug))throw new CmsError(422,'INVALID_SLUG','Invalid tag slug.');const id=crypto.randomUUID(),t=now();try{await env.DB.prepare('INSERT INTO tags(id,slug,name,created_at,updated_at) VALUES(?,?,?,?,?)').bind(id,slug,name,t,t).run()}catch{throw new CmsError(409,'TAG_EXISTS','This tag slug is already in use.')}await audit(env,request,'tag.created','tag',id);return{id,slug,name,created_at:t,updated_at:t}; }
  const tagId=p.match(/^\/v1\/admin\/tags\/([^/]+)$/)?.[1];
  if (tagId&&request.method==='PATCH'){const b=await body(request);keysOnly(b,new Set(['slug','name']),'tag');const found=await env.DB.prepare('SELECT id FROM tags WHERE id=?').bind(tagId).first();if(!found)throw new CmsError(404,'NOT_FOUND','Tag not found.');const slug=text(b.slug,'slug',100,true)!,name=text(b.name,'name',120,true)!;if(!SLUG.test(slug))throw new CmsError(422,'INVALID_SLUG','Invalid tag slug.');const t=now();try{await env.DB.prepare('UPDATE tags SET slug=?,name=?,updated_at=? WHERE id=?').bind(slug,name,t,tagId).run()}catch{throw new CmsError(409,'TAG_EXISTS','This tag slug is already in use.')}await audit(env,request,'tag.updated','tag',tagId);return{id:tagId,slug,name,updated_at:t};}
  if (tagId&&request.method==='DELETE'){const found=await env.DB.prepare('SELECT id FROM tags WHERE id=?').bind(tagId).first();if(!found)throw new CmsError(404,'NOT_FOUND','Tag not found.');const usage=await env.DB.prepare('SELECT count(*) count FROM article_tags WHERE tag_id=?').bind(tagId).first<{count:number}>();if(usage?.count)throw new CmsError(409,'TAG_IN_USE','Remove this tag from its articles before deleting it.');await env.DB.prepare('DELETE FROM tags WHERE id=?').bind(tagId).run();await audit(env,request,'tag.deleted','tag',tagId);return{deleted:true};}
  if (request.method==='GET'&&p==='/v1/admin/settings'){const rows=await env.DB.prepare(`SELECT key,value,updated_at FROM site_settings WHERE key IN (${[...SAFE_SETTING_KEYS].map(()=>'?').join(',')}) ORDER BY key`).bind(...SAFE_SETTING_KEYS).all<{key:string;value:string;updated_at:string}>();return{settings:Object.fromEntries(rows.results.map(row=>[row.key,row.value])),updated_at:rows.results.reduce<string|null>((latest,row)=>!latest||row.updated_at>latest?row.updated_at:latest,null)};}
  if (request.method==='PATCH'&&p==='/v1/admin/settings'){const settings=safeSettings(await body(request)),t=now(),entries=Object.entries(settings);if(entries.length)await env.DB.batch(entries.map(([key,value])=>env.DB.prepare('INSERT INTO site_settings(key,value,updated_at) VALUES(?,?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value,updated_at=excluded.updated_at').bind(key,value,t)));await audit(env,request,'settings.updated','settings',null);return{settings,updated_at:t};}
  if (request.method==='GET'&&p==='/v1/admin/export'){const [categories,tags,articles,articleTags,settings]=await Promise.all([env.DB.prepare('SELECT * FROM article_categories ORDER BY sort_order,name').all(),env.DB.prepare('SELECT * FROM tags ORDER BY name').all(),env.DB.prepare('SELECT * FROM articles ORDER BY created_at').all(),env.DB.prepare('SELECT article_id,tag_id FROM article_tags ORDER BY article_id,tag_id').all(),env.DB.prepare(`SELECT key,value FROM site_settings WHERE key IN (${[...SAFE_SETTING_KEYS].map(()=>'?').join(',')}) ORDER BY key`).bind(...SAFE_SETTING_KEYS).all<{key:string;value:string}>()]);return{version:1,exported_at:now(),categories:categories.results,tags:tags.results,articles:articles.results,article_tags:articleTags.results,settings:Object.fromEntries(settings.results.map(row=>[row.key,row.value]))};}
  if (request.method==='GET'&&p==='/v1/admin/import'){const [categories,tags,articles]=await Promise.all([env.DB.prepare('SELECT count(*) count FROM article_categories').first<{count:number}>(),env.DB.prepare('SELECT count(*) count FROM tags').first<{count:number}>(),env.DB.prepare('SELECT count(*) count FROM articles').first<{count:number}>()]);return{version:1,accepted_content_type:'application/json',max_records:IMPORT_LIMIT,max_bytes:IMPORT_BYTES,conflict_policies:['skip','update'],supports_validation:true,current:{categories:categories?.count||0,tags:tags?.count||0,articles:articles?.count||0}};}
  if (request.method==='POST'&&p==='/v1/admin/import'){
    const declared=Number(request.headers.get('content-length')||0);if(declared>IMPORT_BYTES)throw new CmsError(413,'IMPORT_TOO_LARGE',`Import payloads are limited to ${IMPORT_BYTES} bytes.`);
    const plan=importPlan(await importBody(request)),summary={categories:plan.categories.length,tags:plan.tags.length,articles:plan.articles.length,settings:Object.keys(plan.settings).length,total:plan.total,conflict_policy:plan.conflictPolicy,validated:true,written:!plan.validateOnly};
    if(plan.validateOnly)return summary;
    const t=now(),statements:D1PreparedStatement[]=[];
    for(const row of plan.categories){const values=[row.id,row.slug,row.name,row.description,row.sort_order,t,t];statements.push(plan.conflictPolicy==='skip'?env.DB.prepare('INSERT OR IGNORE INTO article_categories(id,slug,name,description,sort_order,created_at,updated_at) VALUES(?,?,?,?,?,?,?)').bind(...values):env.DB.prepare('INSERT INTO article_categories(id,slug,name,description,sort_order,created_at,updated_at) VALUES(?,?,?,?,?,?,?) ON CONFLICT(slug) DO UPDATE SET name=excluded.name,description=excluded.description,sort_order=excluded.sort_order,updated_at=excluded.updated_at').bind(...values));}
    for(const row of plan.tags){const values=[row.id,row.slug,row.name,t,t];statements.push(plan.conflictPolicy==='skip'?env.DB.prepare('INSERT OR IGNORE INTO tags(id,slug,name,created_at,updated_at) VALUES(?,?,?,?,?)').bind(...values):env.DB.prepare('INSERT INTO tags(id,slug,name,created_at,updated_at) VALUES(?,?,?,?,?) ON CONFLICT(slug) DO UPDATE SET name=excluded.name,updated_at=excluded.updated_at').bind(...values));}
    for(const row of plan.articles){const {id,...a}=row,values=[id,...Object.values(a),t,t];statements.push(plan.conflictPolicy==='skip'?env.DB.prepare('INSERT OR IGNORE INTO articles(id,slug,title,excerpt,content,status,featured,category_id,seo_title,seo_description,canonical_url,featured_image_url,og_image_url,author_name,published_at,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(...values):env.DB.prepare('INSERT INTO articles(id,slug,title,excerpt,content,status,featured,category_id,seo_title,seo_description,canonical_url,featured_image_url,og_image_url,author_name,published_at,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(slug) DO UPDATE SET title=excluded.title,excerpt=excluded.excerpt,content=excluded.content,status=excluded.status,featured=excluded.featured,category_id=excluded.category_id,seo_title=excluded.seo_title,seo_description=excluded.seo_description,canonical_url=excluded.canonical_url,featured_image_url=excluded.featured_image_url,og_image_url=excluded.og_image_url,author_name=excluded.author_name,published_at=excluded.published_at,updated_at=excluded.updated_at').bind(...values));}
    for(const [key,value] of Object.entries(plan.settings))statements.push(env.DB.prepare('INSERT INTO site_settings(key,value,updated_at) VALUES(?,?,?) ON CONFLICT(key) DO UPDATE SET value=excluded.value,updated_at=excluded.updated_at').bind(key,value,t));
    if(statements.length)await env.DB.batch(statements);await audit(env,request,'content.imported','import',null);return summary;
  }
  if (request.method === 'GET' && p === '/v1/admin/media') {const l=limit(url),q=(url.searchParams.get('q')||'').slice(0,160),mime=url.searchParams.get('mime')||'',where: string[]=[] ,values:unknown[]=[];if(q){where.push('(filename LIKE ? OR alt_text LIKE ?)');values.push(`%${q}%`,`%${q}%`)}if(mime){where.push('mime_type LIKE ?');values.push(`${mime}%`)}const clause=where.length?` WHERE ${where.join(' AND ')}`:'';const total=await env.DB.prepare(`SELECT count(*) count FROM media${clause}`).bind(...values).first<{count:number}>();const rows=await env.DB.prepare(`SELECT * FROM media${clause} ORDER BY created_at ${url.searchParams.get('sort')==='oldest'?'ASC':'DESC'} LIMIT ? OFFSET ?`).bind(...values,l,(page(url)-1)*l).all();return{results:rows.results,page:page(url),limit:l,total:total?.count||0};}
  if (request.method === 'POST' && p === '/v1/admin/media/upload') {
    const form=await request.formData(), file=form.get('file'); if(!(file instanceof File))throw new CmsError(422,'FILE_REQUIRED','Choose an image.'); if(file.size>10*1024*1024)throw new CmsError(413,'FILE_TOO_LARGE','Images are limited to 10 MB.');
    const ext=file.name.split('.').pop()?.toLowerCase()||'', rule=IMAGE_TYPES[file.type]; if(!rule||!rule.extensions.includes(ext))throw new CmsError(415,'UNSUPPORTED_IMAGE','JPEG, PNG, WebP, AVIF, and GIF are supported; SVG is disabled.'); const bytes=new Uint8Array(await file.arrayBuffer()); if(rule.signatures.length&&!rule.signatures.some(s=>s.every((x,i)=>bytes[i]===x)))throw new CmsError(415,'INVALID_IMAGE','File contents do not match the image type.');
    if(file.type==='image/avif' && new TextDecoder().decode(bytes.slice(4,12)).indexOf('ftyp')<0)throw new CmsError(415,'INVALID_IMAGE','Invalid AVIF file.'); const d=new Date(), stem=(file.name.slice(0,-ext.length-1).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'image').slice(0,80), key=`uploads/${d.getUTCFullYear()}/${String(d.getUTCMonth()+1).padStart(2,'0')}/${stem}-${crypto.randomUUID().slice(0,8)}.${ext}`;
    await env.MEDIA.put(key,bytes,{httpMetadata:{contentType:file.type,cacheControl:'public, max-age=31536000, immutable'}}); const id=crypto.randomUUID(), publicUrl=`${(env.R2_PUBLIC_BASE_URL||'').replace(/\/$/,'')}/${key}`; try{await env.DB.prepare('INSERT INTO media(id,r2_key,url,filename,mime_type,size_bytes,alt_text,created_at) VALUES(?,?,?,?,?,?,?,?)').bind(id,key,publicUrl,file.name,file.type,file.size,text(form.get('alt_text'),'alt_text',500)||'',now()).run();}catch(e){await env.MEDIA.delete(key);throw e;} return {id,key,url:publicUrl};
  }
  const mediaId=p.match(/^\/v1\/admin\/media\/([^/]+)$/)?.[1]; if(mediaId&&request.method==='DELETE'){const m=await env.DB.prepare('SELECT * FROM media WHERE id=?').bind(mediaId).first<{r2_key:string,url:string}>();if(!m)throw new CmsError(404,'NOT_FOUND','Media not found.');const refs=await env.DB.prepare('SELECT count(*) count FROM articles WHERE featured_image_url=? OR og_image_url=? OR content LIKE ?').bind(m.url,m.url,`%${m.url}%`).first<{count:number}>();if(refs?.count)throw new CmsError(409,'MEDIA_IN_USE','Media is referenced by an article.');await env.MEDIA.delete(m.r2_key);await env.DB.prepare('DELETE FROM media WHERE id=?').bind(mediaId).run();return{deleted:true};}
  if (request.method==='PATCH'&&mediaId){const b=await body(request);await env.DB.prepare('UPDATE media SET alt_text=? WHERE id=?').bind(text(b.alt_text,'alt_text',500)??'',mediaId).run();return{updated:true};}
  if(request.method==='GET'&&p==='/v1/admin/tools')return env.DB.prepare('SELECT * FROM tool_content ORDER BY tool_slug').all();
  const toolSlug=p.match(/^\/v1\/admin\/tools\/([^/]+)$/)?.[1];if(toolSlug&&request.method==='PATCH'){if(!SLUG.test(toolSlug))throw new CmsError(422,'INVALID_SLUG','Invalid tool slug.');const b=await body(request),t=now();await env.DB.prepare(`INSERT INTO tool_content(id,tool_slug,custom_title,description,instructions,seo_title,seo_description,featured,popular,new_badge,is_visible,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?) ON CONFLICT(tool_slug) DO UPDATE SET custom_title=excluded.custom_title,description=excluded.description,instructions=excluded.instructions,seo_title=excluded.seo_title,seo_description=excluded.seo_description,featured=excluded.featured,popular=excluded.popular,new_badge=excluded.new_badge,is_visible=excluded.is_visible,updated_at=excluded.updated_at`).bind(crypto.randomUUID(),toolSlug,text(b.custom_title,'custom_title',240),text(b.description,'description',5000),text(b.instructions,'instructions',50000),text(b.seo_title,'seo_title',240),text(b.seo_description,'seo_description',500),b.featured?1:0,b.popular?1:0,b.new_badge?1:0,b.is_visible===false?0:1,t,t).run();return{updated:true};}
  throw new CmsError(404, 'NOT_FOUND', 'CMS endpoint not found.');
}

export const cmsInternals = {
  SLUG, STATUSES, IMAGE_TYPES,
  SAFE_SETTING_KEYS, IMPORT_LIMIT, IMPORT_BYTES,
  acceptsAdminToken,
  allowedOrigins,
  safeSettings,
  importPlan,
  importBody,
  isStale: (loadedUpdatedAt: unknown, currentUpdatedAt: string) => loadedUpdatedAt !== currentUpdatedAt,
  isPublic: (status: string, publishedAt: string | null, at: string) => status === 'published' && (!publishedAt || publishedAt <= at) || status === 'scheduled' && !!publishedAt && publishedAt <= at,
  autosaveCreatesRevision: (autosave: boolean) => !autosave,
};
