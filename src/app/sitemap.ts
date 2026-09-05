import type { MetadataRoute } from 'next';
import { toolCategories } from '@/config/tool-categories';
import { activeTools } from '@/config/tools';
import { getArticles, getCategories } from '@/lib/cms';

export const dynamic = 'force-static';

const baseUrl = 'https://duckcloud.info';

const staticRoutes = [
  { path: '', changeFrequency: 'weekly', priority: 1 },
  { path: '/tools', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/blog', changeFrequency: 'weekly', priority: 0.9 },
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cmsArticles, categories] = await Promise.all([getArticles(1), getCategories()]);
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/blog?category=${category.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.65,
  }));

  return [
    ...staticRoutes.map(({ path, changeFrequency, priority }) => ({
      url: `${baseUrl}${path}`,
      changeFrequency,
      priority,
    })),
    ...blogRoutes.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...cmsArticles.map((article) => ({
      url: `${baseUrl}/blog/${article.slug}`,
      lastModified: article.updated_at,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    ...categoryRoutes,
    ...activeTools.map((tool) => ({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: tool.updatedAt || tool.addedAt || new Date().toISOString(),
      changeFrequency: 'monthly' as const,
      priority: tool.featured ? 0.95 : 0.8,
    })),
    ...toolCategories.map((category) => ({
      url: `${baseUrl}/tools/${category.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.75,
    })),
  ];
}
