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

export const SETTLEMENT_SEQUENCE = `sequenceDiagram
    participant Calc as Calculation Engine
    participant DB as Database
    participant AP as Agent Portal
    participant FP as Finance Portal

    rect rgb(255, 248, 220)
    Note over Calc, FP: Step 1-3 Automatic Calculation
    end

    Calc->>DB: Fetch New Closed Cases
    loop For Each Agent in Case
        Calc->>DB: Check Agent YTD_Earning
        alt YTD plus current reaches policy threshold
            Calc->>Calc: Set WHT_Flag = TRUE
            Calc->>Calc: Calculate withholding using configured rate
        else Below policy threshold
            Calc->>Calc: Set WHT_Flag = FALSE
            Calc->>Calc: Calculate Tax = 0
        end
        Calc->>DB: Insert Record (Status: NEW, wht_amount)
    end

    rect rgb(255, 248, 220)
    Note over DB, AP: Step 4 Visibility and Submission
    end

    DB-->>AP: Agent views My Commission
    AP->>DB: Submit Record (Status to PENDING_APPROVAL)

    rect rgb(255, 248, 220)
    Note over DB, FP: Step 6 Shopping Cart Selection
    end

    DB-->>FP: Query Approved Commissions Pool

    rect rgb(240, 248, 255)
    Note right of FP: Finance Selection Session
    FP->>DB: Select Item A Base and Item B Bonus
    DB->>DB: Lock Items (Status IN_DRAFT_BATCH)
    DB-->>FP: Save as Draft Payment Batch
    end

    rect rgb(255, 248, 220)
    Note over DB, FP: Step 7 Finalizing Payment
    end

    FP->>DB: Confirm Batch and Generate PV
    DB->>DB: Assign PV Number and Date
    DB->>DB: Update Items (Status PAID)
    DB->>DB: Update Case Status (Partially or Fully Paid)
    DB-->>AP: Update Agent My Payment View`

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
