import { OgImage, ogAlt, ogSize } from "@/lib/og-card"

export const alt = ogAlt
export const size = ogSize
export const contentType = "image/png"

export default function Image() {
  return OgImage()
}
