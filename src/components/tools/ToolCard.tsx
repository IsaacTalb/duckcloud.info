import Link from 'next/link';
import type { ToolDefinition } from '@/config/tools';

export function ToolCard({ tool }: { tool: ToolDefinition }) {
  if (tool.status !== 'active') return null;
  // A badge requires dated registry metadata; legacy editorial flags cannot leave “New” on forever.
  const recentlyAdded = Boolean(tool.new && tool.addedAt);
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex h-full flex-col rounded-xl border border-slate-700 bg-slate-900 p-5 transition hover:-translate-y-0.5 hover:border-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-yellow-400"
    >
      <div className="mb-5 flex items-start justify-between">
        <span className="flex h-11 min-w-11 items-center justify-center rounded-lg bg-yellow-400/10 px-2 font-mono font-bold text-yellow-300">
          {tool.icon}
        </span>
        <div className="flex gap-2">
          {recentlyAdded && (
            <span className="rounded-full bg-yellow-400 px-2 py-0.5 text-xs font-bold text-slate-950">
              New
            </span>
          )}
          {tool.execution === 'client' && (
            <span className="rounded-full border border-slate-700 px-2 py-0.5 text-xs text-slate-400">
              Local
            </span>
          )}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white group-hover:text-yellow-300">{tool.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-6 text-slate-400">{tool.description}</p>
      <span className="mt-4 text-sm font-semibold text-yellow-300">
        Open tool <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
