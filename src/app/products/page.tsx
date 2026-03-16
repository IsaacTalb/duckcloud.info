import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Platform Updates - Duck Cloud',
  description: 'Duck Cloud now focuses on tools, utilities, and platform resources.',
};

export default function ProductsPage() {
  return (
    <section className="py-20 px-4 bg-dark min-h-screen">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="section-title text-gradient mb-6">Platform Updates</h1>
        <p className="section-subtitle mb-6">
          We have streamlined this website to focus on tools, utilities, documentation, and
          practical resources for creators and developers.
        </p>
        <p className="text-gray-400 mb-10">
          Explore our latest utilities and integrations from a single place.
        </p>
        <Link href="/tools" className="btn-primary inline-flex items-center gap-2">
          Explore Tools →
        </Link>
      </div>
    </section>
  );
}
