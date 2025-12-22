import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Duck Cloud - Products & Tools',
  description:
    'Discover innovative tools and software from Duck Cloud. Explore TikTok Commenter, News platform, and more developer-friendly solutions.',
  keywords: ['Duck Cloud', 'tools', 'software', 'TikTok', 'news', 'developer tools'],
  authors: [{ name: 'Duck Cloud Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://duckcloud.info',
    siteName: 'Duck Cloud',
    title: 'Duck Cloud - Products & Tools',
    description: 'Discover innovative tools and software from Duck Cloud',
    images: [
      {
        url: 'assets/duckcloud.jpg',
        width: 1200,
        height: 630,
        alt: 'Duck Cloud',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Duck Cloud - Products & Tools',
    description: 'Discover innovative tools and software from Duck Cloud',
    creator: '@duckcloud',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-dark text-gray-100">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
