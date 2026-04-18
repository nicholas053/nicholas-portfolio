"use client"

import { MermaidDiagram } from "@/components/MermaidDiagram"
import { ASSESSMENT_FULL_STACK_SEQUENCE } from "@/content/assessment-live-debug-diagram"

export function AssessmentFlowDiagram() {
  return (
    <MermaidDiagram
      chart={ASSESSMENT_FULL_STACK_SEQUENCE}
      aria-label="Sequence diagram: SWR, Laravel aggregation with concurrent fetches, and UI pagination flow"
    />
  )
}
