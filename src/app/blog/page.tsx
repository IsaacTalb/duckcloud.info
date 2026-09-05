import type { Metadata } from 'next';
import { getArticles } from '@/lib/cms';
import { BlogCard } from '@/components/blog/BlogCard';

export const metadata: Metadata = {
  title: 'Duck Cloud Blog',
  description: 'Duck Cloud tutorials, guides, and developer articles.',
  alternates: { canonical: '/blog' },
};

export default async function Blog({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const articles = await getArticles(page);

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[color:var(--primary)]">Duck Cloud Blog</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[color:var(--foreground)] sm:text-5xl">
          Practical guides for Duck Cloud tools, security, and workflows
        </h1>
        <p className="mt-4 text-lg leading-8 text-[color:var(--muted-foreground)]">
          Tutorials, SEO-friendly explainers, and step-by-step articles that link directly to the tools they describe.
        </p>
      </div>

      {articles.length === 0 ? (
        <div className="mt-12 rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)] p-8">
          <p className="text-base font-medium text-[color:var(--foreground)]">CMS articles will appear here after publication.</p>
          <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">Existing source-controlled article URLs remain available.</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {articles.map((article) => (
            <BlogCard key={article.id} article={article} />
          ))}
        </div>
      )}

      <nav className="mt-10 flex items-center gap-4 text-sm font-medium text-[color:var(--foreground)]">
        {page > 1 && <a href={`/blog?page=${page - 1}`} className="hover:text-[color:var(--primary)]">← Newer</a>}
        {articles.length === 12 && <a href={`/blog?page=${page + 1}`} className="hover:text-[color:var(--primary)]">Older →</a>}
      </nav>
    </main>
  );
}
