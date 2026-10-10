import type { Metadata } from "next"
import { PageJsonLd } from "@/components/PageJsonLd"
import { MermaidStack } from "@/components/MermaidStack"
import { TechNoteFrame } from "@/components/TechNoteFrame"
import { backgroundJobFailuresDiagrams } from "@/content/background-job-failures-diagrams"
import { breadcrumbList, pageSocialMeta, techArticleJsonLd } from "@/lib/seo"
import { getSiteUrl } from "@/lib/site-config"

const PATH = "/notes/background-job-failures"
const TITLE = "Making background job failures visible and safe to retry"
const DESCRIPTION =
  "Illustrative note: claim a row before calling out, record the stage and last error, and retry without sending twice."

export const metadata: Metadata = pageSocialMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

export default function BackgroundJobFailuresPage() {
  const siteUrl = getSiteUrl()

  return (
    <TechNoteFrame
      badge="pattern"
      title={TITLE}
      lede="Example domain: a worker that sends invoices to an external billing API in bulk."
    >
      <PageJsonLd
        data={[
          techArticleJsonLd({ siteUrl, headline: TITLE, description: DESCRIPTION, path: PATH }),
          breadcrumbList(siteUrl, [
            { name: "Home", path: "/" },
            { name: "Technical notes", path: "/notes" },
            { name: TITLE, path: PATH },
          ]),
        ]}
      />

      <section className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        <h2 className="text-xs font-mono uppercase tracking-wide text-muted-foreground">The problem</h2>
        <p>
          Jobs fail for many reasons (bad config, upstream error, lost race). Ops couldn&apos;t see why something was
          stuck, and retries risked sending twice.
        </p>
      </section>

      <section className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        <h2 className="text-xs font-mono uppercase tracking-wide text-muted-foreground">How it works</h2>
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            <strong className="text-navy">Claim before calling:</strong> a single conditional UPDATE stamps a claim
            marker only if the row is still pending. Two workers race and only one wins; the loser exits quietly
            without retrying.
          </li>
          <li>
            Call the external API. On failure, clear the claim (only if it is still our marker) and return an error
            so the queue retries.
          </li>
          <li>
            On success, store the external reference and clear the error, again only if our marker is still there.
          </li>
          <li>
            On every failure, record the <strong className="text-navy">stage and last error</strong> on the row
            (truncated, overwritten each time). The admin screen shows why a row is stuck at a glance.
          </li>
          <li>
            A stale claim (older than a set window) can be reclaimed; a callback that arrives with the external id
            can <strong className="text-navy">heal</strong> a row whose reference was never saved.
          </li>
          <li>Recording the error is best-effort and never replaces the real failure.</li>
        </ol>
      </section>

      <MermaidStack blocks={backgroundJobFailuresDiagrams} />
    </TechNoteFrame>
  )
}
