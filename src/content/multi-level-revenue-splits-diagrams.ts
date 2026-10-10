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
    chart: `flowchart TD
    A["Ops → Preview<br/>draft rates"] --> B["Preview → Split function<br/>compute levels"]
    B --> C["Preview → Ops<br/>share per level and leftover, no write"]
    C --> D["Settle → DB<br/>mark sale settled when the state allows it"]
    D --> E["Settle → Split function<br/>compute with live rates"]
    E --> F["Settle → DB<br/>insert split lines, unique per sale and partner"]`,
  },
]
