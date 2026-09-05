import Link from 'next/link';
import type { CmsArticle } from '@/lib/cms';

function formatDate(value?: string | null) {
  if (!value) return null;
  return new Date(value).toLocaleDateString('en-US', { dateStyle: 'medium', timeZone: 'UTC' });
}

export function BlogCard({ article }: { article: CmsArticle }) {
  const href = `/blog/${article.slug}`;
  const date = formatDate(article.published_at);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[color:var(--primary)] hover:shadow-lg">
      <div className="relative flex h-full flex-col">
        <Link href={href} className="absolute inset-0 rounded-2xl" aria-label={`Read ${article.title}`}>
          <span className="sr-only">Read {article.title}</span>
        </Link>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--primary)]">
          {article.category || 'Article'}
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-[color:var(--foreground)] group-hover:text-[color:var(--primary)]">
          {article.title}
        </h2>
        <p className="mt-3 flex-1 text-sm leading-7 text-[color:var(--muted-foreground)]">
          {article.excerpt}
        </p>
        <div className="mt-6 flex items-center justify-between gap-3">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-[color:var(--muted-foreground)]">
            {date || 'Duck Cloud'}
          </p>
          <span className="inline-flex items-center rounded-full border border-[color:var(--border-strong)] bg-[color:var(--surface)] px-4 py-2 text-sm font-semibold text-[color:var(--foreground)] transition group-hover:border-[color:var(--primary)] group-hover:text-[color:var(--primary)]">
            Read now
          </span>
        </div>
      </div>
    </article>
  );
}
