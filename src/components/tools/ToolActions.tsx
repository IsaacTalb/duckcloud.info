'use client';
import { useState } from 'react';
export function ToolActions({ value, onClear }: { value: string; onClear: () => void }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1500);
        }}
        disabled={!value}
        className="rounded-lg bg-yellow-400 px-4 py-2 font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {copied ? 'Copied!' : 'Copy result'}
      </button>
      <button
        type="button"
        onClick={onClear}
        className="rounded-lg border border-slate-600 px-4 py-2 font-semibold text-slate-200 hover:border-slate-400"
      >
        Clear
      </button>
    </div>
  );
}
