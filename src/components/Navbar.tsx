'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { ToolSearch } from './tools/ToolSearch';
import { ThemeToggle } from './ThemeToggle';
import { activeTools } from '@/config/tools';

const navItems = [
  { label: 'Tools', href: '/tools' },
  { label: 'Data', href: '/tools/json' },
  { label: 'Networking', href: '/tools/network' },
  { label: 'Security', href: '/tools/security' },
  { label: 'Guides', href: '/docs' },
  { label: 'Blog', href: '/blog' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="site-header">
      <nav aria-label="Primary" className="page-container flex min-h-16 items-center gap-5">
        <Link href="/" className="brand-link" aria-label="Duck Cloud home">
          <Image src="/assets/logo/favicon-32x32.png" alt="" width={32} height={32} priority />
          <span>Duck Cloud</span>
        </Link>
        <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="nav-link">{item.label}</Link>
          ))}
        </div>
        <div className="ml-auto hidden items-center gap-3 md:flex">
          <ToolSearch tools={activeTools} compact />
          <ThemeToggle compact />
        </div>
        <button
          type="button"
          className="mobile-menu-button ml-auto md:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle navigation"
        >
          {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </nav>
      {isOpen && (
        <div id="mobile-nav" className="page-container mobile-nav md:hidden">
          <ToolSearch tools={activeTools} compact />
          <div className="py-2"><ThemeToggle /></div>
          {navItems.map((item) => (
            <Link onClick={() => setIsOpen(false)} key={item.label} href={item.href} className="nav-link block">{item.label}</Link>
          ))}
        </div>
      )}
    </header>
  );
};
