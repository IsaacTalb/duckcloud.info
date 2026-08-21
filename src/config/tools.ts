export type ToolExecution = 'client' | 'worker';
export type ToolStatus = 'active' | 'planned';

export interface ToolDefinition {
  slug: string;
  name: string;
  shortName?: string;
  description: string;
  category: string;
  keywords: string[];
  aliases?: string[];
  execution: ToolExecution;
  icon: string;
  status: ToolStatus;
  featured?: boolean;
  popular?: boolean;
  new?: boolean;
  relatedTools?: string[];
  addedAt?: string;
  updatedAt?: string;
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

const phase3Seeds: ToolSeed[] = [
  ['json-diff','JSON Diff / Compare','json','±','Compare nested JSON and identify added, removed, and changed values.'], ['json-to-yaml','JSON to YAML','json','J→Y','Convert JSON data into readable YAML.'], ['yaml-to-json','YAML to JSON','json','Y→J','Validate and convert YAML documents to JSON.'], ['csv-to-json','CSV to JSON','json','C→J','Convert delimited CSV rows into JSON objects.'], ['json-to-csv','JSON to CSV','json','J→C','Export arrays of JSON objects as CSV.'], ['xml-formatter','XML Formatter','json','XML','Validate and indent XML markup.'], ['yaml-validator','YAML Validator','json','Y✓','Check YAML syntax and structure locally.'], ['csv-viewer','CSV Viewer','json','CSV','Inspect pasted or dropped CSV in a responsive table.'],
  ['text-diff','Text Diff','text','±','Compare text line by line with accessible change labels.'], ['case-converter','Case Converter','text','Aa','Convert text to camel, snake, kebab, title, upper, or lower case.'], ['slug-generator','Slug Generator','text','a-b','Create clean URL slugs from titles.'], ['random-string-generator','Random String Generator','generators','ABC','Generate secure random strings with custom length and character sets.'], ['lorem-ipsum','Lorem Ipsum Generator','text','¶','Generate configurable placeholder paragraphs.'],
  ['html-formatter','HTML Formatter','web','<>','Indent HTML markup for easier review.'], ['html-minifier','HTML Minifier','web','<−>','Remove safe, unnecessary whitespace from HTML.'], ['css-formatter','CSS Formatter','web','CSS','Format CSS rules and declarations.'], ['css-minifier','CSS Minifier','web','C−','Minify CSS without sending source code anywhere.'], ['javascript-formatter','JavaScript Formatter','web','JS','Format JavaScript source for readability.'], ['javascript-minifier','JavaScript Minifier','web','J−','Remove comments and unnecessary JavaScript whitespace.'], ['markdown-preview','Markdown Preview','web','MD','Safely preview Markdown in a sandboxed document.'], ['markdown-to-html','Markdown to HTML','web','M→H','Convert common Markdown syntax to sanitized HTML.'], ['html-to-markdown','HTML to Markdown','web','H→M','Convert common semantic HTML elements to Markdown.'],
  ['regex-tester','Regex Tester','text','.*','Highlight regular-expression matches and inspect capture groups.'], ['cron-generator','Cron Expression Generator','dates','*/','Build a five-field cron schedule with a readable explanation.'], ['cron-parser','Cron Expression Parser','dates','CRON','Validate and explain five-field cron expressions in your timezone.'], ['sql-formatter','SQL Formatter','web','SQL','Format common SQL statements and clauses.'], ['dotenv-formatter','.env Formatter','web','ENV','Normalize and validate dotenv assignments.'], ['chmod-calculator','chmod Calculator','security','755','Convert Unix numeric modes and symbolic permissions.'], ['mime-type-lookup','MIME Type Lookup','web','MIME','Look up common MIME types by extension or media type.'], ['http-status-lookup','HTTP Status Code Lookup','web','HTTP','Find standard HTTP status meanings by code or phrase.'],
  ['cidr-calculator','CIDR Calculator','network','CIDR','Calculate IPv4 CIDR network boundaries and host capacity.'], ['subnet-calculator','Subnet Calculator','network','MASK','Inspect IPv4 subnet masks, wildcards, and usable ranges.'], ['ipv4-converter','IPv4 Converter','network','IPv4','Convert IPv4 addresses between dotted, integer, hex, and binary forms.'],
  ['contrast-checker','Contrast Checker','design','Aa','Measure WCAG color contrast and show clear pass or fail results.'], ['color-picker','Color Picker','design','◉','Pick a browser color and copy its HEX and RGB values.'], ['hex-to-hsl','HEX to HSL','design','HSL','Convert hexadecimal colors to HSL.'], ['hsl-to-hex','HSL to HEX','design','#','Convert HSL channels to hexadecimal color.'], ['gradient-generator','CSS Gradient Generator','design','◒','Create and preview two-color CSS linear gradients.'],
  ['qr-code-generator','QR Code Generator','generators','QR','Create downloadable QR codes for text, URLs, Wi-Fi, email, and phone.'], ['qr-code-reader','QR Code Reader','generators','SCAN','Read QR codes from an image or camera entirely in the browser.'],
];

const phase7TextSeeds: ToolSeed[] = [
  ['remove-duplicate-lines', 'Remove Duplicate Lines', 'text', '≠', 'Remove repeated lines while preserving their first occurrence.'],
  ['sort-lines', 'Sort Lines', 'text', 'A↓', 'Sort lines alphabetically with locale-aware comparison.'],
  ['reverse-lines', 'Reverse Lines', 'text', '↕', 'Reverse the order of lines without changing their contents.'],
  ['shuffle-lines', 'Shuffle Lines', 'text', '⇆', 'Randomize line order using secure browser randomness.'],
  ['trim-whitespace', 'Trim Whitespace', 'text', '⌁', 'Remove leading and trailing whitespace from every line.'],
  ['remove-empty-lines', 'Remove Empty Lines', 'text', '−', 'Remove blank and whitespace-only lines from text.'],
  ['text-repeater', 'Text Repeater', 'text', '×', 'Repeat text a configurable number of times.'],
  ['text-separator', 'Text Separator', 'text', '·', 'Replace line breaks with a custom separator.'],
];

const plannedTools: ToolDefinition[] = plannedSeeds.map(([slug, name, category, icon, description, keywords = []]) => ({
  slug, name, category, icon, description, keywords: [name, category, ...keywords], execution: 'client', status: 'planned',
  seo: { title: `${name} — Free Online Tool`, description },
}));

export const tools: ToolDefinition[] = [
  { slug: 'dns-lookup', name: 'DNS Lookup', icon: 'DNS', category: 'network', execution: 'worker', status: 'active', featured: true, new: true, description: 'Inspect public A, AAAA, CNAME, MX, TXT, and NS records.', keywords: ['dns','domain','records'], relatedTools: ['mx-lookup','http-header-checker'], seo: { title: 'DNS Lookup — Duck Cloud', description: 'Look up public DNS records through the privacy-conscious Duck Cloud lookup service.' } },
  { slug: 'mx-lookup', name: 'MX Lookup', icon: 'MX', category: 'network', execution: 'worker', status: 'active', new: true, description: 'Find mail exchangers, priorities, and their public IP records.', keywords: ['mx','mail','dns'], relatedTools: ['dns-lookup'], seo: { title: 'MX Lookup — Duck Cloud', description: 'Inspect public mail exchanger records and related DNS information.' } },
  { slug: 'http-header-checker', name: 'HTTP Header Checker', icon: 'HEAD', category: 'network', execution: 'worker', status: 'active', new: true, description: 'Inspect public response headers without downloading large pages.', keywords: ['headers','http','server'], relatedTools: ['website-status','redirect-checker'], seo: { title: 'HTTP Header Checker — Duck Cloud', description: 'Inspect response, content, cache, and server headers for a public URL.' } },
  { slug: 'website-status', name: 'Website Status Checker', icon: '200', category: 'network', execution: 'worker', status: 'active', new: true, description: 'Check reachability, response status, timing, and redirects.', keywords: ['uptime','status','http'], relatedTools: ['http-header-checker','redirect-checker'], seo: { title: 'Website Status Checker — Duck Cloud', description: 'Run a time-limited reachability and HTTP status check.' } },
  { slug: 'redirect-checker', name: 'Redirect Checker', icon: '↪', category: 'network', execution: 'worker', status: 'active', new: true, description: 'Trace up to ten safe HTTP redirects and detect loops.', keywords: ['redirect','301','302'], relatedTools: ['http-header-checker','website-status'], seo: { title: 'Redirect Checker — Duck Cloud', description: 'Trace a public URL redirect chain safely.' } },
  { slug: 'robots-txt-checker', name: 'robots.txt Checker', icon: 'BOT', category: 'network', execution: 'worker', status: 'active', new: true, description: 'Read and summarize a public site’s robots.txt directives.', keywords: ['robots','sitemap','crawler'], relatedTools: ['dns-lookup','website-status'], seo: { title: 'robots.txt Checker — Duck Cloud', description: 'Fetch a size-limited robots.txt and identify sitemaps and crawler groups.' } },
  { slug: 'what-is-my-ip', name: 'What Is My IP?', icon: 'IP', category: 'network', execution: 'worker', status: 'active', new: true, description: 'Show public request information exposed by Cloudflare.', keywords: ['public ip','country','user agent'], relatedTools: ['dns-lookup'], seo: { title: 'What Is My IP? — Duck Cloud', description: 'View your public IP and approximate Cloudflare request metadata without storage.' } },
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
  ...phase3Seeds.map(([slug,name,category,icon,description,keywords=[]]) => ({slug,name,category,icon,description,keywords:[name,category,...keywords],aliases:[name.replace(/\s+/g,' ')],execution:'client' as const,status:'active' as const,new:true,relatedTools: category==='network' ? ['cidr-calculator','subnet-calculator','ipv4-converter'].filter(x=>x!==slug) : category==='json' ? ['json-formatter','json-validator','json-diff','json-to-yaml','json-to-csv'].filter(x=>x!==slug).slice(0,4) : slug.startsWith('markdown')||slug==='html-to-markdown' ? ['markdown-preview','markdown-to-html','html-to-markdown'].filter(x=>x!==slug) : slug.startsWith('qr-') ? ['qr-code-generator','qr-code-reader'].filter(x=>x!==slug) : [],seo:{title:`${name} — Private Browser Tool`,description:`${description} Runs locally in your browser; input is never uploaded.`}})),
  ...phase7TextSeeds.map(([slug,name,category,icon,description,keywords=[]]) => ({slug,name,category,icon,description,keywords:[name,category,...keywords],aliases:[name],execution:'client' as const,status:'active' as const,new:true,addedAt:'2026-08-21',relatedTools:phase7TextSeeds.map(([related])=>related).filter(related=>related!==slug).slice(0,4),seo:{title:`${name} — Private Text Tool`,description:`${description} Runs locally in your browser.`}})),
  ...plannedTools.filter(p => !phase3Seeds.some(([slug]) => slug === p.slug)),
];

export const activeTools = tools.filter((tool) => tool.status === 'active');
export const getTool = (slug: string) => activeTools.find((tool) => tool.slug === slug);
export const getToolsByCategory = (category: string) => activeTools.filter((tool) => tool.category === category);
export const getRelatedTools = (tool: ToolDefinition) => (tool.relatedTools ?? []).map(getTool).filter((item): item is ToolDefinition => Boolean(item));
