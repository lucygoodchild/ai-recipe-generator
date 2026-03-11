/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "./dist",
  async redirects() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://localhost:8000/api/v1/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
