import nextPwa from 'next-pwa';

/** @type {import('next').NextConfig} */
const withPWA = nextPwa({
    dest: 'public',
    register: true,
    skipWaiting: true,
  });

const nextConfig = withPWA({
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
});

export default nextConfig;
