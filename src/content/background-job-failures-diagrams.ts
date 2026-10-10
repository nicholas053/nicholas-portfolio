import type { MermaidBlock } from "@/components/MermaidStack"

export const backgroundJobFailuresDiagrams: readonly MermaidBlock[] = [
  {
    id: "data-model",
    label: "Data model (illustrative)",
    chart: `erDiagram
    INVOICE_JOB {
        string state
        string external_ref
        string last_error
        timestamp last_error_at
        timestamp updated_at
    }`,
  },
  {
    id: "retry",
    label: "Failed call, then retry",
    chart: `sequenceDiagram
    participant Q as Queue
    participant W as Worker
    participant DB
    participant Ext as External API
    Q->>W: job
    W->>DB: claim (conditional update)
    W->>Ext: send
    Ext-->>W: error
    W->>DB: clear claim if marker matches
    W->>DB: last_error = stage + message
    W-->>Q: return error (retry later)
    Q->>W: retry
    W->>DB: claim
    W->>Ext: send
    Ext-->>W: ok + external_ref
    W->>DB: save ref, clear last_error`,
  },
]
