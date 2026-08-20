import type { MetadataRoute } from 'next';
import { toolCategories } from '@/config/tool-categories';
import { activeTools } from '@/config/tools';

const baseUrl = 'https://duckcloud.info';

const staticRoutes = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/tools', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/about', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/docs', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/products', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.4 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.4 },
  { path: '/security', changeFrequency: 'yearly', priority: 0.4 },
  { path: '/licence', changeFrequency: 'yearly', priority: 0.4 },
] as const;

const blogRoutes = [
  '/blog/api-integration-beginner-guide',
  '/blog/introducing-duck-cloud',
  '/blog/python-devops-automation',
  '/blog/social-media-automation-best-practices',
  '/blog/tiktok-commenter-v2.0',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...staticRoutes.map(({ path, changeFrequency, priority }) => ({
      url: `${baseUrl}${path}`,
      changeFrequency,
      priority,
    })),
    ...blogRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...activeTools.map((tool) => ({
      url: `${baseUrl}/tools/${tool.slug}`,
      changeFrequency: 'monthly' as const,
      priority: tool.featured ? 0.9 : 0.8,
    })),
    ...toolCategories.map((category) => ({
      url: `${baseUrl}/tools/${category.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ];
}
