import type { Metadata } from "next"
import { SITE_NAME } from "@/lib/site-config"

type OgType = "website" | "article"

export function pageSocialMeta({
  title,
  description,
  path,
  type = "article",
}: {
  title: string
  description: string
  path: string
  type?: OgType
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      type,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  }
}

export function personId(siteUrl: string) {
  return `${siteUrl}/#person`
}

export function breadcrumbList(
  siteUrl: string,
  items: { name: string; path: string }[],
) {
  return {
    "@type": "BreadcrumbList" as const,
    "@id": `${siteUrl}${items[items.length - 1]?.path ?? ""}/#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? siteUrl : `${siteUrl}${item.path}`,
    })),
  }
}

export function creativeWorkJsonLd({
  siteUrl,
  name,
  description,
  path,
}: {
  siteUrl: string
  name: string
  description: string
  path: string
}) {
  const url = `${siteUrl}${path}`
  return {
    "@type": "CreativeWork" as const,
    "@id": `${url}/#creativework`,
    name,
    description,
    url,
    author: { "@id": personId(siteUrl) },
    creator: { "@id": personId(siteUrl) },
    inLanguage: "en",
  }
}

export function techArticleJsonLd({
  siteUrl,
  headline,
  description,
  path,
}: {
  siteUrl: string
  headline: string
  description: string
  path: string
}) {
  const url = `${siteUrl}${path}`
  return {
    "@type": "TechArticle" as const,
    "@id": `${url}/#article`,
    headline,
    description,
    url,
    author: { "@id": personId(siteUrl) },
    creator: { "@id": personId(siteUrl) },
    inLanguage: "en",
    isAccessibleForFree: true,
  }
}
