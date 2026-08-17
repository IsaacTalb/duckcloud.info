export interface ToolCategory { slug: string; name: string; description: string; icon: string }
export const toolCategories: ToolCategory[] = [
  ['json', 'JSON & Data', 'Format, validate, and transform structured data.', '{ }'],
  ['encoding', 'Encoding', 'Encode and decode text safely in your browser.', '01'],
  ['security', 'Security', 'Hash, inspect, and generate security-focused data.', '◇'],
  ['dates', 'Dates & Time', 'Convert timestamps and work across time zones.', '◷'],
  ['web', 'Web Development', 'Inspect and transform web formats and code.', '</>'],
  ['text', 'Text', 'Analyze, compare, and transform text.', 'Aa'],
  ['generators', 'Generators', 'Generate identifiers, test data, and assets.', '✦'],
  ['design', 'Design', 'Work with colors and accessible visual styles.', '◉'],
  ['images', 'Images', 'Convert and optimize browser-based image files.', '▧'],
  ['network', 'Network', 'Inspect domains, addresses, and web clients.', '⌁'],
].map(([slug, name, description, icon]) => ({ slug, name, description, icon }));
export function getToolCategory(slug: string) { return toolCategories.find((category) => category.slug === slug); }
