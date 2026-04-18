/** Mermaid source for /notes/fullstack-assessment-debugging — generic labels, no employer names. */

export const ASSESSMENT_FULL_STACK_SEQUENCE = `sequenceDiagram
    participant UI as Next.js UI
    participant SWR as SWR cache
    participant API as Laravel API
    participant Ext as External REST API

    UI->>SWR: Request paginated list (page N)

    alt Cache hit
        SWR-->>UI: Return cached JSON immediately
    else Cache miss
        SWR->>API: GET /api/items with page and limit
        Note over API: Risk: sequential detail calls inflate latency
        API->>Ext: List endpoint returns batch identifiers
        Ext-->>API: Identifier rows for current page
        Note over API,Ext: Laravel HTTP client concurrent pool
        API->>Ext: Parallel detail requests for each row
        Ext-->>API: Detail payloads in completion order
        Note over API: Post-session fix: deterministic merge and cache keys
        API->>API: Map responses to stable indices then merge
        API-->>SWR: Single stable aggregate JSON
        SWR-->>UI: Hydrate list and images
    end

    Note over UI: Skeletons then Intersection Observer for next page with deduped SWR keys`
