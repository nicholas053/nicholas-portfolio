import type { MermaidBlock } from "@/components/MermaidStack"

export const cancelVsLatePaymentDiagrams: readonly MermaidBlock[] = [
  {
    id: "data-model",
    label: "Data model",
    chart: `erDiagram
    CHECKOUT_SESSION ||--o{ PAYMENT : paid_by
    CHECKOUT_SESSION ||--o{ CHILD_ORDER : groups
    CHECKOUT_SESSION ||--o{ STOCK_HOLD : owns
    CHECKOUT_SESSION {
        string state
        string pay_state
        timestamp cancelled_at
    }
    PAYMENT {
        string provider_ref
        string state
    }`,
  },
  {
    id: "cancel-race",
    label: "Cancel races a late confirmation",
    chart: `flowchart TD
    A["Buyer → API<br/>cancel unpaid checkout"] --> B["API → Payment provider<br/>was this paid?"]
    B --> C["Payment provider → API<br/>not paid"]
    C --> D["API → Checkout session<br/>lock, re-check, cancel, release holds"]
    D --> E["Payment provider → API<br/>late confirmation, paid"]
    E --> F["API → Checkout session<br/>lock session"]
    F --> G["API → Checkout session<br/>was cancelled, so revive: mark paid, restore orders, settle stock"]
    G --> H["Payment provider → API<br/>duplicate confirmation"]
    H --> I["API → Checkout session<br/>already paid, so no-op"]`,
  },
  {
    id: "session-states",
    label: "Checkout session states",
    chart: `stateDiagram-v2
    [*] --> summary: open checkout
    summary --> pending: place order
    summary --> expired: idle timeout
    summary --> cancelled: buyer leaves
    pending --> paid: confirmation / background check
    pending --> cancelled: buyer cancels (provider says unpaid)
    cancelled --> paid: late confirmation revives`,
  },
]
