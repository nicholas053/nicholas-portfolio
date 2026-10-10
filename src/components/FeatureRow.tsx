interface FeatureRowProps {
  title: string
  description: string
  videoSrc?: string
  reverse?: boolean
}

export default function FeatureRow({ title, description, videoSrc, reverse }: FeatureRowProps) {
  const copy = (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight text-navy">{title}</h2>
      <p className="leading-relaxed text-muted-foreground">{description}</p>
    </div>
  )

  if (!videoSrc) {
    return <section>{copy}</section>
  }

  return (
    <section className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
      <div className={reverse ? "lg:order-2" : undefined}>{copy}</div>
      <video
        className={`w-full rounded-md border border-border ${reverse ? "lg:order-1" : ""}`}
        src={videoSrc}
        autoPlay
        muted
        loop
        playsInline
        controls
        aria-label={`${title} demo video`}
      />
    </section>
  )
}
