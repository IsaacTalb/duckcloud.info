'use client';
import { useState } from 'react';
import { ToolShell } from '../ToolShell';
const initial = () => Math.floor(Date.now() / 1000).toString();
export function TimestampClient() {
  const [timestamp, setTimestamp] = useState(initial);
  const numeric = Number(timestamp);
  const milliseconds = timestamp.length > 10 ? numeric : numeric * 1000;
  const date = Number.isFinite(milliseconds) ? new Date(milliseconds) : null;
  const valid = date && !Number.isNaN(date.getTime());
  return (
    <ToolShell>
      <label htmlFor="timestamp" className="mb-2 block font-semibold">
        Unix timestamp (seconds or milliseconds)
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id="timestamp"
          inputMode="numeric"
          value={timestamp}
          onChange={(e) => setTimestamp(e.target.value.trim())}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 font-mono text-white"
        />
        <button
          type="button"
          onClick={() => setTimestamp(initial())}
          className="whitespace-nowrap rounded-lg bg-yellow-400 px-4 py-2 font-bold text-slate-950"
        >
          Use current time
        </button>
      </div>
      <div aria-live="polite" className="mt-5 grid gap-3 sm:grid-cols-2">
        {valid ? (
          <>
            <div className="rounded-lg bg-slate-950 p-4">
              <span className="text-sm text-slate-400">UTC</span>
              <strong className="mt-1 block font-mono text-sm text-emerald-300">
                {date.toUTCString()}
              </strong>
            </div>
            <div className="rounded-lg bg-slate-950 p-4">
              <span className="text-sm text-slate-400">Your local time</span>
              <strong className="mt-1 block font-mono text-sm text-emerald-300">
                {date.toLocaleString()}
              </strong>
            </div>
          </>
        ) : (
          <p className="text-red-300">Enter a valid Unix timestamp.</p>
        )}
      </div>
    </ToolShell>
  );
}
