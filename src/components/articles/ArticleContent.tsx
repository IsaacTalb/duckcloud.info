import { markdownToHtml, type CmsArticle } from '@/lib/cms';

export function ArticleContent({ article, preview = false }: { article: CmsArticle; preview?: boolean }) {
  const rendered = markdownToHtml(article.content || '');
  const published = article.published_at
    ? new Date(article.published_at).toLocaleDateString('en-US', { dateStyle: 'long', timeZone: 'UTC' })
    : null;

  return (
    <main className="article-page">
      {preview && <div role="status" className="preview-notice">Draft preview — only administrators can see this page.</div>}
      <article className="article-layout">
        <header className="article-header">
          {article.category && <p className="article-category">{article.category}</p>}
          <h1>{article.title}</h1>
          {article.excerpt && <p className="article-deck">{article.excerpt}</p>}
          {(published || article.author_name) && (
            <p className="article-byline">
              {article.author_name && <span>By {article.author_name}</span>}
              {published && <time dateTime={article.published_at || undefined}>{published}</time>}
            </p>
          )}
        </header>
        {article.featured_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.featured_image_url} alt="" className="article-hero-image" />
        )}
        {rendered.toc.length >= 3 && (
          <details className="article-toc">
            <summary>In this article</summary>
            <nav aria-label="Table of contents">
              <ol>
                {rendered.toc.map((heading) => (
                  <li key={heading.id} className={heading.level === 3 ? 'toc-subitem' : ''}>
                    <a href={`#${heading.id}`}>{heading.text}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </details>
        )}
        <div className="article-prose" dangerouslySetInnerHTML={{ __html: rendered.html }} />
        <div className="article-ad" aria-label="Advertisement position">Advertisement</div>
      </article>
    </main>
  );
}
