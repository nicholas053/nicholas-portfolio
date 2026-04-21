import { renderToBuffer } from "@react-pdf/renderer"
import { createElement } from "react"
import { ResumePdfDocument } from "@/app/resume/ResumePdfDocument"
import { PERSON } from "@/content/content"
import { getSiteUrl } from "@/lib/site-config"

export const runtime = "nodejs"

export async function GET() {
  const siteUrl = getSiteUrl()
  const doc = createElement(ResumePdfDocument, { siteUrl }) as Parameters<typeof renderToBuffer>[0]
  const buffer = await renderToBuffer(doc)

  const safe = PERSON.legalName
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")

  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${safe || "Resume"}.pdf"`,
      "Cache-Control": "private, no-store",
    },
  })
}
