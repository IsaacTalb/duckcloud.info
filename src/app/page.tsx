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
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--primary)_12%,transparent),transparent_48%)]" />
        <div className="page-container relative py-16 text-center sm:py-20">
          <span className="eyebrow">Fast. Private. Useful.</span>
          <h1 className="mx-auto mt-5 max-w-4xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            Useful tools. <span className="text-yellow-300">No unnecessary complexity.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
            Free tools for developers, IT professionals, and everyday technical work. Most run
            directly in your browser; remote lookups are always clearly identified.
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
        <section aria-labelledby="why-duck-cloud">
          <div className="rounded-2xl border border-slate-700 bg-slate-900 p-7 sm:p-10">
            <span className="eyebrow">Why Duck Cloud</span>
            <h2 id="why-duck-cloud" className="home-heading">Built for the work, not the wait.</h2>
            <div className="mt-7 grid gap-6 md:grid-cols-3">
              <div><h3 className="font-semibold">Browser-first privacy</h3><p className="mt-2 text-sm leading-6 text-slate-400">Local tools keep your text, code, passwords, and files on your device.</p></div>
              <div><h3 className="font-semibold">Fast by default</h3><p className="mt-2 text-sm leading-6 text-slate-400">Focused interfaces and native browser APIs avoid unnecessary uploads and waiting.</p></div>
              <div><h3 className="font-semibold">Clear execution labels</h3><p className="mt-2 text-sm leading-6 text-slate-400">Every tool tells you whether it runs locally or needs a limited network lookup.</p></div>
            </div>
          </div>
        </section>
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
