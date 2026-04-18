/**
 * Canonical site URL for metadata, sitemap, and JSON-LD.
 * Set `NEXT_PUBLIC_SITE_URL` in production (e.g. https://yourdomain.com).
 * On Vercel, `VERCEL_URL` is used as a fallback when the public URL is unset.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (fromEnv) return fromEnv.replace(/\/$/, "")

  const vercel = process.env.VERCEL_URL?.trim()
  if (vercel) return `https://${vercel.replace(/^https?:\/\//, "").replace(/\/$/, "")}`

  return "http://localhost:3000"
}

export const SITE_NAME = "Nicholas Chong"
export const SITE_TAGLINE =
  "Full-stack developer and product engineer — scalable systems, clear requirements, and end-to-end delivery."

export const DEFAULT_DESCRIPTION =
  "Portfolio of Nicholas Chong: full-stack and product engineering across Next.js, React, TypeScript, Laravel, and PostgreSQL. Case studies, technical notes with architecture diagrams, and enterprise delivery."
