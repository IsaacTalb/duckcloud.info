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

export class CmsError extends Error { constructor(public status: number, public code: string, message: string) { super(message); } }
const page = (url: URL) => Math.max(1, Math.min(10000, Number(url.searchParams.get('page')) || 1));
const limit = (url: URL) => Math.max(1, Math.min(50, Number(url.searchParams.get('limit')) || 20));
const now = () => new Date().toISOString();
const body = async (request: Request): Promise<Record<string, unknown>> => {
  if (!request.headers.get('content-type')?.includes('application/json')) throw new CmsError(415, 'UNSUPPORTED_MEDIA_TYPE', 'Expected JSON.');
  try { return await request.json(); } catch { throw new CmsError(400, 'INVALID_JSON', 'Request body is not valid JSON.'); }
};
const text = (v: unknown, name: string, max: number, required = false) => {
  if (v == null && !required) return null;
  if (typeof v !== 'string' || (required && !v.trim()) || v.length > max) throw new CmsError(422, 'VALIDATION_ERROR', `${name} is invalid.`);
  return v.trim();
};
const auth = (request: Request, env: Env) => {
  if (!env.ADMIN_API_TOKEN || request.headers.get('authorization') !== `Bearer ${env.ADMIN_API_TOKEN}`) throw new CmsError(401, 'UNAUTHORIZED', 'Administrator authorization is required.');
  if (!['GET', 'HEAD'].includes(request.method)) {
    const origin = request.headers.get('origin');
    const allowed = (env.ALLOWED_ORIGINS || '').split(',');
    if (origin && !allowed.includes(origin)) throw new CmsError(403, 'ORIGIN_REJECTED', 'Request origin is not allowed.');
  }
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

export async function cms(request: Request, env: Env, url: URL): Promise<unknown | null> {
  const p = url.pathname;
  if (request.method === 'GET' && p === '/v1/articles') {
    const l = limit(url), offset = (page(url) - 1) * l;
    const q = `SELECT a.id,a.slug,a.title,a.excerpt,a.featured,a.author_name,a.published_at,a.updated_at,a.featured_image_url,c.name category,c.slug category_slug FROM articles a LEFT JOIN article_categories c ON c.id=a.category_id WHERE (a.status='published' OR (a.status='scheduled' AND a.published_at<=?)) AND (a.published_at IS NULL OR a.published_at<=?) ORDER BY COALESCE(a.published_at,a.created_at) DESC LIMIT ? OFFSET ?`;
    return env.DB.prepare(q).bind(now(), now(), l, offset).all();
  }
  if (request.method === 'GET' && p.startsWith('/v1/articles/')) {
    const slug = decodeURIComponent(p.slice(13));
    const item = await env.DB.prepare(`SELECT a.*,c.name category,c.slug category_slug FROM articles a LEFT JOIN article_categories c ON c.id=a.category_id WHERE a.slug=? AND (a.status='published' OR (a.status='scheduled' AND a.published_at<=?)) AND (a.published_at IS NULL OR a.published_at<=?)`).bind(slug, now(), now()).first();
    if (!item) throw new CmsError(404, 'NOT_FOUND', 'Article not found.'); return item;
  }
  if (request.method === 'GET' && p === '/v1/categories') return env.DB.prepare('SELECT * FROM article_categories ORDER BY sort_order,name').all();
  if (request.method === 'GET' && p.startsWith('/v1/tool-content/')) return (await env.DB.prepare('SELECT * FROM tool_content WHERE tool_slug=? AND is_visible=1').bind(decodeURIComponent(p.slice(17))).first()) || {};
  if (!p.startsWith('/v1/admin/')) return null;
  auth(request, env);
  if (request.method === 'GET' && p === '/v1/admin/dashboard') return env.DB.prepare(`SELECT (SELECT count(*) FROM articles WHERE status='published') published,(SELECT count(*) FROM articles WHERE status='draft') drafts,(SELECT count(*) FROM articles WHERE status='scheduled') scheduled,(SELECT count(*) FROM media) media,(SELECT count(*) FROM tool_content WHERE featured=1) featured_tools`).first();
  if (request.method === 'GET' && p === '/v1/admin/articles') return env.DB.prepare('SELECT id,slug,title,status,published_at,updated_at FROM articles ORDER BY updated_at DESC LIMIT ? OFFSET ?').bind(limit(url), (page(url)-1)*limit(url)).all();
  if (request.method === 'GET' && p.startsWith('/v1/admin/articles/')) { const item=await env.DB.prepare('SELECT * FROM articles WHERE id=?').bind(p.slice(19)).first(); if(!item) throw new CmsError(404,'NOT_FOUND','Article not found.'); return item; }
  if (request.method === 'POST' && p === '/v1/admin/articles') { const a=articleInput(await body(request)), id=crypto.randomUUID(), t=now(); try { await env.DB.prepare(`INSERT INTO articles(id,slug,title,excerpt,content,status,featured,category_id,seo_title,seo_description,canonical_url,featured_image_url,og_image_url,author_name,published_at,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(id,...Object.values(a),t,t).run(); } catch { throw new CmsError(409,'DUPLICATE_SLUG','An article already uses that slug.'); } return {id,...a}; }
  const articleId = p.match(/^\/v1\/admin\/articles\/([^/]+)$/)?.[1];
  if (articleId && request.method === 'PATCH') { const a=articleInput(await body(request)); const found=await env.DB.prepare('SELECT id FROM articles WHERE id=?').bind(articleId).first(); if(!found)throw new CmsError(404,'NOT_FOUND','Article not found.'); try { await env.DB.prepare(`UPDATE articles SET slug=?,title=?,excerpt=?,content=?,status=?,featured=?,category_id=?,seo_title=?,seo_description=?,canonical_url=?,featured_image_url=?,og_image_url=?,author_name=?,published_at=?,updated_at=? WHERE id=?`).bind(...Object.values(a),now(),articleId).run(); } catch { throw new CmsError(409,'DUPLICATE_SLUG','An article already uses that slug.'); } return {id:articleId,...a}; }
  if (articleId && request.method === 'DELETE') { await env.DB.prepare('DELETE FROM articles WHERE id=?').bind(articleId).run(); return {deleted:true}; }
  if (request.method === 'GET' && p === '/v1/admin/categories') return env.DB.prepare('SELECT * FROM article_categories ORDER BY sort_order,name').all();
  if (request.method === 'POST' && p === '/v1/admin/categories') { const b=await body(request), slug=text(b.slug,'slug',100,true)!, name=text(b.name,'name',120,true)!; if(!SLUG.test(slug))throw new CmsError(422,'INVALID_SLUG','Invalid category slug.'); const id=crypto.randomUUID(),t=now(); await env.DB.prepare('INSERT INTO article_categories VALUES(?,?,?,?,?,?,?)').bind(id,slug,name,text(b.description,'description',5000),Number(b.sort_order)||0,t,t).run(); return {id,slug,name}; }
  if (request.method === 'GET' && p === '/v1/admin/media') return env.DB.prepare('SELECT * FROM media ORDER BY created_at DESC LIMIT ? OFFSET ?').bind(limit(url), (page(url)-1)*limit(url)).all();
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

export const cmsInternals = { SLUG, STATUSES, IMAGE_TYPES };
