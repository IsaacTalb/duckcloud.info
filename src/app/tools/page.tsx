import type { Metadata } from 'next';
import { Tools } from '@/components/sections/Tools';

export const metadata: Metadata = {
  title: 'Tools - Duck Cloud',
  description: 'Tools and utilities for Duck Cloud products',
};

export default function ToolsPage() {
  return <Tools />;
}
