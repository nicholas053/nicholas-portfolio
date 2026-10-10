import type { Metadata } from "next"
import { PageJsonLd } from "@/components/PageJsonLd"
import { MermaidStack } from "@/components/MermaidStack"
import { TechNoteFrame } from "@/components/TechNoteFrame"
import { thirdPartyApiAdaptersDiagrams } from "@/content/third-party-api-adapters-diagrams"
import { breadcrumbList, pageSocialMeta, techArticleJsonLd } from "@/lib/seo"
import { getSiteUrl } from "@/lib/site-config"

const PATH = "/notes/third-party-api-adapters"
const TITLE = "One interface for many third-party APIs"
const DESCRIPTION =
  "Illustrative note: one internal interface and a registry of adapters for providers that differ in auth, payloads, and status names."

export const metadata: Metadata = pageSocialMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

export default function ThirdPartyApiAdaptersPage() {
  const siteUrl = getSiteUrl()

  return (
    <TechNoteFrame
      badge="pattern"
      title={TITLE}
      lede="Example domain: a shipping platform integrating several courier APIs, each with different auth, payload formats and status names."
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
          Every provider signs requests differently, names statuses differently, and some report an intermediate
          processing state before the final result.
        </p>
      </section>

      <section className="space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        <h2 className="text-xs font-mono uppercase tracking-wide text-muted-foreground">How it works</h2>
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            A single internal interface (create, query, parse callback) and a registry. Adding a provider means one
            adapter plus one registration.
          </li>
          <li>
            On boot, each active account is loaded with its credentials; a broken account is skipped and reported
            instead of crashing the service, and credentials are never logged.
          </li>
          <li>
            Each adapter verifies the callback signature and maps provider statuses to internal ones, including an
            explicit <strong className="text-navy">pending</strong> flag.
          </li>
          <li>Pending events are acknowledged but do not change state; only final events do.</li>
          <li>
            Every outbound call is written to an audit log on a best-effort basis, so logging failures never change
            the business result.
          </li>
          <li>Test tenants short-circuit to mock responses and never call the real API.</li>
        </ol>
      </section>

      <MermaidStack blocks={thirdPartyApiAdaptersDiagrams} />
    </TechNoteFrame>
  )
}
