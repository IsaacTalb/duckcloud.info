'use client';

import { usePathname } from 'next/navigation';
import { PageViewTracker } from './PageViewTracker.tsx';

export function AutoPageViewTracker({ toolIdentifiers }: { toolIdentifiers: string[] }) {
  const pathname = usePathname();
  const parts = pathname.split('/').filter(Boolean);

  if (parts.length === 2 && parts[0] === 'blog') {
    return <PageViewTracker kind="blog" identifier={parts[1]} />;
  }

  if (parts.length === 2 && parts[0] === 'tools' && toolIdentifiers.includes(parts[1])) {
    return <PageViewTracker kind="tool" identifier={parts[1]} />;
  }

  return null;
}