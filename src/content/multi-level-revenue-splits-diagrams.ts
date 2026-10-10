import type { MermaidBlock } from "@/components/MermaidStack"

export const multiLevelRevenueSplitsDiagrams: readonly MermaidBlock[] = [
  {
    id: "data-model",
    label: "Data model (illustrative)",
    chart: `erDiagram
    PARTNER ||--o{ PARTNER : parent_of
    PARTNER ||--o{ PARTNER_RATE : has
    SALE ||--o{ SPLIT_LINE : produces
    PARTNER ||--o{ SPLIT_LINE : earns
    PARTNER_RATE {
        decimal rate_percent
        decimal rate_fixed
        timestamp effective_from
    }
    SPLIT_LINE {
        decimal basis_percent
        decimal own_percent
        decimal diff_amount
    }`,
  },
  {
    id: "preview-settle",
    label: "Preview vs settle",
    chart: `sequenceDiagram
    participant Ops
    participant Preview
    participant Split as Split function
    participant Settle
    participant DB
    Ops->>Preview: draft rates
    Preview->>Split: compute levels
    Preview-->>Ops: share per level + leftover (no write)
    Settle->>DB: UPDATE sale SET settled WHERE state in (settle-able)
    Settle->>Split: compute with live rates
    Settle->>DB: INSERT split lines (unique per sale + partner)`,
  },
]
