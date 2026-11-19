import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { ImageResponse } from "next/og"
import { ACCENT, INK, MUTE, PAPER } from "@/lib/theme"

export const ogSize = { width: 1200, height: 630 }
export const ogAlt = "Nicholas Chong — Full-Stack Developer & Product Engineer"

async function font(file: string) {
  return readFile(join(process.cwd(), "src/lib/fonts", file))
}

/** Vector NC tile, with the accent filled in from the same constant as the icons. */
async function markSrc() {
  const template = await readFile(
    join(process.cwd(), "scripts/icon-templates/favicon.svg"),
    "utf8",
  )
  const painted = template.replaceAll("__ACCENT__", ACCENT)
  const hi = painted.match(/<g class="hi">[\s\S]*?<\/g>/)?.[0]
  if (!hi) throw new Error("NC ligature template is missing the vector mark")
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">${hi}</svg>`
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`
}

/** Share card painted from the accent constant. */
export async function OgImage() {
  const [archivo, plex, plexMedium, mark] = await Promise.all([
    font("Archivo-Black.ttf"),
    font("IBMPlexMono-Regular.ttf"),
    font("IBMPlexMono-Medium.ttf"),
    markSrc(),
  ])
  const grid = "rgba(237,234,226,0.06)"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: INK,
          backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          color: PAPER,
          padding: "48px 72px 44px",
        }}
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="" src={mark} width={78} height={78} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 28 }}>
          <div style={{ display: "flex", fontFamily: "Plex", fontSize: 28, color: MUTE }}>
            Hi, I&apos;m
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", marginTop: 6 }}>
            <div
              style={{
                display: "flex",
                fontFamily: "Archivo",
                fontSize: 148,
                lineHeight: 0.86,
                letterSpacing: -4,
                color: PAPER,
              }}
            >
              Nicholas
            </div>
            <div
              style={{
                width: 26,
                height: 26,
                backgroundColor: ACCENT,
                marginLeft: 12,
                marginBottom: 18,
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", marginTop: 28 }}>
            <div
              style={{
                display: "flex",
                backgroundColor: ACCENT,
                color: INK,
                fontFamily: "Plex Medium",
                fontSize: 30,
                lineHeight: 1,
                padding: "10px 14px",
              }}
            >
              understand the rule.
            </div>
            <div
              style={{
                display: "flex",
                marginLeft: 18,
                fontFamily: "Plex",
                fontSize: 30,
                color: MUTE,
              }}
            >
              make it legible. ship and maintain.
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flex: 1 }} />
        <div style={{ display: "flex", fontFamily: "Plex", fontSize: 22, color: MUTE }}>
          Full-Stack Developer & Product Engineer · nicholas-chong.com
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Archivo", data: archivo, weight: 900, style: "normal" },
        { name: "Plex", data: plex, weight: 400, style: "normal" },
        { name: "Plex Medium", data: plexMedium, weight: 500, style: "normal" },
      ],
    },
  )
}
