import {
  DEFAULT_DESCRIPTION,
  getSiteUrl,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/site-config"

const GITHUB = "https://github.com/nicholas053"

export function SiteJsonLd() {
  const url = getSiteUrl()

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: `${SITE_NAME} — Portfolio`,
        description: DEFAULT_DESCRIPTION,
        inLanguage: "en",
        publisher: { "@id": `${url}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${url}/#person`,
        name: SITE_NAME,
        url,
        jobTitle: "Full-Stack Developer & Product Engineer",
        description: SITE_TAGLINE,
        sameAs: [GITHUB],
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
