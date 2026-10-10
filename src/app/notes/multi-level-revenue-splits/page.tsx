import type { Metadata } from "next"
import { PageJsonLd } from "@/components/PageJsonLd"
import { MermaidStack } from "@/components/MermaidStack"
import { TechNoteFrame } from "@/components/TechNoteFrame"
import { multiLevelRevenueSplitsDiagrams } from "@/content/multi-level-revenue-splits-diagrams"
import { breadcrumbList, pageSocialMeta, techArticleJsonLd } from "@/lib/seo"
import { getSiteUrl } from "@/lib/site-config"

const PATH = "/notes/multi-level-revenue-splits"
const TITLE = "Multi-level revenue splits with a dry-run preview"
const DESCRIPTION =
  "Illustrative note: percent-plus-fixed fees walked down a partner chain, with the same function used for a read-only preview and for settle."

export const metadata: Metadata = pageSocialMeta({
  title: TITLE,
  description: DESCRIPTION,
  path: PATH,
})

export default function MultiLevelRevenueSplitsPage() {
  const siteUrl = getSiteUrl()

  return (
    <TechNoteFrame
      badge="pattern"
      title={TITLE}
      lede="Example domain: a brand sells through distributors, dealers and retailers. Each level keeps the difference between its rate and the rate of the level below it."
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

      <section className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        <h2 className="text-xs font-bold uppercase tracking-widest text-navy dark:text-mist">The problem</h2>
        <p>
          Fee rules changed from one flat rate to <em>percent + fixed</em>, split down a chain of levels. Ops needed
          to change rates safely, without surprises in real payouts.
        </p>
      </section>

      <section className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        <h2 className="text-xs font-bold uppercase tracking-widest text-navy dark:text-mist">How it works</h2>
        <ol className="list-decimal space-y-3 pl-5">
          <li>
            Walk the chain from the top rate downward. Each level&apos;s own rate is clamped between 0 and the level
            above; the level earns the difference.
          </li>
          <li>A missing or inactive level earns nothing and does not shift its gap to others.</li>
          <li>
            Percent and fixed parts are split the same way; money is computed cumulatively and rounded once per
            level, so rounding never overpays.
          </li>
          <li>Whatever is left belongs to the platform; negative leftovers are clamped to zero.</li>
          <li>
            <strong className="text-navy">Preview</strong> runs the same split function with draft rates and returns
            every level&apos;s share without writing anything.
          </li>
          <li>
            <strong className="text-navy">Settle</strong> only runs if the transaction is still in a settle-able
            state (a guarded update), then inserts split rows backed by a unique constraint, so a duplicate settle is
            rejected.
          </li>
        </ol>
      </section>

      <section className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
        <h2 className="text-xs font-bold uppercase tracking-widest text-navy dark:text-mist">Migration approach</h2>
        <p>
          Added percent and fixed columns beside the legacy rate columns, backfilled old rows into one part,
          dual-wrote both during transition, and never recalculated already-settled records.
        </p>
      </section>

      <MermaidStack blocks={multiLevelRevenueSplitsDiagrams} />
    </TechNoteFrame>
  )
}
