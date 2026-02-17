/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "api.oyez.org", pathname: "/**" },
      { protocol: "https", hostname: "*.oyez.org", pathname: "/**" },
      { protocol: "https", hostname: "www.oyez.org", pathname: "/**" },
    ],
  },
};

module.exports = nextConfig;
