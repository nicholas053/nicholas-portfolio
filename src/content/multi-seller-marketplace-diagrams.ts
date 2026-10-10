import type { MermaidBlock } from "@/components/MermaidStack"

export const multiSellerMarketplaceDiagrams: readonly MermaidBlock[] = [
  {
    id: "overall-flow",
    label: "Overall flow",
    chart: `flowchart TD
    A[Seller applies] --> B[Admin approves]
    B --> C[Seller lists products and variants]
    C --> D[Buyer adds to shared cart]
    D --> E[Checkout summary: stock held]
    E --> F[Place order: one session, one order per seller]
    F --> G{Payment confirmed?}
    G -- yes --> H[Seller confirms and ships]
    G -- "no / cancelled" --> X[Holds released]
    H --> I[Delivered]
    I --> J[Completed]
    J --> K[Seller income released after buffer]
    I --> R[Return or refund case]`,
  },
  {
    id: "data-model",
    label: "Main data model (simplified)",
    chart: `erDiagram
    SELLER_STORE ||--o{ PRODUCT : lists
    PRODUCT ||--o{ VARIANT : has
    BUYER ||--o{ CART_LINE : has
    VARIANT ||--o{ CART_LINE : in
    VARIANT ||--o{ STOCK_HOLD : reserved_by
    CHECKOUT_SESSION ||--o{ STOCK_HOLD : owns
    CHECKOUT_SESSION ||--o{ CHILD_ORDER : groups
    CHECKOUT_SESSION ||--o{ PAYMENT : paid_by
    SELLER_STORE ||--o{ CHILD_ORDER : fulfils
    CHILD_ORDER ||--o{ ORDER_LINE : has
    CHILD_ORDER ||--o| SETTLEMENT : pays_out
    CHILD_ORDER ||--o{ RETURN_CASE : may_have`,
  },
  {
    id: "checkout-payment",
    label: "Checkout to payment",
    chart: `flowchart TD
    A["Buyer → API<br/>open checkout summary"] --> B["API → Stock holds<br/>hold each variant, row lock"]
    B --> C["Buyer → API<br/>place order"]
    C --> D["API → Checkout session<br/>create session and one order per seller"]
    D --> E["API → Payment provider<br/>create payment"]
    E --> F["Payment provider → API<br/>payment confirmed, async"]
    F --> G["API → Checkout session<br/>lock session, mark paid"]
    G --> H["API → Stock holds<br/>consume holds"]`,
  },
]
