'use client';
import { useState } from 'react';
import { ToolActions } from '../ToolActions';
import { ToolShell } from '../ToolShell';
export function JsonFormatterClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const format = () => {
    try {
      setOutput(JSON.stringify(JSON.parse(input), null, 2));
      setError('');
    } catch (cause) {
      setOutput('');
      setError(cause instanceof Error ? cause.message : 'Invalid JSON');
    }
  };
  return (
    <ToolShell>
      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label htmlFor="json-input" className="mb-2 block font-semibold">
            JSON input
          </label>
          <textarea
            id="json-input"
            spellCheck={false}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={'{"hello":"world"}'}
            className="tool-textarea"
          />
        </div>
        <div>
          <label htmlFor="json-output" className="mb-2 block font-semibold">
            Formatted JSON
          </label>
          <textarea
            id="json-output"
            readOnly
            value={output}
            placeholder="Your formatted JSON appears here"
            className="tool-textarea"
          />
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-3 rounded-lg bg-red-500/10 p-3 text-sm text-red-300">
          Invalid JSON: {error}
        </p>
      )}
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={format}
          className="rounded-lg bg-yellow-400 px-4 py-2 font-bold text-slate-950"
        >
          Format JSON
        </button>
        <ToolActions
          value={output}
          onClear={() => {
            setInput('');
            setOutput('');
            setError('');
          }}
        />
      </div>
    </ToolShell>
  );
}
