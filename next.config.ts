import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin({
  requestConfig: './i18n/request.ts',
  // ICU messages are compiled at build time, so the client ships no message parser
  experimental: { messages: { path: './messages', format: 'json', locales: ['de', 'tr'], precompile: true } },
})

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Demo: the whole site stays out of search engines until it goes live.
        source: '/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ]
  },
}

export default withNextIntl(nextConfig)
