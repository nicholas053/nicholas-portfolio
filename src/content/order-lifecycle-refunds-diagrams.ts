import type { MermaidBlock } from "@/components/MermaidStack"

export const orderLifecycleRefundsDiagrams: readonly MermaidBlock[] = [
  {
    id: "data-model",
    label: "Data model",
    chart: `erDiagram
    CHECKOUT_SESSION ||--o{ CHILD_ORDER : groups
    CHECKOUT_SESSION ||--o{ PAYMENT : billed_by
    CHILD_ORDER ||--|{ ORDER_LINE : has
    CHILD_ORDER ||--o| SHIP_TO : has
    CHILD_ORDER ||--o| FULFILMENT : has
    CHILD_ORDER ||--o| SETTLEMENT : has
    CHILD_ORDER ||--o{ STATUS_EVENT : has
    CHILD_ORDER ||--o{ RETURN_CASE : has`,
  },
  {
    id: "return-refund",
    label: "Return received and refund",
    chart: `flowchart TD
    A["Seller → API<br/>mark return received"] --> B["API → Child order<br/>lock row"]
    B --> C["API → Return case<br/>state = received"]
    C --> D["API → Child order<br/>cancelled, settlement held"]
    D --> E["API → Stock<br/>restore on hand, once per order"]
    E --> F["API → Payment<br/>refund, partial if sibling orders are still paid"]`,
  },
  {
    id: "order-states",
    label: "Order states",
    chart: `stateDiagram-v2
    [*] --> to_pay
    to_pay --> to_ship: paid
    to_pay --> cancelled: unpaid cancel
    to_ship --> preparing: seller confirms
    preparing --> to_receive: shipped
    to_receive --> delivered: delivered
    delivered --> completed: buyer confirms / auto-complete
    to_ship --> cancelled: paid cancel
    preparing --> cancelled: paid cancel
    completed --> return_refund: return case`,
  },
  {
    id: "return-states",
    label: "Return case states",
    chart: `stateDiagram-v2
    [*] --> requested
    requested --> seller_approved
    requested --> seller_rejected: seller rejects / no response
    seller_approved --> return_received: goods back
    return_received --> refund_completed
    seller_rejected --> disputed: buyer escalates
    seller_rejected --> closed: window expires
    disputed --> return_received: admin approves
    disputed --> closed: admin rejects`,
  },
]
