// Go-live switches (KARAR-DEFTERI 23.10.2026): each one is a single line.
// Plain module without path aliases, because next.config.ts imports it too.

/**
 * false until the site goes live: robots.txt disallows everything, every page carries
 * noindex (meta + X-Robots-Tag) and the sitemap is not announced.
 */
export const INDEXABLE = false

/**
 * Pages that wait for the dealer's confirmation. While false the page still opens by
 * its address (noindex) but is missing from the menu, the footer and the sitemap.
 */
export const PAGES = {
  financing: true,
  tradeIn: false,
} as const
