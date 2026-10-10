import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site-config"

const PATHS = [
  "",
  "/notes",
  "/notes/seller-onboarding-variants",
  "/notes/cart-stock-reservation",
  "/notes/cancel-vs-late-payment",
  "/notes/order-lifecycle-refunds",
  "/notes/multi-level-revenue-splits",
  "/notes/third-party-api-adapters",
  "/notes/background-job-failures",
  "/notes/flexible-financial-settlement",
  "/notes/frontend-architecture-refactoring",
  "/notes/performance-evaluation-360",
  "/notes/fullstack-assessment-debugging",
  "/projects/multi-seller-marketplace",
  "/projects/lokatech",
  "/projects/what-i-applied",
  "/projects/church-system",
  "/projects/task-system",
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl()
  const now = new Date()

  return PATHS.map((path) => {
    const isHome = path === ""
    const isNote = path.startsWith("/notes/")
    return {
      url: `${base}${path || "/"}`,
      lastModified: now,
      changeFrequency: isHome ? ("weekly" as const) : ("monthly" as const),
      priority: isHome ? 1 : isNote ? 0.85 : 0.8,
    }
  })
}
