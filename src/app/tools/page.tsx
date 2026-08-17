import type { Metadata } from 'next';
import { ToolsDirectory } from '@/components/tools/ToolsDirectory';
import { toolCategories } from '@/config/tool-categories';
import { activeTools } from '@/config/tools';
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
      <section className="mt-9" aria-labelledby="all-tools">
        <h2 id="all-tools" className="mb-5 text-2xl font-bold">
          All tools
        </h2>
        <ToolsDirectory tools={activeTools} categories={toolCategories} />
      </section>
    </div>
  );
}
