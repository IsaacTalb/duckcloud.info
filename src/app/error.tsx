"use client";

import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-7xl font-bold text-danger mb-4">⚠️</h1>
        <h2 className="text-3xl font-bold mb-4">Something Went Wrong</h2>
        <p className="text-gray-400 mb-2">{error.message}</p>
        <p className="text-gray-500 mb-8 text-sm">
          {error.digest && `Error ID: ${error.digest}`}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="btn-primary"
          >
            Try Again
          </button>
          <Link href="/" className="btn-secondary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
