import type { ToolDefinition } from '@/config/tools';

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, '');

function editDistance(a: string, b: string) {
  const row = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j += 1) {
      const saved = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = saved;
    }
  }
  return row[b.length];
}

export function searchTools(registry: ToolDefinition[], query: string) {
  const needle = normalize(query.trim());
  if (!needle) return registry;
  return registry
    .map((tool) => {
      const values = [tool.name, tool.shortName ?? '', tool.category, ...tool.keywords].map(
        normalize
      );
      const exact = values.some((value) => value.includes(needle));
      const fuzzy = Math.min(
        ...values.map((value) => editDistance(needle, value.slice(0, needle.length)))
      );
      return { tool, score: exact ? 0 : fuzzy };
    })
    .filter(({ score }) => score <= Math.max(1, Math.floor(needle.length / 4)))
    .sort((a, b) => a.score - b.score)
    .map(({ tool }) => tool);
}
