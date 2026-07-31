type JsonLdNode = Record<string, unknown>

export function PageJsonLd({
  data,
}: {
  data: JsonLdNode | JsonLdNode[]
}) {
  const graph = Array.isArray(data) ? data : [data]

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": graph,
        }),
      }}
    />
  )
}
