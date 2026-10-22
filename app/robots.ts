import type { MetadataRoute } from 'next'

// Demo: nothing is crawled until the site goes live (DESIGN.md §12).
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', disallow: '/' }] }
}
