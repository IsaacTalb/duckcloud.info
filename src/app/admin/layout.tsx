import Link from 'next/link';

export const metadata = { robots: { index: false, follow: false } };

const links = [
  ['', 'Overview'],
  ['articles', 'Articles'],
  ['articles/new', 'New article'],
  ['categories', 'Categories'],
  ['tags', 'Tags'],
  ['media', 'Media'],
  ['tools', 'Tools'],
  ['settings', 'Settings'],
  ['import', 'Import & export'],
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="admin-brand-mark">D</span>
          <div>
            <strong>Duck CMS</strong>
            <span>Content workspace</span>
          </div>
        </div>
        <details className="admin-menu" open>
          <summary>Admin navigation</summary>
          <nav aria-label="CMS navigation">
            {links.map(([href, label]) => (
              <Link key={href} href={`/admin/${href}`}>{label}</Link>
            ))}
            <Link href="/" className="admin-view-site">View site <span aria-hidden>↗</span></Link>
          </nav>
        </details>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
