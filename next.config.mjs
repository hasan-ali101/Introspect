/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/write",
        permanent: true,
      },
    ];
  },

  reactStrictMode: true,
  images: {
    domains: ["utfs.io"],
  },
};

export default nextConfig;
