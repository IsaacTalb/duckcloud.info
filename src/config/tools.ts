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
  ['json-to-csv', 'JSON to CSV', 'json', '⇄', 'Convert JSON arrays into CSV data.'],
  ['json-to-typescript', 'JSON to TypeScript', 'json', 'TS', 'Create TypeScript interfaces from JSON.'],
  ['yaml-to-json', 'YAML to JSON', 'json', 'Y→J', 'Convert YAML documents into JSON.'],
  ['xml-formatter', 'XML Formatter', 'json', '<>', 'Format and indent XML documents.'],
  ['csv-viewer', 'CSV Viewer', 'json', 'CSV', 'Inspect CSV data in a readable table.'],
  ['html-entity-encoder', 'HTML Entity Encoder', 'encoding', '&;', 'Encode reserved HTML characters.'],
  ['html-entity-decoder', 'HTML Entity Decoder', 'encoding', '</>', 'Decode HTML entities into text.'],
  ['sha1-generator', 'SHA-1 Generator', 'security', 'SHA1', 'Generate SHA-1 checksums locally.'],
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
  ['case-converter', 'Case Converter', 'text', 'Aa', 'Convert text between common letter cases.'],
  ['lorem-ipsum', 'Lorem Ipsum Generator', 'text', '¶', 'Generate placeholder copy.'],
  ['text-diff', 'Text Diff', 'text', '±', 'Compare two blocks of text.'],
  ['slug-generator', 'Slug Generator', 'text', 'a-b', 'Turn titles into URL-friendly slugs.'],
  ['qr-code-generator', 'QR Code Generator', 'generators', 'QR', 'Create a QR code from text or a URL.'],
  ['random-number-generator', 'Random Number Generator', 'generators', '#?', 'Generate random numbers within a range.'],
  ['fake-data-generator', 'Test Data Generator', 'generators', 'DATA', 'Create sample data for development.'],
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
  { slug: 'json-validator', name: 'JSON Validator', icon: '✓', category: 'json', execution: 'client', status: 'active', description: 'Check JSON syntax and get helpful parsing errors.', keywords: ['json validator', 'json'], relatedTools: ['json-formatter', 'json-minifier'], seo: { title: 'JSON Validator — Free Private Online Tool', description: 'Check JSON syntax and get helpful parsing errors. Runs entirely in your browser.' } },
  { slug: 'json-minifier', name: 'JSON Minifier', icon: '{−}', category: 'json', execution: 'client', status: 'active', description: 'Remove insignificant whitespace from valid JSON.', keywords: ['json minifier', 'json'], relatedTools: ['json-formatter', 'json-validator'], seo: { title: 'JSON Minifier — Free Private Online Tool', description: 'Remove insignificant whitespace from valid JSON. Runs entirely in your browser.' } },
  { slug: 'json-viewer', name: 'JSON Viewer', icon: '{…}', category: 'json', execution: 'client', status: 'active', description: 'Explore JSON values in a readable nested tree.', keywords: ['json viewer', 'json'], relatedTools: ['json-formatter', 'json-validator'], seo: { title: 'JSON Viewer — Free Private Online Tool', description: 'Explore JSON values in a readable nested tree. Runs entirely in your browser.' } },
  { slug: 'base64-decoder', name: 'Base64 Decoder', icon: '64−', category: 'encoding', execution: 'client', status: 'active', description: 'Decode Base64 into Unicode text.', keywords: ['base64 decoder', 'encoding'], relatedTools: ['base64-encoder', 'url-decoder'], seo: { title: 'Base64 Decoder — Free Private Online Tool', description: 'Decode Base64 into Unicode text. Runs entirely in your browser.' } },
  { slug: 'url-encoder', name: 'URL Encoder', icon: '%', category: 'encoding', execution: 'client', status: 'active', description: 'Percent-encode text for a URL component.', keywords: ['url encoder', 'encoding'], relatedTools: ['url-decoder', 'base64-encoder'], seo: { title: 'URL Encoder — Free Private Online Tool', description: 'Percent-encode text for a URL component. Runs entirely in your browser.' } },
  { slug: 'url-decoder', name: 'URL Decoder', icon: '%−', category: 'encoding', execution: 'client', status: 'active', description: 'Decode percent-encoded URL text safely.', keywords: ['url decoder', 'encoding'], relatedTools: ['url-encoder', 'base64-decoder'], seo: { title: 'URL Decoder — Free Private Online Tool', description: 'Decode percent-encoded URL text safely. Runs entirely in your browser.' } },
  { slug: 'sha512-generator', name: 'SHA-512 Generator', icon: '#512', category: 'security', execution: 'client', status: 'active', description: 'Generate SHA-512 digests with Web Crypto.', keywords: ['sha-512 generator', 'security'], relatedTools: ['sha256-generator', 'md5-generator'], seo: { title: 'SHA-512 Generator — Free Private Online Tool', description: 'Generate SHA-512 digests with Web Crypto. Runs entirely in your browser.' } },
  { slug: 'md5-generator', name: 'MD5 Generator', icon: 'MD5', category: 'security', execution: 'client', status: 'active', description: 'Generate legacy MD5 checksums for compatibility.', keywords: ['md5 generator', 'security'], relatedTools: ['sha256-generator', 'sha512-generator'], seo: { title: 'MD5 Generator — Free Private Online Tool', description: 'Generate legacy MD5 checksums for compatibility. Runs entirely in your browser.' } },
  { slug: 'password-generator', name: 'Password Generator', icon: '***', category: 'security', execution: 'client', status: 'active', description: 'Generate passwords with cryptographically secure randomness.', keywords: ['password generator', 'security'], relatedTools: ['password-strength', 'uuid-generator'], seo: { title: 'Password Generator — Free Private Online Tool', description: 'Generate passwords with cryptographically secure randomness. Runs entirely in your browser.' } },
  { slug: 'password-strength', name: 'Password Strength Checker', icon: '✓', category: 'security', execution: 'client', status: 'active', description: 'Estimate password strength without transmitting it.', keywords: ['password strength checker', 'security'], relatedTools: ['password-generator', 'sha256-generator'], seo: { title: 'Password Strength Checker — Free Private Online Tool', description: 'Estimate password strength without transmitting it. Runs entirely in your browser.' } },
  { slug: 'jwt-decoder', name: 'JWT Decoder', icon: 'JWT', category: 'security', execution: 'client', status: 'active', description: 'Inspect JWT headers and payloads without verifying them.', keywords: ['jwt decoder', 'security'], relatedTools: ['jwt-expiry-checker', 'base64-decoder'], seo: { title: 'JWT Decoder — Free Private Online Tool', description: 'Inspect JWT headers and payloads without verifying them. Runs entirely in your browser.' } },
  { slug: 'jwt-expiry-checker', name: 'JWT Expiry Checker', icon: 'EXP', category: 'security', execution: 'client', status: 'active', description: 'Read a JWT exp claim and show its status.', keywords: ['jwt expiry checker', 'security'], relatedTools: ['jwt-decoder', 'unix-timestamp-converter'], seo: { title: 'JWT Expiry Checker — Free Private Online Tool', description: 'Read a JWT exp claim and show its status. Runs entirely in your browser.' } },
  { slug: 'hex-to-rgb', name: 'HEX to RGB', icon: '#→', category: 'design', execution: 'client', status: 'active', description: 'Convert hexadecimal colors to RGB channels.', keywords: ['hex to rgb', 'design'], relatedTools: ['rgb-to-hex'], seo: { title: 'HEX to RGB — Free Private Online Tool', description: 'Convert hexadecimal colors to RGB channels. Runs entirely in your browser.' } },
  { slug: 'rgb-to-hex', name: 'RGB to HEX', icon: '→#', category: 'design', execution: 'client', status: 'active', description: 'Convert RGB channels to hexadecimal color.', keywords: ['rgb to hex', 'design'], relatedTools: ['hex-to-rgb'], seo: { title: 'RGB to HEX — Free Private Online Tool', description: 'Convert RGB channels to hexadecimal color. Runs entirely in your browser.' } },
  { slug: 'word-counter', name: 'Word / Character Counter', icon: '123', category: 'text', execution: 'client', status: 'active', description: 'Count words, characters, non-space characters, and lines.', keywords: ['word / character counter', 'text'], relatedTools: ['json-formatter'], seo: { title: 'Word / Character Counter — Free Private Online Tool', description: 'Count words, characters, non-space characters, and lines. Runs entirely in your browser.' } },
  ...plannedTools,
];

export const activeTools = tools.filter((tool) => tool.status === 'active');
export const getTool = (slug: string) => activeTools.find((tool) => tool.slug === slug);
export const getToolsByCategory = (category: string) => activeTools.filter((tool) => tool.category === category);
export const getRelatedTools = (tool: ToolDefinition) => (tool.relatedTools ?? []).map(getTool).filter((item): item is ToolDefinition => Boolean(item));
