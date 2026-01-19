import type { Product, Tool, Feature } from '@/types';

export const products: Product[] = [
  {
    id: 'news-platform',
    name: 'News Platform',
    description: 'Latest updates from Duck Cloud',
    longDescription:
      'Our comprehensive news platform keeps you updated with the latest announcements, features, and updates from Duck Cloud and the tech community.',
    category: 'news',
    icon: '📰',
    url: 'https://news.duckcloud.info',
    sourceurl: 'https://github.com/IsaacTalb/news',
    image: '/products/news.png',
    features: [
      'Real-time news updates',
      'Community-driven content',
      'Advanced filtering',
      'Search functionality',
    ],
    status: 'active',
    tags: ['news', 'updates', 'community'],
  },
  {
    id: 'tiktok-commenter',
    name: 'TikTok Commenter',
    description: 'Engage with TikTok content intelligently',
    longDescription:
      'Automate and intelligently manage your TikTok comments. Increase engagement with smart comment strategies and community management tools.',
    category: 'social',
    icon: '💬',
    url: 'https://tiktok-commenters.vercel.app',
    sourceurl: 'https://github.com/IsaacTalb/tiktok_commenters',
    image: '/products/tiktok.png',
    features: [
      'Smart commenting',
      'Engagement tracking',
      'Analytics dashboard',
      'Comment templates',
    ],
    status: 'active',
    tags: ['tiktok', 'social', 'engagement'],
  },
  {
    id: 'api-suite',
    name: 'API Suite',
    description: 'Powerful APIs for developers',
    longDescription:
      'Comprehensive API suite for integrating Duck Cloud tools into your applications. Built with developers in mind.',
    category: 'developer',
    icon: '⚙️',
    url: 'https://api.duckcloud.info',
    sourceurl: 'https://github.com/duckcloud/api-suite',
    image: '/products/api.png',
    features: [
      'RESTful API',
      'WebSocket support',
      'Rate limiting',
      'Authentication',
    ],
    status: 'active',
    tags: ['api', 'developer', 'integration'],
  },
  {
    id: 'analytics-tool',
    name: 'Analytics Tool',
    description: 'Deep insights into your metrics',
    longDescription:
      'Advanced analytics platform for tracking performance metrics, user behavior, and engagement across all Duck Cloud platforms.',
    category: 'utility',
    icon: '📊',
    url: 'https://analytics.duckcloud.info',
    sourceurl: 'https://github.com/duckcloud/analytics-tool',
    image: '/products/analytics.png',
    features: [
      'Real-time analytics',
      'Custom dashboards',
      'Export reports',
      'Predictive insights',
    ],
    status: 'beta',
    tags: ['analytics', 'metrics', 'insights'],
  },
];

export const features: Feature[] = [
  {
    id: 'fast',
    title: 'Lightning Fast',
    description: 'Optimized for speed and performance with millisecond response times',
    icon: '⚡',
  },
  {
    id: 'secure',
    title: 'Security First',
    description: 'Enterprise-grade security with end-to-end encryption',
    icon: '🔒',
  },
  {
    id: 'scalable',
    title: 'Highly Scalable',
    description: 'Handle millions of requests without breaking a sweat',
    icon: '📈',
  },
  {
    id: 'devfriendly',
    title: 'Developer Friendly',
    description: 'Clear documentation and SDKs in multiple languages',
    icon: '👨‍💻',
  },
  {
    id: 'opensource',
    title: 'Open Source',
    description: 'Community-driven development with transparent roadmaps',
    icon: '🎨',
  },
  {
    id: 'support',
    title: '24/7 Support',
    description: 'Dedicated support team ready to help anytime',
    icon: '🤝',
  },
];

export const tools: Tool[] = [
  {
    id: 'json-parser',
    name: 'JSON Parser',
    description: 'Fast and reliable JSON parsing utility',
    icon: '{}',
    category: 'utilities',
    isPopular: true,
  },
  {
    id: 'url-shortener',
    name: 'URL Shortener',
    description: 'Create short, memorable URLs',
    icon: '🔗',
    category: 'utilities',
    isPopular: true,
  },
  {
    id: 'code-formatter',
    name: 'Code Formatter',
    description: 'Format and beautify your code',
    icon: '✨',
    category: 'developer',
    isPopular: true,
  },
  {
    id: 'qr-generator',
    name: 'QR Generator',
    description: 'Generate QR codes instantly',
    icon: '📱',
    category: 'utilities',
    isPopular: false,
  },
  {
    id: 'password-generator',
    name: 'Password Generator',
    description: 'Create secure passwords',
    icon: '🔐',
    category: 'security',
    isPopular: false,
  },
  {
    id: 'color-picker',
    name: 'Color Picker',
    description: 'Professional color tools',
    icon: '🎨',
    category: 'design',
    isPopular: false,
  },
];
