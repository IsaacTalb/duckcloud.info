export interface ToolCategory {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const toolCategories: ToolCategory[] = [
  {
    slug: 'json',
    name: 'JSON & Data',
    description: 'Format, validate, and transform structured data.',
    icon: '{ }',
  },
  {
    slug: 'encoding',
    name: 'Encoding',
    description: 'Encode and decode text safely in your browser.',
    icon: '01',
  },
  {
    slug: 'security',
    name: 'Security',
    description: 'Hash, inspect, and generate security-focused data.',
    icon: '◇',
  },
  {
    slug: 'dates',
    name: 'Dates & Time',
    description: 'Convert timestamps and work across time zones.',
    icon: '◷',
  },
];

export function getToolCategory(slug: string) {
  return toolCategories.find((category) => category.slug === slug);
}
