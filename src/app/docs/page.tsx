import type { Metadata } from 'next';
import { Docs } from '@/components/sections/Docs';

export const metadata: Metadata = {
  title: 'Documentation - Duck Cloud',
  description: 'Documentation and guides for Duck Cloud products',
};

export default function DocsPage() {
  return <Docs />;
}
