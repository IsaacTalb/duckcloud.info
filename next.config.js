/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ['image/webp', 'image/avif'],
  },

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
  redirects: async () => {
    if (process.env.MAINTENANCE_MODE === "1") {
      return [
        {
          source: "/((?!maintenance\\.html).*)", // ANY route except maintenance.html
          destination: "/maintenance.html",
          permanent: false,
        },
      ];
    }

    return [];
  },
};

module.exports = nextConfig;
