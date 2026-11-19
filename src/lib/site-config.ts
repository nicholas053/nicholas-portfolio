/**
 * Canonical site URL for metadata, sitemap, and JSON-LD.
 *
 * Resolution order: `NEXT_PUBLIC_SITE_URL` → `VERCEL_URL` → localhost.
 *
 * - Bare `*.vercel.app` deploy: usually no env needed (Vercel sets `VERCEL_URL`).
 * - Custom domain: set `NEXT_PUBLIC_SITE_URL=https://your-domain.com` in Vercel
 *   so sitemap, canonicals, and OG absolute URLs use the custom host.
 */
import { SITE_SEO } from "@/content/content"

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, "")

  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "").replace(/\/$/, "")}`

  return "http://localhost:3000"
}

/** Social cards always advertise the production host, including on preview deploys. */
export const CANONICAL_ORIGIN = "https://nicholas-chong.com"

export const OG_IMAGE = {
  url: `${CANONICAL_ORIGIN}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "Nicholas Chong — Full-Stack Developer & Product Engineer",
} as const

export const SITE_NAME = "Nicholas Chong"
export const SITE_TAGLINE = SITE_SEO.tagline

export const DEFAULT_DESCRIPTION = SITE_SEO.description

/** Public path for the About / Person schema headshot (never used on the OG card). */
export const HEADSHOT_PATH = "/nicholas-chong.png"

export function getHeadshotUrl(): string {
  return `${getSiteUrl()}${HEADSHOT_PATH}`
}
