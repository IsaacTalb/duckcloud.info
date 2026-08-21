import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const groups = {
  Tools: [['Developer & data','/tools/json'],['Networking','/tools/network'],['Security','/tools/security'],['Converters','/tools/encoding']],
  Resources: [['All tools','/tools'],['Blog','/blog'],['Guides','/docs']],
  Company: [['Contact','/contact'],['Privacy','/privacy'],['Terms','/terms'],['Security','/security'],['Licence','/licence']],
};
export const Footer = () => <footer className="border-t border-slate-800" style={{background:'var(--surface)'}}>
  <div className="page-container py-12"><div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-5">
    <div className="lg:col-span-2"><Link href="/" className="flex items-center gap-2 font-bold"><span className="text-2xl">🦆</span><span>Duck Cloud</span></Link><p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">Free, fast tools for developers and IT professionals. Browser-first whenever possible, with no account required.</p></div>
    {Object.entries(groups).map(([heading,links])=><div key={heading}><h2 className="text-sm font-semibold">{heading}</h2><ul className="mt-4 space-y-3">{links.map(([label,href])=><li key={href}><Link className="text-sm text-slate-400 hover:text-yellow-300" href={href}>{label}</Link></li>)}</ul></div>)}
  </div><div className="mt-10 flex flex-col gap-4 border-t border-slate-800 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Duck Cloud.</p><ThemeToggle /></div></div>
</footer>;
