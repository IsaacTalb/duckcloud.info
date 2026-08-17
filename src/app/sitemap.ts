import type { MetadataRoute } from 'next';
import { toolCategories } from '@/config/tool-categories';
import { tools } from '@/config/tools';
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://duckcloud.info';
  const staticRoutes = [
    '',
    '/tools',
    '/blog',
    '/about',
    '/contact',
    '/docs',
    '/products',
    '/privacy',
    '/terms',
    '/security',
    '/licence',
  ];
  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: path === '' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '' ? 1 : 0.7,
    })),
    ...tools.map((tool) => ({
      url: `${base}/tools/${tool.slug}`,
      changeFrequency: 'monthly' as const,
      priority: tool.featured ? 0.9 : 0.8,
    })),
    ...toolCategories.map((category) => ({
      url: `${base}/tools/${category.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
