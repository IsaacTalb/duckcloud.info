/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
  },

  // Security Headers
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },

  // Maintenance Mode Redirect
  async redirects() {
    return [
      process.env.MAINTENANCE_MODE === '1'
        ? {
            // Keep crawler discovery files and the maintenance asset reachable.
            source: '/((?!maintenance\\.html|maintainence\\.html|ads\\.txt|robots\\.txt|sitemap\\.xml).*)',
            destination: '/maintenance.html',
            permanent: false,
          }
        : null,
    ].filter(Boolean);
  },
};

module.exports = nextConfig;
