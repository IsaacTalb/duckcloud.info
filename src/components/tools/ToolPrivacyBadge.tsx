import type { ToolExecution } from '@/config/tools';
export function ToolPrivacyBadge({ execution = 'client' }: { execution?: ToolExecution }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
      <span aria-hidden="true">●</span> {execution === 'client' ? 'Runs locally in your browser' : 'Remote lookup'}
    </div>
  );
}
