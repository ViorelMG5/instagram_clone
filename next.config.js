/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com", "graph.facebook.com"],
  },
};

module.exports = nextConfig;
