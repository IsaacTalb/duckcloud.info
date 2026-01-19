'use client';

import Link from 'next/link';
import { FiGithub, FiTwitter, FiMail } from 'react-icons/fi';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { label: 'Features', href: '#features' },
      { label: 'Products', href: '/products' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
    ],
    Company: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Docs', href: '/docs' },
      { label: 'Contact', href: '/contact' },
    ],
    Legal: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'License', href: '/license' },
      { label: 'Security', href: '/security' },
    ],
  };

  return (
    <footer className="bg-secondary border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="text-2xl">🦆</div>
              <span className="text-lg font-bold text-gradient">Duck Cloud</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Innovative tools and software for developers and creators.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h3 className="font-bold text-primary mb-4">{section}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-primary transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-4">
            <a
              href="https://twitter.com/duckcloud"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors duration-300"
              aria-label="Twitter"
            >
              <FiTwitter size={20} />
            </a>
            <a
              href="https://github.com/duck-cloud"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors duration-300"
              aria-label="GitHub"
            >
              <FiGithub size={20} />
            </a>
            <a
              href="mailto:contact@duckcloud.info"
              className="text-gray-400 hover:text-primary transition-colors duration-300"
              aria-label="Email"
            >
              <FiMail size={20} />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-center text-gray-500 text-sm">
            © {currentYear} Duck Cloud. All rights reserved. | Made with ❤️ by the Duck Cloud Team
          </p>
        </div>
      </div>
    </footer>
  );
};
