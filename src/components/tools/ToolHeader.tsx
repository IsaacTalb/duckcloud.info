import type { ToolDefinition } from '@/config/tools';
import { ToolPrivacyBadge } from './ToolPrivacyBadge';

export function ToolHeader({ tool }: { tool: ToolDefinition }) {
  return <header className="my-8 max-w-3xl">
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <span className="flex h-12 min-w-12 items-center justify-center rounded-xl bg-yellow-400/10 px-2 font-mono font-bold text-yellow-300">{tool.icon}</span>
      <ToolPrivacyBadge execution={tool.execution} />
    </div>
    <h1 className="page-title">{tool.name}</h1>
    <p className="page-lead">{tool.description}</p>
  </header>;
}
