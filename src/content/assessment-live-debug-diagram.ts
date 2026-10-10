/** Mermaid source for /notes/fullstack-assessment-debugging — generic labels, no employer names. */

export const ASSESSMENT_FULL_STACK_SEQUENCE = `flowchart TD
    A["Next.js UI → SWR<br/>request paginated list, page N"] --> B{"Cache?"}
    B -- hit --> C["SWR → UI<br/>return cached JSON immediately"]
    B -- miss --> D["SWR → Laravel API<br/>GET /api/items with page and limit"]
    D --> E["Risk: sequential detail calls inflate latency"]
    E --> F["API → External REST<br/>list endpoint returns batch identifiers"]
    F --> G["External REST → API<br/>identifier rows for the current page"]
    G --> H["Laravel HTTP client concurrent pool<br/>parallel detail requests for each row"]
    H --> I["External REST → API<br/>detail payloads in completion order"]
    I --> J["Post-session fix<br/>map responses to stable indices, then merge"]
    J --> K["API → SWR<br/>single stable aggregate JSON"]
    K --> L["SWR → UI<br/>hydrate list and images"]
    C --> M["Skeletons, then Intersection Observer<br/>next page uses deduped SWR keys"]
    L --> M`
