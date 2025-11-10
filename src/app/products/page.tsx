import type { Metadata } from 'next';
import { ProductDetail } from '@/components/sections/ProductDetail';

export const metadata: Metadata = {
  title: 'Products - Duck Cloud',
  description: 'Explore all products and tools from Duck Cloud',
};

export default function ProductsPage() {
  return <ProductDetail />;
}
