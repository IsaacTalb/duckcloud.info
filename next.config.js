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

  async redirects() {
    if (process.env.MAINTENANCE_MODE === "1") {
      return [
        // Allow the maintenance file itself
        {
          source: "/maintenance.html",
          destination: "/maintenance.html",
          permanent: false,
        },
        // Redirect everything else
        {
          source: "/:path*",
          has: [
            {
              type: "query",
              key: "bypass-maintenance",
              value: "(.*)",
            },
          ],
          destination: "/:path*",
          permanent: false,
        },
        {
          source: "/:path*",
          destination: "/maintenance.html",
          permanent: false,
        },
      ];
    }

    return [];
  },
};

module.exports = nextConfig;
