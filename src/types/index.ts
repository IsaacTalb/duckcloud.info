export interface Product {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: 'social' | 'news' | 'utility' | 'developer';
  icon: string;
  url: string;
  image: string;
  features: string[];
  status: 'active' | 'beta' | 'coming-soon';
  tags: string[];
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  isPopular: boolean;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
  slug: string;
}
