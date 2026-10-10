import type { MermaidBlock } from "@/components/MermaidStack"

export const sellerOnboardingDiagrams: readonly MermaidBlock[] = [
  {
    id: "data-model",
    label: "Data model",
    chart: `erDiagram
    ACCOUNT ||--o| SELLER_STORE : owns
    SELLER_STORE ||--o{ STORE_LOCATION : has
    STORE_LOCATION ||--o{ OPENING_HOURS : has
    SELLER_STORE ||--o{ PAYOUT_DETAIL : has
    CATEGORY ||--o{ ATTRIBUTE_TEMPLATE : defines
    SELLER_STORE ||--o{ PRODUCT : lists
    CATEGORY ||--o{ PRODUCT : classifies
    PRODUCT ||--o{ VARIANT_AXIS : has
    VARIANT_AXIS ||--o{ AXIS_VALUE : has
    PRODUCT ||--o{ VARIANT : has
    PRODUCT ||--o{ ATTRIBUTE_VALUE : has`,
  },
  {
    id: "application-flow",
    label: "Application flow",
    chart: `flowchart TD
    A["Seller → Apply API<br/>apply with profile, address, payout, documents"] --> B["Apply API → Seller store<br/>insert or update if rejected, status pending"]
    B --> C["Apply API → Store location<br/>create default location from address"]
    C --> D["Apply API → Payout detail<br/>create default payout from account"]
    D --> E["Apply API → Seller<br/>application submitted"]`,
  },
  {
    id: "shop-status",
    label: "Shop status",
    chart: `stateDiagram-v2
    [*] --> pending: apply
    pending --> active: admin approves
    pending --> rejected: admin rejects
    rejected --> pending: re-apply
    active --> suspended: moderation
    suspended --> active: reactivated`,
  },
]
