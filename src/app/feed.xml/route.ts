import { getArticles } from '@/lib/cms';

const esc = (s: string = '') => s.replace(/[<>&'\"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]!));

export async function GET() {
  const articles = await getArticles(1);
  const items = articles
    .map(
      (article) => `
        <item>
          <title>${esc(article.title)}</title>
          <link>https://duckcloud.info/blog/${esc(article.slug)}</link>
          <guid isPermaLink="true">https://duckcloud.info/blog/${esc(article.slug)}</guid>
          <description>${esc(article.excerpt || '')}</description>
          ${article.published_at ? `<pubDate>${new Date(article.published_at).toUTCString()}</pubDate>` : ''}
        </item>`,
    )
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Duck Cloud Blog</title>
    <link>https://duckcloud.info/blog</link>
    <description>Duck Cloud developer articles and guides.</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`,
    { headers: { 'content-type': 'application/rss+xml; charset=utf-8', 'cache-control': 'public, s-maxage=900' } },
  );
}
