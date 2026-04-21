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
  PERSON,
  RESUME_ENGINEERING,
  RESUME_PROJECTS,
  type ResumeCaseStudy,
  RESUME_SUMMARY,
  TECH_STACK_LINE,
} from "@/content/content"

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
  /** Theme-aligned links (zinc, not default PDF blue) */
  link: { color: "#3f3f46", textDecoration: "underline", textDecorationColor: "#a1a1aa" },
  sectionTitle: {
    fontSize: 8,
    fontWeight: "bold",
    letterSpacing: 1.2,
    color: "#71717a",
    textTransform: "uppercase",
    marginTop: 10,
    marginBottom: 5,
    paddingBottom: 3,
    borderBottomWidth: 0.5,
    borderBottomColor: "#e4e4e7",
  },
  body: { fontSize: 9, lineHeight: 1.4 },
  muted: { fontSize: 8, color: "#52525b", marginBottom: 4 },
  timelinePeriod: { fontSize: 9, fontWeight: "bold", marginTop: 6 },
  timelineMeta: { fontSize: 8, color: "#52525b", marginTop: 2 },
  eduLine: { fontSize: 9, marginTop: 5 },
  eduSub: { fontSize: 8, color: "#52525b", marginTop: 1 },
  skillsLine: { marginTop: 4, fontSize: 9, lineHeight: 1.45, color: "#27272a" },
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
    color: "#3f3f46",
    textDecoration: "underline",
    textDecorationColor: "#a1a1aa",
    marginTop: 2,
  },
  caseLinkWrap: { flexShrink: 0, maxWidth: "28%" },
  label: {
    fontSize: 7,
    fontWeight: "bold",
    color: "#71717a",
    textTransform: "uppercase",
    marginTop: 5,
  },
  engineeringSection: {
    marginTop: 14,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#d4d4d8",
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
        return (
          <View key={item.title} style={[styles.caseBlock, isLast ? { borderBottomWidth: 0 } : {}]}>
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
            <Text style={styles.body}>{item.impact}</Text>
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
        </View>

        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.body}>{RESUME_SUMMARY}</Text>

        <Text style={styles.sectionTitle}>Skills</Text>
        <Text style={styles.skillsLine}>{TECH_STACK_LINE}</Text>

        <Text style={styles.sectionTitle}>Background</Text>
        {EXPERIENCE_TIMELINE.map((entry) => (
          <View key={entry.period}>
            <Text style={styles.timelinePeriod}>{entry.period}</Text>
            {entry.employer ? (
              <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 2 }}>
                <Text style={styles.timelineMeta}>Web Developer · </Text>
                <Link src={entry.employer.url}>
                  <Text style={[styles.link, { fontSize: 8 }]}>{entry.employer.name}</Text>
                </Link>
              </View>
            ) : null}
            <Text style={[styles.body, { marginTop: 4 }]}>{resumeExperienceBody(entry)}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Education</Text>
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

        <Text style={styles.sectionTitle}>Projects</Text>
        <CaseStudiesPdf items={RESUME_PROJECTS} siteUrl={siteUrl} />

        <View style={styles.engineeringSection}>
          <Text style={[styles.sectionTitle, { marginTop: 0 }]}>Engineering</Text>
          <CaseStudiesPdf items={RESUME_ENGINEERING} siteUrl={siteUrl} />
        </View>
      </Page>
    </Document>
  )
}
