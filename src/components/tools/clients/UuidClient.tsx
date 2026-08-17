'use client';
import { useState } from 'react';
import { ToolActions } from '../ToolActions';
import { ToolShell } from '../ToolShell';
export function UuidClient() {
  const [count, setCount] = useState(5);
  const [output, setOutput] = useState('');
  const generate = () =>
    setOutput(Array.from({ length: count }, () => crypto.randomUUID()).join('\n'));
  return (
    <ToolShell>
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label htmlFor="uuid-count" className="mb-2 block font-semibold">
            Number of UUIDs
          </label>
          <input
            id="uuid-count"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, Number(e.target.value))))}
            className="rounded-lg border border-slate-700 bg-slate-950 p-3 text-white"
          />
        </div>
        <button
          type="button"
          onClick={generate}
          className="rounded-lg bg-yellow-400 px-4 py-3 font-bold text-slate-950"
        >
          Generate UUIDs
        </button>
      </div>
      <label htmlFor="uuid-output" className="mb-2 mt-5 block font-semibold">
        Generated UUID v4 values
      </label>
      <textarea id="uuid-output" readOnly value={output} className="tool-textarea min-h-48" />
      <div className="mt-4">
        <ToolActions value={output} onClear={() => setOutput('')} />
      </div>
    </ToolShell>
  );
}
