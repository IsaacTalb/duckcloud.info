import type { ReactNode } from 'react';
export function ToolShell({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4 shadow-lg sm:p-6">
      {children}
    </div>
  );
}
