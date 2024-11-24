/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  productionBrowserSourceMaps: true,
};

module.exports = nextConfig;
