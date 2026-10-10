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
    chart: `sequenceDiagram
    participant Seller
    participant API as Apply API
    participant Store as Seller store
    participant Loc as Store location
    participant Pay as Payout detail
    Seller->>API: apply(profile, address id, payout id, documents)
    API->>Store: insert or update-if-rejected, status = pending
    API->>Loc: create default location from address
    API->>Pay: create default payout from account
    API-->>Seller: application submitted`,
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
