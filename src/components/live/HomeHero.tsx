import { HERO, HOME_CTA } from "@/content/content"

/**
 * Existing homepage rotator, written as the three full lines H7 cycles.
 * The live slot was "I " plus "understand the rule." / "make it legible." / "ship and maintain."
 */
const ROTATING_LINES = [
  "I understand the rule.",
  "I make it legible.",
  "I ship and maintain.",
] as const

/** Homepage already says "KL / Seremban". PERSON.location uses a comma. */
const PLACE = "KL / Seremban"

export function HomeHero() {
  return (
    <header className="home-hero" id="home">
      <div className="sage-col">
        <div aria-hidden="true" className="blk" />
        <h1 className="nm">
          <span className="m">
            <span>Hi,</span>
          </span>
          <span className="m">
            <span>I&apos;m</span>
          </span>
          <span className="m">
            <span>Nic.</span>
          </span>
        </h1>
        <p className="nm2">
          <span>{HERO.roleLine}</span>
          <span>{PLACE}</span>
        </p>
      </div>
      <div className="r">
        <p className="eb">About</p>
        <p aria-live="off" className="rot">
          <span className="slot">
            {ROTATING_LINES.map((line, index) => (
              <b className={index === 0 ? "on" : undefined} key={line}>
                {line}
              </b>
            ))}
          </span>
        </p>
        <p className="lead">{HERO.lead}</p>
        <div className="ctas">
          <a className="btn btn-trace" href="#work">
            {HOME_CTA.seeProjects} ↓
          </a>
          <a className="btn btn-ghost" href="#contact">
            {HOME_CTA.contact}
          </a>
          <a className="btn btn-ghost" href="/notes">
            {HOME_CTA.technicalNotes}
          </a>
        </div>
        <p className="hint">{HERO.notesHint}</p>
      </div>
    </header>
  )
}
