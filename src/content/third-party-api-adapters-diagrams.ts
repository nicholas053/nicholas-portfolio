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
    chart: `sequenceDiagram
    participant Ext as Third-party API
    participant H as Callback handler
    participant A as Adapter
    participant S as Core service
    Ext->>H: POST /callbacks/:account
    H->>A: parse + verify signature
    A-->>H: normalised event (final or pending)
    H->>S: ingest (pending = no state change)
    H-->>Ext: provider-specific ack`,
  },
]
