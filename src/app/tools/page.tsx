import type { Metadata } from 'next';
import { ToolGrid } from '@/components/tools/ToolGrid';
import { ToolSearch } from '@/components/tools/ToolSearch';
import { toolCategories } from '@/config/tool-categories';
import { tools } from '@/config/tools';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Free Developer, IT & Security Tools',
  description:
    'Fast, privacy-first browser tools for developers, IT professionals, and security teams.',
  alternates: { canonical: '/tools' },
  openGraph: {
    title: 'Free Developer, IT & Security Tools — Duck Cloud',
    description: 'Useful browser-based tools that keep your data on your device.',
    url: '/tools',
  },
};
export default function ToolsPage() {
  return (
    <div className="page-container py-14">
      <header className="max-w-3xl">
        <span className="eyebrow">Developer toolbox</span>
        <h1 className="page-title">Tools that respect your data.</h1>
        <p className="page-lead">
          Fast utilities for everyday development, security, encoding, and data work. No account, no
          uploads, no waiting.
        </p>
      </header>
      <div className="my-9">
        <ToolSearch tools={tools} />
      </div>
      <section aria-labelledby="all-tools">
        <h2 id="all-tools" className="mb-5 text-2xl font-bold">
          All tools <span className="text-base font-normal text-slate-500">({tools.length})</span>
        </h2>
        <ToolGrid tools={tools} />
      </section>
      <section className="mt-16" aria-labelledby="categories">
        <h2 id="categories" className="mb-5 text-2xl font-bold">
          Browse categories
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {toolCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/tools/${category.slug}`}
              className="rounded-xl border border-slate-700 bg-slate-900 p-5 hover:border-yellow-400"
            >
              <span className="font-mono text-yellow-300">{category.icon}</span>
              <h3 className="mt-4 font-bold">{category.name}</h3>
              <p className="mt-2 text-sm text-slate-400">{category.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
