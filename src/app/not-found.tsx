/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been removed or the
          URL might be incorrect.
        </p>
        <Link href="/" className="btn-primary inline-block">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
