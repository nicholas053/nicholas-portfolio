import type { Metadata } from "next"
import { PERSON } from "@/content/content"
import { PAGE_SEO } from "@/content/page-seo"
import type { LivePage } from "@/content/pages"
import { pageSocialMeta } from "@/lib/seo"
import { OG_IMAGE, SITE_NAME } from "@/lib/site-config"

/** Home document title: the existing name plus the hero role, unchanged. */
export const HOME_TITLE = `${SITE_NAME} — ${PERSON.role}`

export function pageMeta(page: LivePage): Metadata {
  if (page.kind === "home") {
    return {
      title: { absolute: HOME_TITLE },
      openGraph: { images: [OG_IMAGE] },
      twitter: { card: "summary_large_image", images: [OG_IMAGE] },
    }
  }

  if (page.path === "/resume") {
    return {
      title: { absolute: "Resume" },
      description: `Resume for ${PERSON.legalName}: ${PERSON.role}.`,
      robots: { index: false, follow: true },
      openGraph: { images: [OG_IMAGE] },
      twitter: { card: "summary_large_image", images: [OG_IMAGE] },
    }
  }

  const seo = PAGE_SEO[page.path as keyof typeof PAGE_SEO]
  const type = page.path === "/notes" ? "website" : "article"
  return pageSocialMeta({
    title: seo.title,
    description: seo.description,
    path: page.path,
    type,
  })
}
