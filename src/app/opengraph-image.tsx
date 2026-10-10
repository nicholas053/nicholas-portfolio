import { ImageResponse } from "next/og"
import { HERO } from "@/content/content"
import { THEME } from "@/lib/theme-colors"

export const runtime = "edge"

export const alt = "Nicholas Chong — Full-Stack Developer & Product Engineer"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

/** Load a Google Font as TTF/OTF for Satori (woff2 is not supported). */
async function loadGoogleFont(family: string, weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`,
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0",
      },
    },
  ).then((res) => res.text())

  const fontUrl = css.match(/src: url\(([^)]+)\)/)?.[1]
  if (!fontUrl) {
    throw new Error(`Could not resolve font URL for ${family} ${weight}`)
  }

  return fetch(fontUrl).then((res) => res.arrayBuffer())
}

/** Share card in the same dark palette and type as the home hero. */
export default async function Image() {
  const [sansRegular, sansSemibold, mono] = await Promise.all([
    loadGoogleFont("IBM Plex Sans", 400),
    loadGoogleFont("IBM Plex Sans", 600),
    loadGoogleFont("IBM Plex Mono", 400),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          alignItems: "center",
          background: THEME.pageDark,
          fontFamily: '"IBM Plex Sans"',
          padding: "80px 96px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "860px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: '"IBM Plex Mono"',
              fontSize: "22px",
              fontWeight: 400,
              letterSpacing: "0.04em",
              color: THEME.accentDark,
            }}
          >
            {HERO.roleLine}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "20px",
              fontSize: "84px",
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: THEME.inkDark,
            }}
          >
            {HERO.greeting}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "28px",
              maxWidth: "760px",
              fontSize: "28px",
              fontWeight: 400,
              lineHeight: 1.45,
              color: THEME.mutedDark,
            }}
          >
            {HERO.lead}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "IBM Plex Sans",
          data: sansRegular,
          style: "normal",
          weight: 400,
        },
        {
          name: "IBM Plex Sans",
          data: sansSemibold,
          style: "normal",
          weight: 600,
        },
        {
          name: "IBM Plex Mono",
          data: mono,
          style: "normal",
          weight: 400,
        },
      ],
    },
  )
}
