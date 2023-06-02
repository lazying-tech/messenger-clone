/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    swcPlugins: ["next-superjson-plugin", {}],
  },

  images: {
    domains: [
      "avatars.githubusercontent.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:8000//api/v1/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
