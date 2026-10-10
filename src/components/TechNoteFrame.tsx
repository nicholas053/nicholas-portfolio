import Link from "next/link"
import { FiArrowLeft } from "react-icons/fi"
import { FaLock } from "react-icons/fa"
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
    <main className="mx-auto max-w-6xl space-y-16 px-4 py-10 md:px-8 md:py-12 lg:space-y-20">
      <div>
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-navy dark:text-muted-foreground dark:hover:text-cream"
        >
          <FiArrowLeft className="h-4 w-4" aria-hidden />
          <span>Technical notes</span>
        </Link>
      </div>

      <header className="space-y-6 text-center">
        <div className="flex justify-center">
          {badge === "nda" ? (
            <span className="inline-flex items-center gap-2 rounded-full bg-mist/30 px-3 py-1 text-xs font-bold uppercase tracking-wide text-muted-foreground dark:bg-surface">
              <FaLock className="text-muted-foreground" aria-hidden />
              Confidential / NDA
            </span>
          ) : (
            <span className="inline-flex rounded-full bg-mist/40 px-3 py-1 text-xs font-bold uppercase tracking-wide text-navy dark:bg-surface/50 dark:text-mist">
              Illustrative
            </span>
          )}
        </div>
        {badge === "pattern" ? (
          <p className="mx-auto max-w-3xl text-sm italic leading-relaxed text-muted-foreground md:text-base">
            {DISCLAIMER}
          </p>
        ) : null}
        <h1 className="text-3xl font-bold leading-tight text-navy md:text-4xl lg:text-5xl">{title}</h1>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">{lede}</p>
      </header>

      {children}

      <footer className="border-t border-mist pt-10 text-center dark:border-mist/50">
        <Link href="/" className="text-sm font-medium text-navy hover:underline dark:text-mist">
          ← Back to portfolio home
        </Link>
      </footer>
    </main>
  )
}
