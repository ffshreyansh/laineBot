/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["telegraf"],
  images: {
    domains: ["cdn.sanity.io", "source.unsplash.com"],
  },
};

export default nextConfig;
