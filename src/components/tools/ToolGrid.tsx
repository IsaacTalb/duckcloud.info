import type { ToolDefinition } from '@/config/tools';
import { ToolCard } from './ToolCard';
export function ToolGrid({ tools }: { tools: ToolDefinition[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.slug} tool={tool} />
      ))}
    </div>
  );
}
