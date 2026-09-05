'use client';

import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';
const themes: Theme[] = ['light', 'dark', 'system'];

function applyTheme(theme: Theme) {
  const dark = theme === 'dark' || (theme === 'system' && matchMedia('(prefers-color-scheme: dark)').matches);
  document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
}

export function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const saved = localStorage.getItem('duckcloud-theme');
    const initial = themes.includes(saved as Theme) ? (saved as Theme) : 'light';
    const timer = window.setTimeout(() => setTheme(initial), 0);
    applyTheme(initial);
    const media = matchMedia('(prefers-color-scheme: dark)');
    const update = () => (localStorage.getItem('duckcloud-theme') ?? 'system') === 'system' && applyTheme('system');
    media.addEventListener('change', update);
    return () => { window.clearTimeout(timer); media.removeEventListener('change', update); };
  }, []);

  const change = (next: Theme) => {
    setTheme(next);
    localStorage.setItem('duckcloud-theme', next);
    applyTheme(next);
  };

  return (
    <label className="theme-control">
      <span className={compact ? 'sr-only' : ''}>Theme</span>
      <select aria-label="Color theme" value={theme} onChange={(event) => change(event.target.value as Theme)}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="system">System</option>
      </select>
    </label>
  );
}
