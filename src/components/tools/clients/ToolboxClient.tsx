'use client';
import { useMemo, useState } from 'react';
import { md5 } from '@/lib/tools/md5';
import { base64ToUtf8, digest, hexByte, parseJson } from '@/lib/tools/client-utils';
import { ToolActions } from '../ToolActions';
import { ToolShell } from '../ToolShell';

type Props = { tool: string };
const labels: Record<string, string> = {
  'json-validator': 'Validate JSON', 'json-minifier': 'Minify JSON', 'json-viewer': 'View JSON',
  'base64-decoder': 'Decode Base64', 'url-encoder': 'Encode URL component', 'url-decoder': 'Decode URL component',
  'sha512-generator': 'Generate SHA-512', 'md5-generator': 'Generate MD5', 'jwt-decoder': 'Decode JWT',
  'jwt-expiry-checker': 'Check expiry', 'hex-to-rgb': 'Convert to RGB', 'rgb-to-hex': 'Convert to HEX',
};
const samples: Record<string, string> = {
  'json-validator': '{"name":"Duck Cloud","active":true}', 'json-minifier': '{\n  "hello": "world"\n}',
  'json-viewer': '{"user":{"name":"Ada","roles":["admin","editor"]}}', 'base64-decoder': 'RHVjayBDbG91ZA==',
  'url-encoder': 'Duck Cloud? fast & private', 'url-decoder': 'Duck%20Cloud%3F%20fast%20%26%20private',
  'jwt-decoder': 'eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJzdWIiOiIxMjMiLCJuYW1lIjoiRHVjayBDbG91ZCJ9.',
  'jwt-expiry-checker': 'eyJhbGciOiJub25lIn0.eyJleHAiOjQxMDQ3NjQ4MDB9.', 'hex-to-rgb': '#FACC15', 'rgb-to-hex': '250, 204, 21',
};
function decodeJwt(value: string) {
  const parts = value.trim().split('.');
  if (parts.length !== 3) throw new Error('A JWT must contain three dot-separated sections.');
  return { header: parseJson(base64ToUtf8(parts[0])), payload: parseJson(base64ToUtf8(parts[1])) };
}
function JsonTree({ value }: { value: unknown }) {
  if (value && typeof value === 'object') return <ul className="ml-4 border-l border-slate-700 pl-3">{Object.entries(value).map(([key, child]) => <li key={key} className="my-1"><span className="text-yellow-300">{key}</span>: <JsonTree value={child} /></li>)}</ul>;
  return <span className="text-emerald-300">{JSON.stringify(value)}</span>;
}
export function ToolboxClient({ tool }: Props) {
  const [input, setInput] = useState(samples[tool] ?? '');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [tree, setTree] = useState<unknown>();
  const run = async () => {
    setError(''); setTree(undefined);
    try {
      let result = '';
      if (tool === 'json-validator') { parseJson(input); result = '✓ Valid JSON'; }
      else if (tool === 'json-minifier') result = JSON.stringify(parseJson(input));
      else if (tool === 'json-viewer') { const parsed = parseJson(input); setTree(parsed); result = JSON.stringify(parsed, null, 2); }
      else if (tool === 'base64-decoder') result = base64ToUtf8(input);
      else if (tool === 'url-encoder') result = encodeURIComponent(input);
      else if (tool === 'url-decoder') result = decodeURIComponent(input);
      else if (tool === 'sha512-generator') result = await digest(input, 'SHA-512');
      else if (tool === 'md5-generator') result = md5(input).toString();
      else if (tool === 'jwt-decoder') result = JSON.stringify(decodeJwt(input), null, 2);
      else if (tool === 'jwt-expiry-checker') { const { payload } = decodeJwt(input) as {payload: {exp?: unknown}}; if (typeof payload.exp !== 'number') throw new Error('JWT payload has no numeric exp claim.'); const date = new Date(payload.exp * 1000); result = `${date <= new Date() ? 'Expired' : 'Valid'} — expires ${date.toLocaleString()} (${date.toISOString()})`; }
      else if (tool === 'hex-to-rgb') { const match = input.trim().match(/^#?([\da-f]{3}|[\da-f]{6})$/i); if (!match) throw new Error('Enter a 3 or 6 digit HEX color, such as #FACC15.'); let h=match[1]; if(h.length===3) h=[...h].map(x=>x+x).join(''); result = `${parseInt(h.slice(0,2),16)}, ${parseInt(h.slice(2,4),16)}, ${parseInt(h.slice(4),16)}`; }
      else if (tool === 'rgb-to-hex') { const values=input.match(/\d+(?:\.\d+)?/g)?.map(Number); if(!values || values.length!==3 || values.some(v=>v<0||v>255)) throw new Error('Enter three RGB values from 0 to 255, such as 250, 204, 21.'); result='#'+values.map(v=>hexByte(Math.round(v))).join(''); }
      setOutput(result);
    } catch (cause) { setOutput(''); setError(cause instanceof Error ? cause.message : 'The input could not be processed.'); }
  };
  return <ToolShell>
    <label htmlFor="tool-input" className="mb-2 block font-semibold">Input</label>
    <textarea id="tool-input" spellCheck={false} value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault(); void run();}}} className="tool-textarea min-h-40" placeholder="Paste or type input here" />
    <p className="mt-2 text-xs text-slate-400">Tip: press Ctrl/⌘ + Enter to run.</p>
    <button type="button" onClick={()=>void run()} className="primary-button my-4">{labels[tool]}</button>
    {error && <p role="alert" className="mb-4 rounded-lg bg-red-500/10 p-3 text-red-300">{error}</p>}
    {tool==='json-viewer' && tree !== undefined ? <div className="mb-4 max-h-96 overflow-auto rounded-lg bg-slate-950 p-4 font-mono text-sm"><JsonTree value={tree}/></div> : <textarea aria-label="Result" readOnly value={output} className="tool-textarea min-h-32" placeholder="Result appears here"/>}
    <div className="mt-4"><ToolActions value={output} onClear={()=>{setInput('');setOutput('');setError('');setTree(undefined);}} /></div>
  </ToolShell>;
}

export function WordCounterClient() { const [value,setValue]=useState(''); const stats=useMemo(()=>({characters:value.length, charactersNoSpaces:value.replace(/\s/g,'').length, words:value.trim()?value.trim().split(/\s+/u).length:0, lines:value?value.split(/\r?\n/).length:0}),[value]); return <ToolShell><label htmlFor="counter" className="mb-2 block font-semibold">Text</label><textarea id="counter" value={value} onChange={e=>setValue(e.target.value)} className="tool-textarea min-h-56" placeholder="Paste or type text here"/><div className="my-4 grid grid-cols-2 gap-3 sm:grid-cols-4">{Object.entries(stats).map(([k,v])=><div className="rounded-lg bg-slate-950 p-3" key={k}><strong className="block text-2xl text-yellow-300">{v}</strong><span className="text-xs text-slate-400">{k.replace(/([A-Z])/g,' $1')}</span></div>)}</div><ToolActions value={value} onClear={()=>setValue('')}/></ToolShell> }
