import { readFileSync } from "node:fs"
import path from "node:path"

export const alt = "Nicholas Chong — Full-Stack Developer & Product Engineer"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

/** Serves the approved NC ligature card (public/og.png) at /opengraph-image. */
export default function Image() {
  const png = readFileSync(path.join(process.cwd(), "public/og.png"))
  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
