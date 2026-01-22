import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Duck Cloud - Information & Tools',
  description:
    'Discover innovative tools and software from Duck Cloud. Explore TikTok Commenter, News platform, and more developer-friendly solutions.',
  keywords: ['Duck Cloud', 'tools', 'software', 'TikTok', 'news', 'developer tools'],
  authors: [{ name: 'Duck Cloud Team' }],
  icons: {
    icon: [
      {
        url: '/assets/duckcloud.jpg',
        type: 'image/jpeg',
        sizes: '192x192',
      }
    ]

  },
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
      <head>
        <link rel="icon" type="image/jpeg" href="/assets/duckcloud.jpg" sizes="192x192" />
        <Script src="https://kit.fontawesome.com/9f0d0c9f3e.js" crossOrigin="anonymous" />
        <Script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js" />
        <Script 
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3157572406863018"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-dark text-gray-100">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

