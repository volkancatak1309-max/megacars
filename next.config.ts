import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import { INDEXABLE } from './lib/launch'

const withNextIntl = createNextIntlPlugin({
  requestConfig: './i18n/request.ts',
  // ICU messages are compiled at build time, so the client ships no message parser
  experimental: { messages: { path: './messages', format: 'json', locales: ['de', 'en', 'tr'], precompile: true } },
})

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    // Demo: the whole site stays out of search engines until it goes live (lib/launch.ts).
    return INDEXABLE ? [] : [{ source: '/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }]
  },
}

export default withNextIntl(nextConfig)
