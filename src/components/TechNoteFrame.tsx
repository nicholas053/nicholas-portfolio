import Link from "next/link"
import type { ReactNode } from "react"

const DISCLAIMER =
  "Based on patterns I've built in production (details under NDA). The example domain below is illustrative."

export function TechNoteFrame({
  title,
  lede,
  badge,
  children,
}: {
  title: string
  lede: string
  badge: "nda" | "pattern"
  children: ReactNode
}) {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <Link href="/notes" className="block text-sm text-muted-foreground hover:text-navy">
        ← Technical notes
      </Link>

      <div className="mt-16 space-y-12 md:mt-20">
        <header className="space-y-4">
          <p className="font-mono text-[11px] uppercase tracking-wide text-muted-foreground">
            {badge === "nda" ? "Confidential / NDA" : "Illustrative"}
          </p>
          {badge === "pattern" ? (
            <p className="text-sm italic leading-relaxed text-muted-foreground">{DISCLAIMER}</p>
          ) : null}
          <h1 className="text-3xl font-semibold tracking-tight text-navy md:text-4xl">{title}</h1>
          <p className="leading-relaxed text-muted-foreground">{lede}</p>
        </header>

        {children}

        <footer className="border-t border-border pt-8">
          <Link href="/#technical-notes" className="text-sm text-[var(--accent-token)] hover:underline">
            ← Technical notes on the home page
          </Link>
        </footer>
      </div>
    </main>
  )
}
