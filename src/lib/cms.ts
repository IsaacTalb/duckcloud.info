export interface CmsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: string;
  status?: string;
  featured?: number;
  category?: string | null;
  category_slug?: string | null;
  author_name?: string | null;
  published_at?: string | null;
  updated_at: string;
  featured_image_url?: string | null;
  og_image_url?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  canonical_url?: string | null;
}

const base = process.env.NEXT_PUBLIC_DUCKCLOUD_API_URL || 'https://api.duckcloud.info';

async function get<T>(path: string, revalidate = 600): Promise<T | null> {
  try {
    const response = await fetch(`${base}${path}`, {
      next: { revalidate, tags: ['cms'] },
    });
    if (!response.ok) return null;
    const json = (await response.json()) as { data: T };
    return json.data;
  } catch {
    return null;
  }
}

export async function getArticles(page = 1) {
  const data = await get<{ results: CmsArticle[] }>(`/v1/articles?page=${page}&limit=12`, 300);
  return data?.results ?? [];
}

export const getArticle = (slug: string) => get<CmsArticle>(`/v1/articles/${encodeURIComponent(slug)}`, 300);

export async function getCategories() {
  const data = await get<{ results: Array<{ id: string; slug: string; name: string; description?: string }> }>('/v1/categories', 1800);
  return data?.results ?? [];
}

type TocItem = { id: string; text: string; level: number };

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (character) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]!,
  );

function renderInline(value: string) {
  const code: string[] = [];
  let rendered = escapeHtml(value).replace(/`([^`\n]+)`/g, (_, content: string) => {
    const token = `\u0000CODE${code.length}\u0000`;
    code.push(`<code>${content}</code>`);
    return token;
  });

  rendered = rendered
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|\/(?!\/)[^\s)]*)\)/g, '<a href="$2" rel="noopener noreferrer">$1</a>')
    .replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_\n]+)__/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>')
    .replace(/(^|[^_])_([^_\n]+)_/g, '$1<em>$2</em>')
    .replace(/  \n/g, '<br>');

  return rendered.replace(/\u0000CODE(\d+)\u0000/g, (_, index: string) => code[Number(index)]);
}

function stripInlineMarkdown(value: string) {
  return value
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_~]/g, '')
    .trim();
}

function isTableDivider(line: string) {
  return /^\s*\|?\s*:?-{3,}:?\s*(?:\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function tableCells(line: string) {
  return line.trim().replace(/^\||\|$/g, '').split('|').map((cell) => cell.trim());
}

export function markdownToHtml(markdown: string): { html: string; toc: TocItem[] } {
  const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
  const ids = new Map<string, number>();
  const toc: TocItem[] = [];
  const output: string[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(/^\s*```([\w+#.-]*)\s*$/);
    if (fence) {
      const body: string[] = [];
      index += 1;
      while (index < lines.length && !/^\s*```\s*$/.test(lines[index])) body.push(lines[index++]);
      if (index < lines.length) index += 1;
      const language = escapeHtml(fence[1] || 'text');
      output.push(`<figure class="code-block"><figcaption>${language}</figcaption><pre tabindex="0"><code class="language-${language}">${escapeHtml(body.join('\n'))}</code></pre></figure>`);
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (heading) {
      const level = heading[1].length;
      const label = stripInlineMarkdown(heading[2]);
      const slug = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
      const count = ids.get(slug) ?? 0;
      const id = count ? `${slug}-${count + 1}` : slug;
      ids.set(slug, count + 1);
      if (level >= 2 && level <= 3) toc.push({ id, text: label, level });
      output.push(`<h${level} id="${id}">${renderInline(heading[2])}</h${level}>`);
      index += 1;
      continue;
    }

    if (/^\s*(?:---+|___+|\*\*\*+)\s*$/.test(line)) {
      output.push('<hr>');
      index += 1;
      continue;
    }

    if (line.includes('|') && index + 1 < lines.length && isTableDivider(lines[index + 1])) {
      const headers = tableCells(line);
      const rows: string[][] = [];
      index += 2;
      while (index < lines.length && lines[index].trim() && lines[index].includes('|')) rows.push(tableCells(lines[index++]));
      output.push(`<div class="table-wrap"><table><thead><tr>${headers.map((cell) => `<th scope="col">${renderInline(cell)}</th>`).join('')}</tr></thead><tbody>${rows.map((row) => `<tr>${headers.map((_, cellIndex) => `<td>${renderInline(row[cellIndex] ?? '')}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }

    if (/^\s*>\s?/.test(line)) {
      const quote: string[] = [];
      while (index < lines.length && /^\s*>\s?/.test(lines[index])) quote.push(lines[index++].replace(/^\s*>\s?/, ''));
      output.push(`<blockquote>${quote.map(renderInline).join('<br>')}</blockquote>`);
      continue;
    }

    const listMatch = line.match(/^\s*(?:([-+*])|(\d+)\.)\s+(.+)$/);
    if (listMatch) {
      const ordered = Boolean(listMatch[2]);
      const tag = ordered ? 'ol' : 'ul';
      const items: string[] = [];
      const pattern = ordered ? /^\s*\d+\.\s+(.+)$/ : /^\s*[-+*]\s+(.+)$/;
      while (index < lines.length) {
        const match = lines[index].match(pattern);
        if (!match) break;
        items.push(`<li>${renderInline(match[1])}</li>`);
        index += 1;
      }
      output.push(`<${tag}>${items.join('')}</${tag}>`);
      continue;
    }

    const paragraph: string[] = [line.trim()];
    index += 1;
    while (index < lines.length && lines[index].trim()) {
      const next = lines[index];
      if (/^(#{1,6})\s+/.test(next) || /^\s*```/.test(next) || /^\s*>\s?/.test(next) || /^\s*(?:[-+*]|\d+\.)\s+/.test(next)) break;
      if (next.includes('|') && index + 1 < lines.length && isTableDivider(lines[index + 1])) break;
      paragraph.push(next.trim());
      index += 1;
    }
    output.push(`<p>${renderInline(paragraph.join('\n'))}</p>`);
  }

  return { html: output.join('\n'), toc };
}
