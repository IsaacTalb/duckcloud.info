import {markdownToHtml, type CmsArticle} from '@/lib/cms';

export function ArticleContent({article,preview=false}:{article:CmsArticle;preview?:boolean}) {
  const rendered=markdownToHtml(article.content||'');
  return <main className="mx-auto max-w-6xl px-4 py-24">
    {preview&&<div role="status" className="mb-6 rounded-lg border border-yellow-500 bg-yellow-950/50 p-4 text-yellow-100">Draft preview — only administrators can see this page.</div>}
    <article className="mx-auto max-w-4xl">
      {article.featured_image_url&&<img src={article.featured_image_url} alt="" className="mb-8 max-h-[30rem] w-full rounded-xl object-cover"/>}
      <p className="text-sm text-yellow-400">{article.category}</p>
      <h1 className="mt-2 text-4xl font-bold">{article.title}</h1>
      <p className="mt-4 text-xl text-gray-400">{article.excerpt}</p>
      <p className="mt-4 text-sm text-gray-500">{article.published_at&&new Date(article.published_at).toLocaleString('en-US',{dateStyle:'long',timeStyle:'short'})}{article.author_name&&` · ${article.author_name}`}</p>
      {rendered.toc.length>=3&&<details className="mt-8 rounded-lg border border-gray-700 p-4 lg:sticky lg:top-24"><summary className="cursor-pointer font-semibold">Table of contents</summary><nav aria-label="Table of contents"><ol className="mt-3 space-y-1 text-sm">{rendered.toc.map(h=><li key={h.id} className={h.level===3?'ml-4':''}><a className="text-yellow-300 hover:underline" href={`#${h.id}`}>{h.text}</a></li>)}</ol></nav></details>}
      <div className="prose prose-invert mt-10 max-w-none [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-gray-950 [&_pre]:p-4" dangerouslySetInnerHTML={{__html:rendered.html}}/>
      <div className="my-10 rounded border border-dashed border-gray-700 p-5 text-center text-xs text-gray-500" aria-label="Advertisement position">Advertisement</div>
    </article>
  </main>;
}
