import type { Metadata } from "next"
import { LivePage } from "@/components/live/LivePage"
import { PAGES } from "@/content/pages"
import { pageMeta } from "@/lib/page-meta"

const id = "task-system" as const

export const metadata: Metadata = pageMeta(PAGES[id])

export default function Page() {
  return <LivePage id={id} />
}
