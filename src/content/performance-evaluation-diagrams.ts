/** Mermaid source for /notes/performance-evaluation-360 */

import type { MermaidTabItem } from "@/components/MermaidTabs"

export const PERF_EVAL_ERD = `erDiagram
    DEPARTMENT ||--o{ USER : has_members
    USER ||--o{ EVALUATION : receives_rating
    USER ||--o{ EVALUATION : submits_rating
    EXTERNAL_PARTNER ||--o{ EVALUATION : external_submits

    DEPARTMENT {
        bigint id PK
        string name
    }
    USER {
        bigint id PK
        string name
        string email
        string role
        bigint department_id FK
    }
    EXTERNAL_PARTNER {
        bigint id PK
        string company_name
        string contact_person
    }
    EVALUATION {
        bigint id PK
        bigint evaluatee_id FK
        bigint evaluator_id FK
        bigint partner_id FK
        string form_type
        jsonb payload
        int total_score
        string status
        timestamp created_at
        timestamp completed_at
    }`

/** Flow aligned with product copy; Mermaid-safe labels (no raw newlines in edges). */
export const PERF_EVAL_FLOW = `flowchart TD
    subgraph adminFlow["Admin"]
        A1[Activate year-end forms]
        A2[Match team members]
        A3[Resolve role and form type]
        A4[(Persist pending evaluations)]
        A5[Generate public link]
        A6[Send link to partner]
        A1 --> A2 --> A3 --> A4
        A5 --> A6
    end

    subgraph staffFlow["Staff member"]
        S1[Login]
        S2{Dashboard tab}
        S3[List pending and completed]
        S4[Open evaluate action]
        S5{Form type}
        S6[Scale questions 1 to 5]
        S7[Text and paragraph prompts]
        S8[Submit answers]
        S9[Submit paragraphs]
        S10[Compute total score]
        S11[(Store JSONB and score)]
        S12[(Store JSONB score null)]
        S13[Completed forms from others]
        S14[View response]
        S15[Load record and JSON payload]
        S16[Read-only schema render]
        S1 --> S2
        S2 -->|Feedback given| S3
        S3 --> S4 --> S5
        S5 -->|Leader or member form| S6 --> S8 --> S10 --> S11
        S5 -->|Self evaluation| S7 --> S9 --> S12
        S2 -->|Feedback received| S13
        S13 --> S14 --> S15 --> S16
    end

    subgraph extFlow["External partner"]
        E1[Open token link]
        E2[Staff and company pickers]
        E3[Select company and staff]
        E4[Complete external rating form]
        E5[Submit]
        E6[Compute total score]
        E7[(Insert row with partner_id)]
        E1 --> E2 --> E3 --> E4 --> E5 --> E6 --> E7
    end

    A6 -.-> E1`

export const PERF_EVAL_SEQUENCE = `sequenceDiagram
    autonumber
    participant Admin
    participant API as Application API
    participant DB as Database
    participant Staff as Staff portal
    participant Partner as Partner browser

    Admin->>API: Activate evaluation cycle
    API->>DB: Resolve org hierarchy and roles
    API->>DB: Bulk insert pending evaluations

    Staff->>API: Authenticated session
    API->>DB: Fetch assigned evaluations
    Staff->>API: Submit evaluation JSON
    API->>DB: Update JSONB payload and status

    Admin->>API: Mint signed public token URL
    Partner->>API: GET form via token (no login)
    API->>DB: Validate token scope and expiry
    Partner->>API: POST external rating JSON
    API->>DB: Insert evaluation with partner_id`

export const performanceEvaluationDiagramTabs: MermaidTabItem[] = [
  { id: "erd", label: "Database ERD", chart: PERF_EVAL_ERD },
  { id: "flow", label: "System Flowchart", chart: PERF_EVAL_FLOW },
  { id: "sequence", label: "Sequence Diagram", chart: PERF_EVAL_SEQUENCE },
]
