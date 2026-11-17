import type { Metadata, Viewport } from "next"
import { Archivo, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google"
import { SiteJsonLd } from "@/components/SiteJsonLd"
import { PERSON } from "@/content/content"
import {
  DEFAULT_DESCRIPTION,
  getSiteUrl,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/site-config"
import "./globals.css"

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  axes: ["wdth"],
  variable: "--font-archivo",
})

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
})

const siteUrl = getSiteUrl()
const title = `${SITE_NAME} — ${PERSON.role}`

export const viewport: Viewport = {
  themeColor: "#0D1014",
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: `${SITE_NAME} Portfolio`,
  keywords: [
    SITE_NAME,
    "Nic Chong",
    "Nicholas Chong Shi Loong",
    "full-stack developer",
    "backend developer",
    "product engineer",
    "software engineer",
    "system design",
    "Next.js",
    "React",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Laravel",
    "PHP",
    "Angular",
    "Go",
    "PostgreSQL",
    "MySQL",
    "SQL",
    "Prisma",
    "Tailwind CSS",
    "REST API",
    "enterprise software",
    "web developer portfolio",
    "Malaysia",
    "Seremban",
    "KL",
    "Kuala Lumpur",
    "Sabah",
  ],
  authors: [{ name: SITE_NAME, url: siteUrl }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: "/",
    languages: { "en-US": "/" },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon-anim.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: SITE_NAME,
    title,
    description: SITE_TAGLINE,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: SITE_TAGLINE,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      data-accent="lime"
      className={`${archivo.variable} ${plexSans.variable} ${plexMono.variable}`}
    >
      <body>
        <SiteJsonLd />
        {children}
      </body>
    </html>
  )
}
