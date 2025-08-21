// components/FeatureRow.tsx
interface FeatureRowProps {
  title: string
  description: string
  videoSrc?: string
  reverse?: boolean
}

export default function FeatureRow({
  title,
  description,
  videoSrc,
  reverse = false
}: FeatureRowProps) {
  return (
    <section
      className={`grid md:grid-cols-2 gap-12 items-center ${
        reverse ? 'md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1' : ''
      }`}
    >
      {/* Always text first on mobile */}
      <div className="space-y-4 order-1 md:order-none">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
      </div>

      {videoSrc ? (
        <video
          className="rounded-2xl shadow-xl w-full order-2 md:order-none"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          controls
          aria-label={`${title} demo video`}
        />
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-700 p-8 text-center text-gray-500 order-2 md:order-none">
          Demo coming soon
        </div>
      )}
    </section>
  )
}
