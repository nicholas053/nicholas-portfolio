import type { MetadataRoute } from "next"
import { INK } from "@/lib/theme"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nicholas Chong",
    short_name: "Nic Chong",
    description: "Full-Stack Developer & Product Engineer",
    start_url: "/",
    display: "standalone",
    background_color: INK,
    theme_color: INK,
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  }
}
