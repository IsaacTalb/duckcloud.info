export type ToolExecution = 'client' | 'worker';
export type ToolStatus = 'active' | 'planned';

export interface ToolDefinition {
  slug: string;
  name: string;
  shortName?: string;
  description: string;
  category: string;
  keywords: string[];
  execution: ToolExecution;
  icon: string;
  status: ToolStatus;
  featured?: boolean;
  popular?: boolean;
  new?: boolean;
  relatedTools?: string[];
  seo: { title: string; description: string };
}

type ToolSeed = [slug: string, name: string, category: string, icon: string, description: string, keywords?: string[]];

const plannedSeeds: ToolSeed[] = [
  ['json-minifier', 'JSON Minifier', 'json', '{−}', 'Remove whitespace from JSON for compact output.'],
  ['json-to-csv', 'JSON to CSV', 'json', '⇄', 'Convert JSON arrays into CSV data.'],
  ['json-to-typescript', 'JSON to TypeScript', 'json', 'TS', 'Create TypeScript interfaces from JSON.'],
  ['yaml-to-json', 'YAML to JSON', 'json', 'Y→J', 'Convert YAML documents into JSON.'],
  ['xml-formatter', 'XML Formatter', 'json', '<>', 'Format and indent XML documents.'],
  ['csv-viewer', 'CSV Viewer', 'json', 'CSV', 'Inspect CSV data in a readable table.'],
  ['base64-decoder', 'Base64 Decoder', 'encoding', '64', 'Decode Base64 data into readable text.'],
  ['url-encoder', 'URL Encoder', 'encoding', '%', 'Encode text for safe use in URLs.'],
  ['url-decoder', 'URL Decoder', 'encoding', '%−', 'Decode percent-encoded URL text.'],
  ['html-entity-encoder', 'HTML Entity Encoder', 'encoding', '&;', 'Encode reserved HTML characters.'],
  ['html-entity-decoder', 'HTML Entity Decoder', 'encoding', '</>', 'Decode HTML entities into text.'],
  ['jwt-decoder', 'JWT Decoder', 'security', 'JWT', 'Inspect JWT headers and payloads locally.'],
  ['md5-generator', 'MD5 Generator', 'security', 'MD5', 'Generate MD5 checksums for compatibility use.'],
  ['sha1-generator', 'SHA-1 Generator', 'security', 'SHA1', 'Generate SHA-1 checksums locally.'],
  ['password-generator', 'Password Generator', 'security', '***', 'Create strong random passwords.'],
  ['password-strength', 'Password Strength Checker', 'security', '✓', 'Estimate password strength locally.'],
  ['hmac-generator', 'HMAC Generator', 'security', 'H', 'Create keyed message authentication codes.'],
  ['date-difference', 'Date Difference Calculator', 'dates', 'Δ', 'Calculate the duration between dates.'],
  ['timezone-converter', 'Time Zone Converter', 'dates', 'TZ', 'Compare times across time zones.'],
  ['iso-date-converter', 'ISO Date Converter', 'dates', 'ISO', 'Convert ISO 8601 dates into readable formats.'],
  ['cron-parser', 'Cron Expression Parser', 'dates', '*/', 'Explain cron schedules in plain language.'],
  ['url-parser', 'URL Parser', 'web', 'URL', 'Break a URL into its component parts.'],
  ['query-string-builder', 'Query String Builder', 'web', '?=', 'Build URL query strings safely.'],
  ['html-preview', 'HTML Preview', 'web', '<H>', 'Preview HTML snippets in the browser.'],
  ['markdown-preview', 'Markdown Preview', 'web', 'MD', 'Preview Markdown as rendered content.'],
  ['css-minifier', 'CSS Minifier', 'web', 'CSS', 'Minify CSS source code.'],
  ['javascript-minifier', 'JavaScript Minifier', 'web', 'JS', 'Minify JavaScript source code.'],
  ['regex-tester', 'Regex Tester', 'text', '.*', 'Test regular expressions against text.'],
  ['word-counter', 'Word Counter', 'text', '123', 'Count words, characters, and lines.'],
  ['case-converter', 'Case Converter', 'text', 'Aa', 'Convert text between common letter cases.'],
  ['lorem-ipsum', 'Lorem Ipsum Generator', 'text', '¶', 'Generate placeholder copy.'],
  ['text-diff', 'Text Diff', 'text', '±', 'Compare two blocks of text.'],
  ['slug-generator', 'Slug Generator', 'text', 'a-b', 'Turn titles into URL-friendly slugs.'],
  ['qr-code-generator', 'QR Code Generator', 'generators', 'QR', 'Create a QR code from text or a URL.'],
  ['random-number-generator', 'Random Number Generator', 'generators', '#?', 'Generate random numbers within a range.'],
  ['fake-data-generator', 'Test Data Generator', 'generators', 'DATA', 'Create sample data for development.'],
  ['color-converter', 'Color Converter', 'design', '◉', 'Convert HEX, RGB, and HSL colors.'],
  ['gradient-generator', 'CSS Gradient Generator', 'design', '◒', 'Build CSS gradients visually.'],
  ['contrast-checker', 'Contrast Checker', 'design', 'Aa', 'Check color contrast for accessibility.'],
  ['image-to-base64', 'Image to Base64', 'images', 'IMG', 'Convert an image into a data URL locally.'],
  ['image-compressor', 'Image Compressor', 'images', '⇲', 'Reduce image file size in your browser.'],
  ['svg-optimizer', 'SVG Optimizer', 'images', 'SVG', 'Clean and optimize SVG markup.'],
  ['ip-address-lookup', 'IP Address Lookup', 'network', 'IP', 'Inspect public IP address information.'],
  ['dns-lookup', 'DNS Lookup', 'network', 'DNS', 'Inspect DNS records for a domain.'],
  ['user-agent-parser', 'User Agent Parser', 'network', 'UA', 'Parse browser user-agent strings.'],
];

const plannedTools: ToolDefinition[] = plannedSeeds.map(([slug, name, category, icon, description, keywords = []]) => ({
  slug, name, category, icon, description, keywords: [name, category, ...keywords], execution: 'client', status: 'planned',
  seo: { title: `${name} — Free Online Tool`, description },
}));

export const tools: ToolDefinition[] = [
  { slug: 'json-formatter', name: 'JSON Formatter', shortName: 'JSON', icon: '{ }', category: 'json', execution: 'client', status: 'active', popular: true, featured: true, description: 'Format, validate, and beautify JSON with clear, readable indentation.', keywords: ['json', 'beautify', 'pretty print', 'validate', 'developer'], relatedTools: ['base64-encoder', 'sha256-generator'], seo: { title: 'JSON Formatter & Validator — Free Online Tool', description: 'Format, beautify, and validate JSON locally in your browser.' } },
  { slug: 'base64-encoder', name: 'Base64 Encoder', icon: '64', category: 'encoding', execution: 'client', status: 'active', popular: true, description: 'Encode Unicode text to Base64 without sending it over the network.', keywords: ['base64', 'encode', 'text', 'unicode'], relatedTools: ['json-formatter', 'sha256-generator'], seo: { title: 'Base64 Encoder — Private Online Encoding Tool', description: 'Encode text as Base64 instantly and privately in your browser.' } },
  { slug: 'sha256-generator', name: 'SHA-256 Generator', shortName: 'SHA-256', icon: '#', category: 'security', execution: 'client', status: 'active', popular: true, featured: true, description: 'Create a SHA-256 digest using your browser’s native Web Crypto API.', keywords: ['sha', 'sha256', 'hash', 'checksum', 'crypto'], relatedTools: ['uuid-generator', 'base64-encoder'], seo: { title: 'SHA-256 Hash Generator — Browser-Based & Private', description: 'Generate SHA-256 hashes locally with Web Crypto.' } },
  { slug: 'uuid-generator', name: 'UUID Generator', shortName: 'UUID', icon: '✣', category: 'security', execution: 'client', status: 'active', popular: true, new: true, description: 'Generate cryptographically strong UUID v4 identifiers instantly.', keywords: ['uuid', 'guid', 'random', 'identifier'], relatedTools: ['sha256-generator', 'unix-timestamp-converter'], seo: { title: 'UUID v4 Generator — Secure & Private', description: 'Generate secure UUID v4 identifiers locally.' } },
  { slug: 'unix-timestamp-converter', name: 'Unix Timestamp Converter', shortName: 'Timestamp', icon: '◷', category: 'dates', execution: 'client', status: 'active', popular: true, featured: true, description: 'Convert Unix timestamps to readable dates in UTC and your local time.', keywords: ['unix', 'epoch', 'timestamp', 'date', 'time'], relatedTools: ['uuid-generator', 'json-formatter'], seo: { title: 'Unix Timestamp Converter — Epoch Date Tool', description: 'Convert Unix timestamps and readable dates instantly.' } },
  ...plannedTools,
];

export const activeTools = tools.filter((tool) => tool.status === 'active');
export const getTool = (slug: string) => activeTools.find((tool) => tool.slug === slug);
export const getToolsByCategory = (category: string) => activeTools.filter((tool) => tool.category === category);
export const getRelatedTools = (tool: ToolDefinition) => (tool.relatedTools ?? []).map(getTool).filter((item): item is ToolDefinition => Boolean(item));
