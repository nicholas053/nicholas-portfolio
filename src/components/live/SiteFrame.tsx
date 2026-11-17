/* Full document loads keep the trace runtime in step with each page. */
/* eslint-disable @next/next/no-html-link-for-pages */
import type { ReactNode } from "react"
import type { PageKind } from "@/content/pages"
import { LiveRuntime } from "@/components/live/LiveRuntime"

const WORK = [
  ["/projects/multi-seller-marketplace", "Multi-Seller Marketplace Channel"],
  ["/projects/lokatech", "LokaTech — Internal Operations Platform"],
  ["/projects/what-i-applied", "What I Applied"],
  ["/projects/church-system", "Church Management System"],
  ["/projects/task-system", "Task Management System"],
] as const

const NOTES = [
  ["/notes/seller-onboarding-variants", "Seller onboarding and product variants"],
  ["/notes/cart-stock-reservation", "Cart and stock reservation"],
  ["/notes/cancel-vs-late-payment", "Cancel vs a late or duplicate payment confirmation"],
  ["/notes/order-lifecycle-refunds", "Order lifecycle and refunds"],
  ["/notes/multi-level-revenue-splits", "Multi-level revenue splits"],
  ["/notes/third-party-api-adapters", "One interface for many third-party APIs"],
  ["/notes/background-job-failures", "Background job failures"],
  ["/notes/flexible-financial-settlement", "Flexible financial settlement"],
  ["/notes/performance-evaluation-360", "360° performance evaluation"],
  ["/notes/frontend-architecture-refactoring", "Frontend architecture refactoring"],
  ["/notes/fullstack-assessment-debugging", "Full-stack assessment reflection"],
] as const

function Footer({ kind }: { kind: PageKind }) {
  const contact = kind === "home" ? "#contact" : "/#contact"
  const showResume = kind === "home" || kind === "work"
  return (
    <footer>
      <div className="wrap">
        <div className="smap">
          <div>
            <h4>Pages</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/notes">Technical notes</a></li>
              {showResume ? <li><a href="/resume">Resume</a></li> : null}
              <li><a href={contact}>Contact</a></li>
            </ul>
            <h4 style={{ marginTop: 18 }}>Work</h4>
            <ul>
              {WORK.map(([href, label]) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <h4>Technical notes</h4>
            <ul style={{ gridTemplateColumns: "1fr 1fr", display: "grid" }}>
              {NOTES.map(([href, label]) => (
                <li key={href}><a href={href}>{label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row2">
          <span>© Nicholas Chong Shi Loong</span>
          <span>Prototype — Direction A “Live Trace”</span>
        </div>
      </div>
    </footer>
  )
}

export function SiteFrame({ kind, children }: { kind: PageKind; children: ReactNode }) {
  const home = kind === "home"
  const hash = (id: string) => (home ? `#${id}` : `/#${id}`)
  const frameClass = kind === "notes" ? "notes-page" : kind === "resume" ? "resume-page" : undefined
  return (
    <div className={frameClass}>
      <svg aria-hidden="true" height="0" style={{ position: "absolute" }} width="0">
        <defs>
          <marker id="ah" markerHeight="7" markerWidth="7" orient="auto-start-reverse" refX="9" refY="5" viewBox="0 0 10 10">
            <path d="M0 0 L10 5 L0 10z" />
          </marker>
        </defs>
      </svg>
      <nav className="nav">
        <div className="wrap">
          <a className="brand" href="/"><i></i>Nic Chong</a>
          <button aria-controls="navlist" aria-expanded="false" className="menu-btn" type="button">Menu</button>
          <ul id="navlist">
            <li>
              <a
                {...(home ? { "data-spy": "" } : {})}
                {...(kind === "work" ? { "aria-current": "page" as const, className: "on" } : {})}
                href={hash("work")}
              >
                Work
              </a>
            </li>
            <li>
              <a {...(home ? { "data-spy": "" } : {})} href={hash("about")}>About</a>
            </li>
            <li>
              <a {...(home ? { "data-spy": "" } : {})} href={hash("contact")}>Contact</a>
            </li>
          </ul>
          <a className="btn btn-trace" href="/resume" {...(kind === "resume" ? { "aria-current": "page" as const } : {})}>
            Resume
          </a>
        </div>
      </nav>
      {children}
      <Footer kind={kind} />
      <LiveRuntime notes={kind === "notes" || kind === "resume"} />
    </div>
  )
}
