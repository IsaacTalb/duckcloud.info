'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const groups = [
  {
    label: 'Publishing',
    links: [
      ['', 'Overview'],
      ['articles', 'Articles'],
      ['articles/new', 'New article'],
      ['categories', 'Categories'],
      ['tags', 'Tags'],
      ['analytics', 'Analytics'],
    ],
  },
  {
    label: 'Library',
    links: [
      ['media', 'Media'],
      ['tools', 'Tools'],
    ],
  },
  {
    label: 'System',
    links: [
      ['settings', 'Settings'],
      ['import', 'Import & export'],
    ],
  },
] as const;

export function AdminNav() {
  const pathname = usePathname();
  return (
    <aside className="admin-sidebar">
      <Link href="/admin" className="admin-brand">
        <Image src="/assets/logo/favicon-32x32.png" width={32} height={32} alt="" className="admin-brand-logo" />
        <span>
          <strong>Duck CMS</strong>
          <small>Editorial operations</small>
        </span>
      </Link>
      <details className="admin-menu" open>
        <summary>Workspace navigation</summary>
        <div className="admin-nav-groups">
          {groups.map((group) => (
            <section key={group.label}>
              <p>{group.label}</p>
              <nav aria-label={`${group.label} navigation`}>
                {group.links.map(([href, label]) => {
                  const url = `/admin${href ? `/${href}` : ''}`;
                  const active =
                    href === ''
                      ? pathname === '/admin'
                      : pathname === url ||
                        (href === 'articles' &&
                          pathname.startsWith('/admin/articles/') &&
                          pathname !== '/admin/articles/new');
                  return (
                    <Link key={href} href={url} aria-current={active ? 'page' : undefined}>
                      {label}
                    </Link>
                  );
                })}
              </nav>
            </section>
          ))}
        </div>
      </details>
      <Link href="/" className="admin-view-site">
        View public site <span aria-hidden>↗</span>
      </Link>
    </aside>
  );
}
