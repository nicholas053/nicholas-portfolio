/** Mermaid source for /notes/flexible-financial-settlement (NDA-safe labels). */

import type { MermaidTabItem } from "@/components/MermaidTabs"

export const SETTLEMENT_ERD = `erDiagram
    AGENT ||--o{ SALE_CASE : closes
    AGENT ||--o{ COMMISSION_RECORD : earns
    SALE_CASE ||--o{ COMMISSION_RECORD : generates
    PAYMENT_BATCH ||--o{ COMMISSION_RECORD : contains
    PAYMENT_VOUCHER ||--o{ COMMISSION_RECORD : covers

    AGENT {
        int id PK
        string name
        boolean is_wht_enabled
        decimal ytd_earnings
    }
    SALE_CASE {
        int id PK
        string property_details
        string status
        decimal total_price
    }
    COMMISSION_RECORD {
        int id PK
        int agent_id FK
        int case_id FK
        string type
        decimal gross_amount
        decimal wht_amount
        string status
        int active_batch_id FK
        int final_pv_id FK
    }
    PAYMENT_BATCH {
        int id PK
        string batch_name
        string created_by_user
        string status
        datetime created_at
    }
    PAYMENT_VOUCHER {
        int id PK
        string pv_number
        int agent_id FK
        int source_batch_id FK
        date pv_date
        decimal total_payout
        decimal total_wht_deducted
    }`

export const SETTLEMENT_FLOW = `flowchart TD
    Start((Cron Job Start)) --> Fetch[Fetch Completed Cases]

    subgraph CalcEngine["Calculation Engine"]
        Loop[Loop per Agent]
        WHT_Check{Is WHT Enabled for Agent?}
        YTD_Check{YTD + current meets policy threshold?}
        TaxZero[Tax = 0]
        TaxCalc[Withholding = commission * policy rate]

        Fetch --> Loop
        Loop --> WHT_Check
        WHT_Check -- No --> TaxZero
        WHT_Check -- Yes --> YTD_Check
        YTD_Check -- No --> TaxZero
        YTD_Check -- Yes --> TaxCalc
    end

    Insert[Insert Commission Record Status: NEW]
    TaxZero --> Insert
    TaxCalc --> Insert

    subgraph FinanceCart["Finance Shopping Cart"]
        AgentView[Agent: Views My Commission]
        Submit[Agent Submits]
        AdminApprove[Admin Approves]
        FinanceView[Finance Pool]
        SelectItems{Finance Selects Items}
        LockItems[LOCK Records, Set Batch_ID]
        DraftBatch[Draft Batch]
        GenPV[Generate PV]

        AgentView --> Submit --> AdminApprove --> FinanceView
        FinanceView --> SelectItems
        SelectItems -- Yes --> LockItems --> DraftBatch --> GenPV
    end

    Insert --> AgentView`

export const SETTLEMENT_SEQUENCE = `flowchart TD
    A["Steps 1–3: automatic calculation"] --> B["Calculation engine → Database<br/>fetch new closed cases"]
    B --> C["For each agent in the case<br/>check year-to-date earning"]
    C --> D{"Year-to-date plus current<br/>reaches the policy threshold?"}
    D -- yes --> E["Set withholding flag true<br/>calculate withholding at the configured rate"]
    D -- no --> F["Set withholding flag false<br/>tax = 0"]
    E --> G["Insert record<br/>status NEW, withholding amount"]
    F --> G
    G --> H["Step 4: visibility and submission"]
    H --> I["Database → Agent portal<br/>agent views My Commission"]
    I --> J["Agent portal → Database<br/>submit record, status PENDING_APPROVAL"]
    J --> K["Step 6: shopping cart selection"]
    K --> L["Database → Finance portal<br/>query the approved commissions pool"]
    L --> M["Finance selection session<br/>select item A base and item B bonus"]
    M --> N["Lock items<br/>status IN_DRAFT_BATCH"]
    N --> O["Save as draft payment batch"]
    O --> P["Step 7: finalizing payment"]
    P --> Q["Finance portal → Database<br/>confirm batch and generate payment voucher"]
    Q --> R["Assign voucher number and date"]
    R --> S["Update items to PAID"]
    S --> T["Update case status<br/>partially or fully paid"]
    T --> U["Update agent My Payment view"]`

/** Flattened composite state for reliable Mermaid 11 parsing. */
export const SETTLEMENT_STATE = `stateDiagram-v2
    [*] --> NEW : Cron Job Runs
    NEW --> PENDING_APPROVAL : Agent Submits
    PENDING_APPROVAL --> APPROVED : Admin Approves
    PENDING_APPROVAL --> REJECTED : Admin Rejects
    REJECTED --> NEW : Reset for Edit
    APPROVED --> IN_DRAFT_BATCH : Added to Finance Cart
    IN_DRAFT_BATCH --> APPROVED : Removed from Cart
    IN_DRAFT_BATCH --> PROCESSING_PV : Confirm Batch
    PROCESSING_PV --> PAID : PV Generated
    PAID --> [*]

    note right of IN_DRAFT_BATCH
        Lock state: items cannot be
        picked by another Finance session
    end note`

export const settlementDiagramTabs: MermaidTabItem[] = [
  { id: "erd", label: "Database ERD", chart: SETTLEMENT_ERD },
  { id: "flow", label: "System Flow", chart: SETTLEMENT_FLOW },
  { id: "sequence", label: "Sequence", chart: SETTLEMENT_SEQUENCE },
  { id: "state", label: "State Machine", chart: SETTLEMENT_STATE },
]
