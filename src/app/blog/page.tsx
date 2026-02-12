'use client';

import Head from 'next/head'; // Assuming Next.js for SEO head management

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>Duck Cloud Blog</title>
        <meta name="description" content="Discover the latest updates, tutorials, and insights on Duck Cloud, OpenClaw, and tech trends." />
        <meta property="og:title" content="Duck Cloud Blog" />
        <meta property="og:description" content="Discover the latest updates, tutorials, and insights on Duck Cloud, OpenClaw, and tech trends." />
        <meta property="og:url" content="https://duckcloud.info/blog" />
        <meta property="og:type" content="website" />
        {/* Add og:image if you have a default blog image */}
      </Head>
      <main className="pt-20 px-4"> {children} </main>
    </>
  );
}
