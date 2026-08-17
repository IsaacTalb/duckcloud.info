import type { ToolDefinition } from '@/config/tools';
import { ToolGrid } from './ToolGrid';
export function RelatedTools({ tools }: { tools: ToolDefinition[] }) {
  if (!tools.length) return null;
  return (
    <section className="mt-14" aria-labelledby="related-tools">
      <h2 id="related-tools" className="mb-5 text-2xl font-bold text-white">
        Related tools
      </h2>
      <ToolGrid tools={tools} />
    </section>
  );
}
