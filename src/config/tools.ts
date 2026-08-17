export type ToolExecution = 'client' | 'worker';

export interface ToolDefinition {
  slug: string;
  name: string;
  shortName?: string;
  description: string;
  category: string;
  keywords: string[];
  execution: ToolExecution;
  icon: string;
  featured?: boolean;
  popular?: boolean;
  new?: boolean;
  relatedTools?: string[];
  seo: { title: string; description: string };
}

export const tools: ToolDefinition[] = [
  {
    slug: 'json-formatter',
    name: 'JSON Formatter',
    shortName: 'JSON',
    icon: '{ }',
    category: 'json',
    execution: 'client',
    popular: true,
    featured: true,
    description: 'Format, validate, and beautify JSON with clear, readable indentation.',
    keywords: ['json', 'beautify', 'pretty print', 'validate', 'developer'],
    relatedTools: ['base64-encoder', 'sha256-generator'],
    seo: {
      title: 'JSON Formatter & Validator — Free Online Tool',
      description:
        'Format, beautify, and validate JSON locally in your browser. Fast, private, and free—your JSON is never uploaded.',
    },
  },
  {
    slug: 'base64-encoder',
    name: 'Base64 Encoder',
    icon: '64',
    category: 'encoding',
    execution: 'client',
    popular: true,
    description: 'Encode Unicode text to Base64 without sending it over the network.',
    keywords: ['base64', 'encode', 'decoder', 'text', 'unicode'],
    relatedTools: ['json-formatter', 'sha256-generator'],
    seo: {
      title: 'Base64 Encoder — Private Online Encoding Tool',
      description:
        'Encode text as Base64 instantly in your browser, with correct Unicode support and no uploads.',
    },
  },
  {
    slug: 'sha256-generator',
    name: 'SHA-256 Generator',
    shortName: 'SHA-256',
    icon: '#',
    category: 'security',
    execution: 'client',
    popular: true,
    featured: true,
    description: 'Create a SHA-256 digest using your browser’s native Web Crypto API.',
    keywords: ['sha', 'sha256', 'hash', 'checksum', 'crypto', 'digest'],
    relatedTools: ['uuid-generator', 'base64-encoder'],
    seo: {
      title: 'SHA-256 Hash Generator — Browser-Based & Private',
      description:
        'Generate SHA-256 hashes locally with Web Crypto. Your text stays on your device.',
    },
  },
  {
    slug: 'uuid-generator',
    name: 'UUID Generator',
    shortName: 'UUID',
    icon: '✣',
    category: 'security',
    execution: 'client',
    popular: true,
    new: true,
    description: 'Generate cryptographically strong UUID v4 identifiers instantly.',
    keywords: ['uuid', 'guid', 'random', 'identifier', 'v4'],
    relatedTools: ['sha256-generator', 'unix-timestamp-converter'],
    seo: {
      title: 'UUID v4 Generator — Secure & Private',
      description:
        'Generate secure UUID v4 identifiers locally using your browser’s cryptographic random generator.',
    },
  },
  {
    slug: 'unix-timestamp-converter',
    name: 'Unix Timestamp Converter',
    shortName: 'Timestamp',
    icon: '◷',
    category: 'dates',
    execution: 'client',
    popular: true,
    featured: true,
    description: 'Convert Unix timestamps to readable dates in UTC and your local time.',
    keywords: ['unix', 'epoch', 'timestamp', 'date', 'time', 'converter'],
    relatedTools: ['uuid-generator', 'json-formatter'],
    seo: {
      title: 'Unix Timestamp Converter — Epoch Date Tool',
      description:
        'Convert Unix timestamps and human-readable dates instantly in your browser, in local time and UTC.',
    },
  },
];

export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug);
export const getToolsByCategory = (category: string) =>
  tools.filter((tool) => tool.category === category);
export const getRelatedTools = (tool: ToolDefinition) =>
  (tool.relatedTools ?? []).map(getTool).filter((item): item is ToolDefinition => Boolean(item));
