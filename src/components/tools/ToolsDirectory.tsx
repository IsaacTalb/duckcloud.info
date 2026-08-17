'use client';
import { useMemo, useState } from 'react';
import type { ToolDefinition } from '@/config/tools';
import type { ToolCategory } from '@/config/tool-categories';
import { searchTools } from '@/lib/tools/search';
import { ToolGrid } from './ToolGrid';

export function ToolsDirectory({ tools, categories }: { tools: ToolDefinition[]; categories: ToolCategory[] }) {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const matches = useMemo(() => searchTools(tools, query).filter((tool) => category === 'all' || tool.category === category), [tools, query, category]);
  return <>
    <label className="sr-only" htmlFor="directory-search">Search all tools</label>
    <input id="directory-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, task, or format…" className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-4 text-white outline-none placeholder:text-slate-500 focus:border-yellow-400" />
    <div className="my-6 flex gap-2 overflow-x-auto pb-2" aria-label="Filter tools by category">
      <button onClick={() => setCategory('all')} className={`filter-chip ${category === 'all' ? 'filter-chip-active' : ''}`}>All</button>
      {categories.map((item) => <button key={item.slug} onClick={() => setCategory(item.slug)} className={`filter-chip ${category === item.slug ? 'filter-chip-active' : ''}`}>{item.name}</button>)}
    </div>
    <p className="mb-5 text-sm text-slate-400" aria-live="polite">{matches.length} {matches.length === 1 ? 'tool' : 'tools'} available</p>
    {matches.length ? <ToolGrid tools={matches} /> : <div className="rounded-xl border border-dashed border-slate-700 p-10 text-center text-slate-400">No available tools match your search.</div>}
  </>;
}
