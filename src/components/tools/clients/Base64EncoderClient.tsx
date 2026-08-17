'use client';
import { useState } from 'react';
import { ToolActions } from '../ToolActions';
import { ToolShell } from '../ToolShell';
import { utf8ToBase64 } from '@/lib/tools/client-utils';
export function Base64EncoderClient() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const encode = () => {
    setOutput(utf8ToBase64(input));
  };
  return (
    <ToolShell>
      <label htmlFor="base64-input" className="mb-2 block font-semibold">
        Text to encode
      </label>
      <textarea
        id="base64-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter plain text"
        className="tool-textarea"
      />
      <button
        onClick={encode}
        type="button"
        className="my-4 rounded-lg bg-yellow-400 px-4 py-2 font-bold text-slate-950"
      >
        Encode Base64
      </button>
      <label htmlFor="base64-output" className="mb-2 block font-semibold">
        Base64 result
      </label>
      <textarea id="base64-output" readOnly value={output} className="tool-textarea min-h-32" />
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
