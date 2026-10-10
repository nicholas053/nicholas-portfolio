import type { MermaidBlock } from "@/components/MermaidStack"

export const thirdPartyApiAdaptersDiagrams: readonly MermaidBlock[] = [
  {
    id: "data-model",
    label: "Data model (illustrative)",
    chart: `erDiagram
    PROVIDER_ACCOUNT ||--o{ OUTBOUND_LOG : records
    PROVIDER_ACCOUNT {
        string code
        string adapter_key
        bytes credentials
    }
    OUTBOUND_LOG {
        string direction
        string endpoint
        int http_status
    }`,
  },
  {
    id: "callback",
    label: "Inbound callback through an adapter",
    chart: `flowchart TD
    A["Third-party API → Callback handler<br/>POST /callbacks/:account"] --> B["Handler → Adapter<br/>parse and verify signature"]
    B --> C["Adapter → Handler<br/>normalised event, final or pending"]
    C --> D["Handler → Core service<br/>ingest; pending means no state change"]
    D --> E["Handler → Third-party API<br/>provider-specific ack"]`,
  },
]
