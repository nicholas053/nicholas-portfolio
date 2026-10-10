import type { MermaidBlock } from "@/components/MermaidStack"

export const cartStockReservationDiagrams: readonly MermaidBlock[] = [
  {
    id: "data-model",
    label: "Data model",
    chart: `erDiagram
    BUYER ||--o{ CART_LINE : has
    VARIANT ||--o{ CART_LINE : referenced_by
    VARIANT ||--o{ STOCK_HOLD : reserved_by
    CHECKOUT_SESSION ||--o{ STOCK_HOLD : owns
    VARIANT ||--o{ INVENTORY_EVENT : logged
    VARIANT {
        int on_hand
        int held
    }
    STOCK_HOLD {
        int quantity
        string state
        timestamp expires_at
    }`,
  },
  {
    id: "open-summary",
    label: "Opening checkout summary",
    chart: `sequenceDiagram
    participant Buyer
    participant API as Summary API
    participant Session as Checkout session
    participant Variant
    participant Hold as Stock hold
    Buyer->>API: open summary(cart lines)
    API->>Session: lock existing or create session
    API->>Variant: lock row, check on_hand - held
    API->>Hold: create hold (active)
    API->>Variant: held = held + qty
    API-->>Buyer: totals and expiry`,
  },
  {
    id: "hold-states",
    label: "Hold states",
    chart: `stateDiagram-v2
    [*] --> active: reserve
    active --> consumed: payment confirmed
    active --> released: buyer leaves / qty changed
    active --> expired: scheduled expiry
    released --> consumed: late payment settles
    expired --> consumed: late payment settles`,
  },
]
