import { existsSync } from "node:fs"
import path from "node:path"
import { PERSON } from "@/content/content"
import {
  DEFAULT_DESCRIPTION,
  getHeadshotUrl,
  getSiteUrl,
  HEADSHOT_PATH,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/site-config"

function headshotFileExists(): boolean {
  return existsSync(path.join(process.cwd(), "public", HEADSHOT_PATH.replace(/^\//, "")))
}

export function SiteJsonLd() {
  const url = getSiteUrl()
  const headshotUrl = getHeadshotUrl()
  const hasHeadshot = headshotFileExists()

  const person: Record<string, unknown> = {
    "@type": "Person",
    "@id": `${url}/#person`,
    name: SITE_NAME,
    alternateName: [PERSON.preferredName, PERSON.legalName],
    url,
    jobTitle: PERSON.role,
    description: SITE_TAGLINE,
    email: PERSON.email,
    telephone: PERSON.phone,
    homeLocation: {
      "@type": "Place",
      name: PERSON.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kuala Lumpur / Seremban",
        addressCountry: "MY",
      },
    },
    sameAs: [
      `https://github.com/${PERSON.githubUsername}`,
      `https://www.instagram.com/${PERSON.instagramHandle}/`,
    ],
  }

  if (hasHeadshot) {
    person.image = headshotUrl
  }

  const profilePage: Record<string, unknown> = {
    "@type": "ProfilePage",
    "@id": `${url}/#profilepage`,
    url,
    name: `${SITE_NAME} — Portfolio`,
    description: DEFAULT_DESCRIPTION,
    isPartOf: { "@id": `${url}/#website` },
    mainEntity: { "@id": `${url}/#person` },
    about: { "@id": `${url}/#person` },
  }

  if (hasHeadshot) {
    profilePage.primaryImageOfPage = {
      "@type": "ImageObject",
      url: headshotUrl,
      contentUrl: headshotUrl,
    }
  }

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
        author: { "@id": `${url}/#person` },
      },
      person,
      profilePage,
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  )
}
