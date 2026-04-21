import type { Metadata } from "next"
import { PERSON } from "@/content/content"

export const metadata: Metadata = {
  /** Bypass root `title.template` so print headers (if left on) stay short. */
  title: { absolute: "Resume" },
  description: `Resume for ${PERSON.legalName}: ${PERSON.role}.`,
  robots: { index: false, follow: true },
}

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
