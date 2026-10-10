import type { MermaidBlock } from "@/components/MermaidStack"

export const backgroundJobFailuresDiagrams: readonly MermaidBlock[] = [
  {
    id: "data-model",
    label: "Data model (illustrative)",
    chart: `erDiagram
    INVOICE_JOB {
        string state
        string external_ref
        string last_error
        timestamp last_error_at
        timestamp updated_at
    }`,
  },
  {
    id: "retry",
    label: "Failed call, then retry",
    chart: `flowchart TD
    A["Queue → Worker<br/>job"] --> B["Worker → DB<br/>claim, conditional update"]
    B --> C["Worker → External API<br/>send"]
    C --> D["External API → Worker<br/>error"]
    D --> E["Worker → DB<br/>clear claim if marker matches"]
    E --> F["Worker → DB<br/>last error = stage + message"]
    F --> G["Worker → Queue<br/>return error, retry later"]
    G --> H["Queue → Worker<br/>retry"]
    H --> I["Worker → DB<br/>claim"]
    I --> J["Worker → External API<br/>send"]
    J --> K["External API → Worker<br/>ok + external ref"]
    K --> L["Worker → DB<br/>save ref, clear last error"]`,
  },
]
