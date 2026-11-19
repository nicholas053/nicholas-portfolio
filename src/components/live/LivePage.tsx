import { PageJsonLd } from "@/components/PageJsonLd"
import { HomeHero } from "@/components/live/HomeHero"
import { SiteFrame } from "@/components/live/SiteFrame"
import { PAGE_SEO } from "@/content/page-seo"
import { PAGES, type PageId } from "@/content/pages"
import { breadcrumbList, creativeWorkJsonLd, techArticleJsonLd } from "@/lib/seo"
import { getSiteUrl } from "@/lib/site-config"

export function LivePage({ id }: { id: PageId }) {
  const page = PAGES[id]
  const siteUrl = getSiteUrl()
  const seo = PAGE_SEO[page.path as keyof typeof PAGE_SEO]
  const headline = seo?.title ?? page.title
  const description = seo?.description ?? page.description
  const nodes: Record<string, unknown>[] = []

  if (page.kind === "work") {
    nodes.push(
      creativeWorkJsonLd({
        siteUrl,
        name: headline,
        description,
        path: page.path,
      }),
      breadcrumbList(siteUrl, [
        { name: "Home", path: "/" },
        { name: "Selected work", path: "/#work" },
        { name: headline, path: page.path },
      ]),
    )
  } else if (page.kind === "notes" && page.path !== "/notes") {
    nodes.push(
      techArticleJsonLd({
        siteUrl,
        headline,
        description,
        path: page.path,
      }),
      breadcrumbList(siteUrl, [
        { name: "Home", path: "/" },
        { name: "Technical notes", path: "/notes" },
        { name: headline, path: page.path },
      ]),
    )
  } else if (page.path === "/notes") {
    nodes.push(
      breadcrumbList(siteUrl, [
        { name: "Home", path: "/" },
        { name: "Technical notes", path: "/notes" },
      ]),
    )
  } else if (page.path === "/resume") {
    nodes.push(
      breadcrumbList(siteUrl, [
        { name: "Home", path: "/" },
        { name: "Resume", path: "/resume" },
      ]),
    )
  }

  const home = page.kind === "home"
  const html = home ? stripHomeHero(page.html) : page.html

  return (
    <SiteFrame kind={page.kind}>
      {nodes.length > 0 ? <PageJsonLd data={nodes} /> : null}
      {home ? <HomeHero /> : null}
      <main id="main" dangerouslySetInnerHTML={{ __html: html }} />
    </SiteFrame>
  )
}

/** Drop the old hero, including its live-trace card. The markup stays in `pages.ts`. */
function stripHomeHero(html: string) {
  const marker = '<div aria-label="Tech stack"'
  const start = html.indexOf(marker)
  return start === -1 ? html : html.slice(start)
}
