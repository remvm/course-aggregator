/** @type {import('next').NextConfig} */

// eslint-disable-next-line no-undef
module.exports = {
  generateBuildId: async () => {
    return 'my-build-id';
  },
  images: {
    domains: ['courses-top.ru']
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack']
    });
    return config;
  },
  publicRuntimeConfig: {
    maxSize: 1024 * 1024,
  }
};
