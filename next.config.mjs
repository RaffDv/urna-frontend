/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/public/**',
      },
      {
        protocol:'https',
        hostname:"urna-apiv3-eelrne6u7a-rj.a.run.app",
        pathname: '/public/**',

      }
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/admin/dashboard',
        permanent: false,
      }
    ]
  }
};


export default nextConfig;
