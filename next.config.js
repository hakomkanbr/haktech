/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");
const nextConfig = nextTranslate({
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["localhost", "cdn.getiryemek.com","magento2.magentech.com"],
  },
});

module.exports = nextConfig;
