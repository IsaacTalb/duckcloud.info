import type { Metadata } from 'next';
import { BlogList } from '@/components/sections/BlogList';

export const metadata: Metadata = {
  title: 'Blog - Duck Cloud',
  description: 'Latest news and updates from Duck Cloud',
};

export default function BlogPage() {
  return <BlogList />;
}
