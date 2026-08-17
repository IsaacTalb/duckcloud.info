'use client';
import { useState } from 'react';
import { ToolActions } from '../ToolActions';
import { ToolShell } from '../ToolShell';
export function Sha256Client() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const hash = async () => {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
    setOutput(
      Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('')
    );
  };
  return (
    <ToolShell>
      <label htmlFor="hash-input" className="mb-2 block font-semibold">
        Text to hash
      </label>
      <textarea
        id="hash-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text"
        className="tool-textarea min-h-36"
      />
      <button
        type="button"
        onClick={hash}
        className="my-4 rounded-lg bg-yellow-400 px-4 py-2 font-bold text-slate-950"
      >
        Generate SHA-256
      </button>
      <label htmlFor="hash-output" className="mb-2 block font-semibold">
        SHA-256 digest
      </label>
      <input
        id="hash-output"
        readOnly
        value={output}
        className="w-full rounded-lg border border-slate-700 bg-slate-950 p-3 font-mono text-sm text-emerald-300"
      />
      <div className="mt-4">
        <ToolActions
          value={output}
          onClear={() => {
            setInput('');
            setOutput('');
          }}
        />
      </div>
    </ToolShell>
  );
}
