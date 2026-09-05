import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AutoPageViewTracker } from '@/components/analytics/AutoPageViewTracker';
import { activeTools } from '@/config/tools';

const themeScript = `(function(){try{var t=localStorage.getItem('duckcloud-theme')||'light';var d=t==='dark'||(t==='system'&&matchMedia('(prefers-color-scheme:dark)').matches);document.documentElement.dataset.theme=d?'dark':'light';document.documentElement.style.colorScheme=d?'dark':'light'}catch(e){document.documentElement.dataset.theme='light'}})()`;

export const metadata: Metadata = {
  metadataBase: new URL('https://duckcloud.info'),
  title: { default: 'Duck Cloud — Developer, IT & Security Tools', template: '%s | Duck Cloud' },
  description: 'Privacy-first developer, IT, security, and data utilities that run locally in your browser.',
  alternates: { canonical: '/' },
  keywords: ['Duck Cloud', 'developer tools', 'IT tools', 'security tools', 'browser utilities'],
  authors: [{ name: 'Duck Cloud Team' }],
  applicationName: 'Duck Cloud',
  manifest: '/assets/logo/site.webmanifest',
  icons: {
    icon: [
      { url: '/assets/logo/favicon.ico' },
      { url: '/assets/logo/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/assets/logo/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: [{ url: '/assets/logo/apple-touch-icon.png', type: 'image/png', sizes: '180x180' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://duckcloud.info',
    siteName: 'Duck Cloud',
    title: 'Duck Cloud — Practical Technical Tools',
    description: 'Fast, privacy-first tools and practical guides for developers and IT professionals.',
    images: [{ url: '/assets/logo/android-chrome-512x512.png', width: 512, height: 512, alt: 'Duck Cloud logo' }],
  },
  twitter: {
    card: 'summary',
    title: 'Duck Cloud — Practical Technical Tools',
    description: 'Fast, privacy-first tools and practical guides for developers and IT professionals.',
    images: ['/assets/logo/android-chrome-512x512.png'],
    creator: '@duckcloud',
  },
};

export const viewport: Viewport = { themeColor: '#ffffff', colorScheme: 'light dark' };

const toolIdentifiers = activeTools.map(({ slug }) => slug);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3157572406863018"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <AutoPageViewTracker toolIdentifiers={toolIdentifiers} />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
