import type { MetadataRoute } from "next"
import { getSiteUrl } from "@/lib/site-config"

const PATHS = [
  "",
  "/notes",
  "/notes/flexible-financial-settlement",
  "/notes/frontend-architecture-refactoring",
  "/notes/performance-evaluation-360",
  "/notes/fullstack-assessment-debugging",
  "/projects/church-system",
  "/projects/task-system",
  "/projects/ecommerce-system",
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
