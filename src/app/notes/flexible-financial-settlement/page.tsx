import { SettlementArchitectureDiagrams } from "./SettlementArchitectureDiagrams"
import { FiArrowLeft } from "react-icons/fi"
import { FaLock } from "react-icons/fa"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Flexible Financial Settlement Engine | Nicholas Chong",
  description:
    "Architecture notes: finance shopping cart model, consolidated payment vouchers, and enterprise CRM commission flow (NDA).",
}

export default function FlexibleFinancialSettlementPage() {
  return (
    <main className="mx-auto max-w-6xl space-y-16 px-4 py-10 md:px-8 md:py-12 lg:space-y-20">
      <div>
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          <FiArrowLeft className="h-4 w-4" aria-hidden />
          <span>Technical notes</span>
        </Link>
      </div>

      <header className="space-y-6 text-center">
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-gray-700 dark:bg-gray-800 dark:text-gray-200">
            <FaLock className="text-gray-500" aria-hidden />
            Confidential / NDA
          </span>
        </div>
        <h1 className="text-3xl font-bold leading-tight text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
          Flexible Financial Settlement Engine for Enterprise CRM
        </h1>
        <p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-300 md:text-lg">
          Lead Developer &amp; Technical BA (acting) — mid-project discovery,
          schema redesign, and a batch-based payout model aligned with real
          commission accounting.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
        <div className="space-y-4 rounded-2xl border border-gray-100 bg-gray-50 p-6 md:p-8 dark:border-gray-700 dark:bg-gray-800/50">
          <div className="mb-2 inline-flex rounded-lg bg-red-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-red-700 dark:bg-red-900/40 dark:text-red-200">
            Challenge
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
            Rigid deal ↔ payout assumptions
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 md:text-base">
            Joined an ongoing enterprise CRM build mid-flight. Discovery
            surfaced a critical architectural mismatch: the system assumed a{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              fixed one-to-one
            </strong>{" "}
            link between deals and payouts. In practice, the client needed{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              partial line items
            </strong>{" "}
            (base, bonus, incentives) across hierarchical partners and
            timelines — consolidated into{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              single payment vouchers
            </strong>{" "}
            per agent.
          </p>
        </div>

        <div className="space-y-4 rounded-2xl border border-sky-100 bg-sky-50 p-6 md:p-8 dark:border-sky-800 dark:bg-sky-900/20">
          <div className="mb-2 inline-flex rounded-lg bg-sky-100 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-sky-800 dark:bg-sky-900/60 dark:text-sky-100">
            Solution
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white md:text-2xl">
            Finance &quot;shopping cart&quot; batching
          </h2>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 md:text-base">
            Designed a model where finance selects specific commission rows from
            multiple deals, locks them into a draft batch, and generates one{" "}
            <strong className="text-gray-800 dark:text-gray-200">
              consolidated payment voucher (PV)
            </strong>{" "}
            per agent. Led alignment across UI/UX and engineering on schema,
            locking rules, and commission lifecycle states.
          </p>
        </div>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-900/40 md:p-10">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-sky-600 dark:text-sky-400">
          Impact
        </h2>
        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-lg">
          Reduced the risk of a disruptive post-launch financial refactor by
          matching how payouts are actually prepared in accounting — granular
          inputs, explicit locks, and clear voucher outputs — before go-live.
        </p>
      </section>

      <section className="space-y-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
            Technical architecture
          </h2>
          <p className="mx-auto mt-2 max-w-3xl text-sm text-gray-600 dark:text-gray-300 md:mx-0 md:text-base">
            Four views of the same design: data shape, end-to-end flow,
            cross-system sequence, and commission record states including the
            finance selection &quot;lock&quot;.
          </p>
        </div>

        <SettlementArchitectureDiagrams />
      </section>

      <footer className="border-t border-gray-200 pt-10 text-center dark:border-gray-700">
        <Link
          href="/"
          className="text-sm font-medium text-sky-600 hover:underline dark:text-sky-400"
        >
          ← Back to portfolio home
        </Link>
      </footer>
    </main>
  )
}
