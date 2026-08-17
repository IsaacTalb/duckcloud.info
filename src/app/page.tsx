import Link from 'next/link';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { ToolSearch } from '@/components/tools/ToolSearch';
import { toolCategories } from '@/config/tool-categories';
import { activeTools } from '@/config/tools';
const tutorials = [
  {
    title: 'Python for DevOps: Automation Scripts',
    category: 'DevOps',
    href: '/blog/python-devops-automation',
  },
  {
    title: 'API Integration: A Beginner Guide',
    category: 'Developers',
    href: '/blog/api-integration-beginner-guide',
  },
  {
    title: 'React Server Components for SEO',
    category: 'Web',
    href: '/blog/react-server-components-seo',
  },
];
export default function HomePage() {
  const popular = activeTools.filter((tool) => tool.popular).slice(0, 3);
  const featured = activeTools.filter((tool) => tool.featured);
  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,214,10,0.09),transparent_45%)]" />
        <div className="page-container relative py-20 text-center sm:py-28">
          <span className="eyebrow">Privacy-first developer utilities</span>
          <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-7xl">
            Tools for the web<span className="text-yellow-300">.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Free developer, IT, security, and data utilities that work instantly. Your inputs stay
            in your browser.
          </p>
          <div className="mt-9">
            <ToolSearch tools={activeTools} />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm text-slate-400">
            <span>Popular:</span>
            {popular.map((tool) => (
              <Link className="hover:text-yellow-300" href={`/tools/${tool.slug}`} key={tool.slug}>
                {tool.shortName ?? tool.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="page-container space-y-20 py-20">
        <section>
          <div className="section-header">
            <div>
              <span className="eyebrow">Start here</span>
              <h2 className="home-heading">Popular tools</h2>
            </div>
            <Link href="/tools" className="text-sm font-semibold text-yellow-300">
              View all tools →
            </Link>
          </div>
          <ToolGrid tools={popular} />
        </section>
        <section>
          <div className="section-header">
            <div>
              <span className="eyebrow">Explore</span>
              <h2 className="home-heading">Categories</h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {toolCategories.map((category) => (
              <Link
                href={`/tools/${category.slug}`}
                key={category.slug}
                className="rounded-xl border border-slate-700 bg-slate-900 p-6 hover:border-yellow-400"
              >
                <span className="font-mono text-lg font-bold text-yellow-300">{category.icon}</span>
                <h3 className="mt-5 text-lg font-bold">{category.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{category.description}</p>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <div className="section-header">
            <div>
              <span className="eyebrow">Learn</span>
              <h2 className="home-heading">Latest tutorials</h2>
            </div>
            <Link href="/blog" className="text-sm font-semibold text-yellow-300">
              Read the blog →
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {tutorials.map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="rounded-xl border border-slate-700 p-6 hover:border-yellow-400"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-yellow-300">
                  {post.category}
                </span>
                <h3 className="mt-3 text-lg font-bold leading-7">{post.title}</h3>
                <span className="mt-6 block text-sm text-slate-400">Read tutorial →</span>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <div className="section-header">
            <div>
              <span className="eyebrow">Hand-picked</span>
              <h2 className="home-heading">Featured tools</h2>
            </div>
          </div>
          <ToolGrid tools={featured} />
        </section>
      </div>
    </>
  );
}
