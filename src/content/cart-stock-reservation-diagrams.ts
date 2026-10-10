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
    chart: `flowchart TD
    A["Buyer → Summary API<br/>open summary of cart lines"] --> B["API → Checkout session<br/>lock existing or create session"]
    B --> C["API → Variant<br/>lock row, check on hand minus held"]
    C --> D["API → Stock hold<br/>create hold, active"]
    D --> E["API → Variant<br/>held = held + quantity"]
    E --> F["API → Buyer<br/>totals and expiry"]`,
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
