'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

const AD_SCRIPT_ID = 'duckcloud-adsense';

export function AdSenseLoader() {
  const pathname = usePathname();
  const isAdmin = pathname === '/admin' || pathname?.startsWith('/admin/');

  useEffect(() => {
    // Third-party scripts cannot be unloaded by removing their script tag.
    // Start a clean document when client navigation enters the CMS after ads loaded.
    if (isAdmin && document.getElementById(AD_SCRIPT_ID)) {
      window.location.reload();
    }
  }, [isAdmin]);

  if (!pathname || isAdmin) return null;

  return (
    <Script
      id={AD_SCRIPT_ID}
      async
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3157572406863018"
      crossOrigin="anonymous"
    />
  );
}
