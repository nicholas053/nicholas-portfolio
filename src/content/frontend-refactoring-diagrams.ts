/** Mermaid source for /notes/frontend-architecture-refactoring */

export const LEGACY_FE_ARCH = `graph TD
    subgraph legacyRoot["Legacy: high maintenance overhead"]
        direction TB
        subgraph adminPortal["Admin portal"]
            A_List[Module A list]
            A_Add[Module A add page]
            A_Edit[Module A edit page]
            A_Log[Admin activity log]
            A_List --> A_Add
            A_List --> A_Edit
        end
        subgraph agentPortal["Agent portal"]
            Ag_List[Module A list duplicated]
            Ag_Log[Agent activity log duplicated]
        end
    end
    style A_Add fill:#ffcccc,stroke:#ff0000,stroke-width:2px
    style A_Edit fill:#ffcccc,stroke:#ff0000,stroke-width:2px
    style Ag_List fill:#ffcccc,stroke:#ff0000,stroke-width:2px
    style A_Log fill:#ffffcc,stroke:#ffcc00,stroke-width:2px
    style Ag_Log fill:#ffffcc,stroke:#ffcc00,stroke-width:2px`

export const MODERN_FE_ARCH = `graph TD
    subgraph modernRoot["Refactored: component-driven and DRY"]
        direction TB
        Router{Route /module/:id?}
        subgraph sharedLib["Shared component library"]
            SharedLog[[Shared activity log]]
            SharedList[[Unified list view]]
        end
        subgraph dynForm["Dynamic form"]
            Cond1{Has id param?}
            ModeEdit[Edit mode fetch and bind]
            ModeAdd[Create mode empty form]
            Cond1 -->|Yes| ModeEdit
            Cond1 -->|No| ModeAdd
        end
        subgraph permLogic["RBAC"]
            RBAC{Check user role}
            AdminView[Admin actions]
            AgentView[Agent actions]
            RBAC -->|Admin| AdminView
            RBAC -->|Agent| AgentView
        end
        Router --> Cond1
        Router --> SharedList
        SharedList --> RBAC
        ModeEdit --> SharedLog
        ModeAdd --> SharedLog
        SharedList --> SharedLog
    end
    style dynForm fill:#ccffcc,stroke:#009900,stroke-width:2px
    style sharedLib fill:#cce5ff,stroke:#0066cc,stroke-width:2px`
