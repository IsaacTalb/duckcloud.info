'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { ToolSearch } from './tools/ToolSearch';
import { activeTools } from '@/config/tools';
const navItems = [
  { label: 'Tools', href: '/tools' },
  { label: 'Developers', href: '/tools/json' },
  { label: 'Network', href: '/tools' },
  { label: 'Security', href: '/tools/security' },
  { label: 'Converters', href: '/tools/dates' },
  { label: 'Blog', href: '/blog' },
];
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/95 backdrop-blur">
      <div className="page-container flex min-h-16 items-center gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-2 font-bold text-white">
          <span className="text-2xl" aria-hidden="true">
            🦆
          </span>
          <span>
            Duck <span className="text-yellow-300">Cloud</span>
          </span>
        </Link>
        <div className="hidden flex-1 items-center justify-center gap-5 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-yellow-300"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="ml-auto hidden md:block">
          <ToolSearch tools={activeTools} compact />
        </div>
        <button
          type="button"
          className="ml-auto rounded-lg p-2 text-yellow-300 md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      {isOpen && (
        <div
          id="mobile-nav"
          className="page-container space-y-2 border-t border-slate-800 py-4 md:hidden"
        >
          <ToolSearch tools={activeTools} compact />
          {navItems.map((item) => (
            <Link
              onClick={() => setIsOpen(false)}
              key={item.label}
              href={item.href}
              className="block rounded-lg px-3 py-3 text-slate-200 hover:bg-slate-800 hover:text-yellow-300"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
