//const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = require('next-intl/plugin')('./app/i18n.tsx');

/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    output: 'standalone',
    compiler: {
        styledComponents: true,
    },
    reactStrictMode: false,
}

module.exports = withNextIntl(nextConfig);
