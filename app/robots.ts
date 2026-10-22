import type { MetadataRoute } from 'next'
import { INDEXABLE } from '@/lib/launch'
import { siteOrigin } from '@/lib/site'

// Demo: nothing is crawled until the site goes live; one switch in lib/launch.ts opens it.
export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) return { rules: [{ userAgent: '*', disallow: '/' }] }
  return { rules: [{ userAgent: '*', allow: '/' }], sitemap: `${siteOrigin()}/sitemap.xml` }
}
