'use client';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { ToolDefinition } from '@/config/tools';
import { searchTools } from '@/lib/tools/search';

export function ToolSearch({
  tools,
  compact = false,
}: {
  tools: ToolDefinition[];
  compact?: boolean;
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const listId = useId();
  const results = useMemo(() => searchTools(tools, query).slice(0, 7), [query, tools]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        input.current?.focus();
        setOpen(true);
      }
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  const go = (slug: string) => {
    setOpen(false);
    setQuery('');
    router.push(`/tools/${slug}`);
  };
  return (
    <div className={`relative ${compact ? 'w-full md:w-72' : 'mx-auto w-full max-w-2xl'}`}>
      <label htmlFor={`${listId}-input`} className="sr-only">
        Search developer tools
      </label>
      <div className="relative">
        <span
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          aria-hidden="true"
        >
          ⌕
        </span>
        <input
          ref={input}
          id={`${listId}-input`}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActive((value) => Math.min(value + 1, results.length - 1));
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActive((value) => Math.max(value - 1, 0));
            }
            if (e.key === 'Enter' && results[active]) go(results[active].slug);
          }}
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={open && results[active] ? `${listId}-${active}` : undefined}
          autoComplete="off"
          placeholder="Search tools..."
          className={`w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-20 text-white outline-none placeholder:text-slate-500 focus:border-yellow-400 ${compact ? 'text-sm' : 'py-4 text-base shadow-2xl'}`}
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-slate-600 bg-slate-800 px-2 py-1 text-xs text-slate-400">
          ⌘ K
        </kbd>
      </div>
      {open && query && (
        <div
          id={listId}
          role="listbox"
          className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-700 bg-slate-900 p-1 shadow-2xl"
        >
          {results.length ? (
            results.map((tool, index) => (
              <button
                id={`${listId}-${index}`}
                role="option"
                aria-selected={active === index}
                key={tool.slug}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => go(tool.slug)}
                onMouseEnter={() => setActive(index)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left ${active === index ? 'bg-slate-800 text-yellow-300' : 'text-slate-200'}`}
              >
                <span className="w-8 font-mono text-yellow-300">{tool.icon}</span>
                <span>
                  <strong className="block text-sm">{tool.name}</strong>
                  <span className="text-xs text-slate-500">{tool.category}</span>
                </span>
              </button>
            ))
          ) : (
            <p className="p-4 text-sm text-slate-400">No tools found. Try another search.</p>
          )}
        </div>
      )}
    </div>
  );
}
