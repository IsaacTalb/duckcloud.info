export interface CmsArticle { id:string; slug:string; title:string; excerpt?:string|null; content?:string; status?:string; featured?:number; category?:string|null; category_slug?:string|null; author_name?:string|null; published_at?:string|null; updated_at:string; featured_image_url?:string|null; og_image_url?:string|null; seo_title?:string|null; seo_description?:string|null; canonical_url?:string|null }
const base = process.env.NEXT_PUBLIC_DUCKCLOUD_API_URL || 'https://api.duckcloud.info';
async function get<T>(path:string, revalidate=600):Promise<T|null>{try{const response=await fetch(`${base}${path}`,{next:{revalidate,tags:['cms']}});if(!response.ok)return null;const json=await response.json() as {data:T};return json.data;}catch{return null;}}
export async function getArticles(page=1){const data=await get<{results:CmsArticle[]}>(`/v1/articles?page=${page}&limit=12`,300);return data?.results??[];}
export const getArticle=(slug:string)=>get<CmsArticle>(`/v1/articles/${encodeURIComponent(slug)}`,300);
export async function getCategories(){const data=await get<{results:Array<{id:string;slug:string;name:string;description?:string}>}>('/v1/categories',1800);return data?.results??[];}

export function markdownToHtml(markdown:string):string {
  const escape=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
  return markdown.split(/\n{2,}/).map(block=>{const safe=escape(block.trim());if(safe.startsWith('### '))return `<h3>${safe.slice(4)}</h3>`;if(safe.startsWith('## '))return `<h2>${safe.slice(3)}</h2>`;if(safe.startsWith('# '))return `<h1>${safe.slice(2)}</h1>`;if(safe.startsWith('```')&&safe.endsWith('```'))return `<pre><code>${safe.replace(/^```[^\n]*\n?|```$/g,'')}</code></pre>`;const linked=safe.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,'<a href="$2" rel="noopener noreferrer">$1</a>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/`([^`]+)`/g,'<code>$1</code>');return `<p>${linked.replace(/\n/g,'<br>')}</p>`;}).join('');
}
