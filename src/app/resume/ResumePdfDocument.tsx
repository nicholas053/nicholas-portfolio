import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer"
import {
  EDUCATION,
  EXPERIENCE_TIMELINE,
  experienceUsesEmployerRichBlock,
  PERSON,
  RESUME_PROJECTS,
  type ResumeCaseStudy,
  RESUME_SKILL_ACCENT_IDS,
  RESUME_SUMMARY,
  RESUME_SUMMARY_ACCENT_PHRASE,
  TECH_STACK_ITEMS,
} from "@/content/content"
import { splitResumeAccent } from "@/lib/resume-accent"

/** Tailwind sky-600 — matches portfolio accent for recruiter highlights. */
const SKY600 = "#0284c7"

const styles = StyleSheet.create({
  page: {
    paddingVertical: 22,
    paddingHorizontal: 24,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#18181b",
    lineHeight: 1.38,
  },
  /** Name ↔ role breathing room */
  h1: { fontSize: 17, fontWeight: "bold", marginBottom: 10 },
  role: { fontSize: 10, color: "#52525b", marginTop: 1, marginBottom: 8 },
  contactWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#d4d4d8",
  },
  contactItem: { marginRight: 12, marginBottom: 3 },
  contactLocation: { fontSize: 9, color: "#52525b" },
  /** Clickable links: underline matches ink color (avoids default blue / mismatched rule). */
  link: {
    color: "#3f3f46",
    textDecoration: "underline",
    textDecorationColor: "#3f3f46",
  },
  sectionTitle: {
    fontSize: 8,
    fontWeight: "bold",
    letterSpacing: 1.2,
    color: SKY600,
    textTransform: "uppercase",
    marginTop: 10,
    marginBottom: 5,
    paddingBottom: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: "#bae6fd",
  },
  body: { fontSize: 9, lineHeight: 1.4 },
  muted: { fontSize: 8, color: "#52525b", marginBottom: 4 },
  /** One Background / experience block (rail + content). */
  timelineEntryBlock: {
    marginTop: 9,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: "#38bdf8",
    paddingTop: 1,
  },
  timelineEntryBlockFirst: {
    marginTop: 4,
  },
  timelineHeadRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 2,
  },
  timelineDatePill: {
    backgroundColor: "#f0f9ff",
    borderWidth: 1,
    borderColor: "#bae6fd",
    borderRadius: 3,
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginRight: 4,
  },
  timelineDatePillText: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: "#0c4a6e",
  },
  timelineDatePillDur: {
    fontSize: 8,
    fontWeight: "normal",
    color: "#0369a1",
  },
  timelineHeadlineSep: {
    fontSize: 9,
    fontWeight: "normal",
    color: "#71717a",
  },
  timelineHeadlineRole: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#18181b",
  },
  /** Single line: keeps “Web Developer ·” and employer link on one baseline (row View misaligns Link vs Text). */
  timelineEmployerLine: {
    fontSize: 8,
    lineHeight: 1.35,
    color: "#52525b",
    marginTop: 2,
  },
  timelineEmployerLink: {
    fontSize: 8,
    lineHeight: 1.35,
    color: "#3f3f46",
    textDecoration: "underline",
    textDecorationColor: "#3f3f46",
  },
  timelineSummaryLead: {
    fontSize: 8.5,
    fontStyle: "italic",
    color: "#52525b",
    marginTop: 4,
    lineHeight: 1.4,
  },
  timelineBullet: {
    fontSize: 9,
    lineHeight: 1.4,
    marginTop: 3,
    color: "#27272a",
  },
  timelineBulletLabel: {
    fontSize: 9,
    lineHeight: 1.4,
    fontWeight: "bold",
    color: "#18181b",
  },
  /** Company name after period (rich employer row) */
  employerHeadlineName: {
    fontSize: 9,
    fontWeight: "bold",
    color: "#18181b",
    textDecoration: "underline",
    textDecorationColor: "#18181b",
  },
  timelineJobTitle: {
    fontSize: 9,
    fontWeight: "bold",
    marginTop: 4,
    color: SKY600,
  },
  eduLine: { fontSize: 9, marginTop: 5 },
  eduSub: { fontSize: 8, color: "#52525b", marginTop: 1 },
  skillsRow: { marginTop: 4, fontSize: 9, lineHeight: 1.45, color: "#27272a" },
  skillsWord: { fontSize: 9, lineHeight: 1.45, color: "#27272a" },
  skillsAccent: { fontSize: 9, lineHeight: 1.45, color: SKY600, fontWeight: "bold" },
  accentText: { color: SKY600, fontWeight: "bold" },
  inlineNoteLink: {
    fontSize: 8,
    lineHeight: 1.35,
    color: SKY600,
    fontWeight: "bold",
    textDecoration: "underline",
    textDecorationColor: SKY600,
  },
  caseBlock: {
    marginTop: 10,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: "#f4f4f5",
  },
  caseTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginBottom: 4,
    gap: 4,
  },
  caseTitleCol: { flexGrow: 1, flexShrink: 1, minWidth: 0, paddingRight: 6 },
  caseTitle: { fontSize: 9.5, fontWeight: "bold" },
  caseTag: { fontSize: 7, color: "#71717a", marginTop: 2, textTransform: "uppercase" },
  caseLink: {
    fontSize: 7.5,
    color: SKY600,
    textDecoration: "underline",
    textDecorationColor: SKY600,
    marginTop: 2,
    fontWeight: "bold",
  },
  caseLinkWrap: { flexShrink: 0, maxWidth: "28%" },
  label: {
    fontSize: 7,
    fontWeight: "bold",
    color: "#71717a",
    textTransform: "uppercase",
    marginTop: 5,
  },
  bgEduRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10,
    gap: 10,
  },
  bgCol: {
    width: "70%",
    maxWidth: "70%",
    paddingRight: 4,
  },
  eduCol: {
    width: "30%",
    minWidth: 0,
  },
})

function resumeExperienceBody(entry: (typeof EXPERIENCE_TIMELINE)[number]) {
  return entry.resumeBody ?? entry.body
}

function CaseStudiesPdf({ items, siteUrl }: { items: ResumeCaseStudy[]; siteUrl: string }) {
  return (
    <>
      {items.map((item, i) => {
        const href = `${siteUrl}${item.linkPath}`
        const linkLabel = item.linkPath.startsWith("/notes") ? "Technical note" : "Case study"
        const isLast = i === items.length - 1
        const impactParts = splitResumeAccent(item.impact, item.impactAccentPhrase)
        return (
          <View key={item.title} wrap={false} style={[styles.caseBlock, isLast ? { borderBottomWidth: 0 } : {}]}>
            <View style={styles.caseTitleRow}>
              <View style={styles.caseTitleCol}>
                <Text style={styles.caseTitle}>{item.title}</Text>
                {item.tag ? <Text style={styles.caseTag}>{item.tag}</Text> : null}
              </View>
              <View style={styles.caseLinkWrap}>
                <Link src={href}>
                  <Text style={styles.caseLink}>{linkLabel} →</Text>
                </Link>
              </View>
            </View>
            <Text style={styles.body}>{item.brief}</Text>
            <Text style={styles.label}>Challenge</Text>
            <Text style={styles.body}>{item.challenge}</Text>
            <Text style={styles.label}>Solution</Text>
            <Text style={styles.body}>{item.solution}</Text>
            <Text style={styles.label}>Impact</Text>
            <Text style={styles.body}>
              {impactParts.before}
              {impactParts.highlight ? <Text style={styles.accentText}>{impactParts.highlight}</Text> : null}
              {impactParts.after}
            </Text>
          </View>
        )
      })}
    </>
  )
}

export function ResumePdfDocument({ siteUrl }: { siteUrl: string }) {
  const mailto = `mailto:${PERSON.email}`
  const tel = `tel:${PERSON.phone.replace(/\s/g, "")}`
  const github = `https://github.com/${PERSON.githubUsername}`
  const summaryParts = splitResumeAccent(RESUME_SUMMARY, RESUME_SUMMARY_ACCENT_PHRASE)

  return (
    <Document title="Resume" author={PERSON.legalName} subject={`${PERSON.role} — resume`}>
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.h1}>{PERSON.legalName}</Text>
        <Text style={styles.role}>{PERSON.role}</Text>

        <View style={styles.contactWrap}>
          <View style={styles.contactItem}>
            <Link src={mailto}>
              <Text style={styles.link}>{PERSON.email}</Text>
            </Link>
          </View>
          <View style={styles.contactItem}>
            <Link src={tel}>
              <Text style={styles.link}>{PERSON.phone}</Text>
            </Link>
          </View>
          <View style={styles.contactItem}>
            <Link src={github}>
              <Text style={styles.link}>github.com/{PERSON.githubUsername}</Text>
            </Link>
          </View>
          <View style={styles.contactItem}>
            <Link src={siteUrl}>
              <Text style={styles.link}>{siteUrl.replace(/^https?:\/\//, "")}</Text>
            </Link>
          </View>
          <View style={styles.contactItem}>
            <Text style={styles.contactLocation}>{PERSON.location}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.body}>
          {summaryParts.before}
          {summaryParts.highlight ? <Text style={styles.accentText}>{summaryParts.highlight}</Text> : null}
          {summaryParts.after}
        </Text>

        <View style={styles.bgEduRow}>
          <View style={styles.bgCol}>
            <Text style={[styles.sectionTitle, { marginTop: 0 }]}>Background</Text>
            {EXPERIENCE_TIMELINE.map((entry, entryIdx) => {
              const richEmployer = experienceUsesEmployerRichBlock(entry)
              const headlineSecond =
                richEmployer && entry.employer ? (
                  <Link src={entry.employer.url}>
                    <Text style={styles.employerHeadlineName}>{entry.employer.name}</Text>
                  </Link>
                ) : entry.roleTitle ? (
                  <Text style={styles.timelineHeadlineRole}>{entry.roleTitle}</Text>
                ) : null

              const datePill = (
                <View style={styles.timelineDatePill} wrap={false}>
                  <Text>
                    <Text style={styles.timelineDatePillText}>{entry.period}</Text>
                    {entry.durationLabel ? <Text style={styles.timelineDatePillDur}> · {entry.durationLabel}</Text> : null}
                  </Text>
                </View>
              )

              return (
                <View
                  key={entry.period}
                  style={[styles.timelineEntryBlock, entryIdx === 0 ? styles.timelineEntryBlockFirst : {}]}
                  wrap={false}
                >
                  {headlineSecond ? (
                    <View style={styles.timelineHeadRow} wrap={false}>
                      {datePill}
                      <Text style={styles.timelineHeadlineSep}> | </Text>
                      {headlineSecond}
                    </View>
                  ) : (
                    <View style={styles.timelineHeadRow} wrap={false}>
                      {datePill}
                    </View>
                  )}
                  {entry.employer && !richEmployer ? (
                    <Text style={styles.timelineEmployerLine}>
                      Web Developer ·{" "}
                      <Link src={entry.employer.url}>
                        <Text style={styles.timelineEmployerLink}>{entry.employer.name}</Text>
                      </Link>
                    </Text>
                  ) : null}
                  {entry.jobTitle && richEmployer ? <Text style={styles.timelineJobTitle}>{entry.jobTitle}</Text> : null}
                  {entry.highlights?.length ? (
                    <>
                      {entry.summaryLead ? <Text style={styles.timelineSummaryLead}>{entry.summaryLead}</Text> : null}
                      {entry.highlights.map((h, idx) => {
                        const bodyParts = splitResumeAccent(h.body, h.resumeAccentPhrase)
                        return (
                          <Text key={`${h.label}-${idx}`} style={styles.timelineBullet}>
                            <Text style={styles.timelineBulletLabel}>• {h.label}</Text> {bodyParts.before}
                            {bodyParts.highlight ? <Text style={styles.accentText}>{bodyParts.highlight}</Text> : null}
                            {bodyParts.after}
                            {h.technicalNotePath ? (
                              <Link src={`${siteUrl}${h.technicalNotePath}`}>
                                <Text style={styles.inlineNoteLink}> See full →</Text>
                              </Link>
                            ) : null}
                          </Text>
                        )
                      })}
                    </>
                  ) : (
                    <Text style={[styles.body, { marginTop: 4 }]}>{resumeExperienceBody(entry)}</Text>
                  )}
                </View>
              )
            })}
          </View>
          <View style={styles.eduCol}>
            <Text style={[styles.sectionTitle, { marginTop: 0 }]}>Education</Text>
            {EDUCATION.map((e) => (
              <View key={e.institution}>
                <Text style={styles.eduLine}>
                  {e.credential}
                  {e.note ? ` — ${e.note}` : ""}
                </Text>
                <Text style={styles.eduSub}>
                  {e.institution} · {e.years}
                </Text>
              </View>
            ))}
            <Text style={[styles.sectionTitle, { marginTop: 10 }]}>Skills</Text>
            <Text style={[styles.skillsRow, { marginTop: 0 }]}>
              {TECH_STACK_ITEMS.map((s, i) => (
                <Text key={s.id}>
                  {i > 0 ? ", " : ""}
                  <Text style={RESUME_SKILL_ACCENT_IDS.has(s.id) ? styles.skillsAccent : styles.skillsWord}>{s.label}</Text>
                </Text>
              ))}
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Projects</Text>
        <CaseStudiesPdf items={RESUME_PROJECTS} siteUrl={siteUrl} />
      </Page>
    </Document>
  )
}
