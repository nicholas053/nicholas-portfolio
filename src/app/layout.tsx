import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { SiteJsonLd } from "@/components/SiteJsonLd"
import {
  DEFAULT_DESCRIPTION,
  getSiteUrl,
  SITE_NAME,
  SITE_TAGLINE,
} from "@/lib/site-config"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const siteUrl = getSiteUrl()

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE_NAME} — Full-Stack Developer & Product Engineer`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: `${SITE_NAME} Portfolio`,
  keywords: [
    SITE_NAME,
    "Nic Chong",
    "full-stack developer",
    "product engineer",
    "software engineer",
    "Next.js",
    "React",
    "TypeScript",
    "Laravel",
    "PHP",
    "PostgreSQL",
    "Prisma",
    "Tailwind CSS",
    "Node.js",
    ".NET",
    "enterprise software",
    "web developer portfolio",
    "Malaysia",
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
    title: `${SITE_NAME} — Full-Stack Developer & Product Engineer`,
    description: SITE_TAGLINE,
  },
  twitter: {
    card: "summary",
    title: `${SITE_NAME} — Full-Stack Developer & Product Engineer`,
    description: SITE_TAGLINE,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteJsonLd />
        {children}
      </body>
    </html>
  )
}
