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
    chart: `sequenceDiagram
    participant Buyer
    participant API
    participant PSP as Payment provider
    participant DB as Checkout session
    Buyer->>API: cancel unpaid checkout
    API->>PSP: was this paid?
    PSP-->>API: not paid
    API->>DB: lock, re-check, cancel, release holds
    PSP->>API: late confirmation (paid)
    API->>DB: lock session
    API->>DB: was cancelled, so revive: mark paid, restore orders, settle stock
    PSP->>API: duplicate confirmation
    API->>DB: already paid, so no-op`,
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
