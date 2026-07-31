import { ImageResponse } from "next/og"

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

/**
 * Modern personal-portfolio OG: dark canvas, type hierarchy, muted neutrals.
 * Font: Plus Jakarta Sans — contemporary professional sans (not default system).
 */
export default async function Image() {
  const [fontMedium, fontBold] = await Promise.all([
    loadGoogleFont("Plus Jakarta Sans", 500),
    loadGoogleFont("Plus Jakarta Sans", 700),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          fontFamily: '"Plus Jakarta Sans"',
          background:
            "linear-gradient(145deg, #09090b 0%, #18181b 55%, #0c0c0e 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-120px",
            top: "-160px",
            width: "520px",
            height: "520px",
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
            padding: "72px 80px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: "20px",
              fontWeight: 500,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
            }}
          >
            Portfolio
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              maxWidth: "920px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "84px",
                fontWeight: 700,
                letterSpacing: "-0.045em",
                lineHeight: 1.05,
                color: "#fafafa",
              }}
            >
              Nicholas Chong
            </div>

            <div
              style={{
                display: "flex",
                fontSize: "30px",
                fontWeight: 500,
                letterSpacing: "-0.01em",
                color: "#a1a1aa",
                lineHeight: 1.35,
              }}
            >
              Full-Stack Developer & Product Engineer
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: "28px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: "20px",
                fontWeight: 500,
                color: "#71717a",
              }}
            >
              Systems · Requirements · Delivery
            </div>
            <div
              style={{
                display: "flex",
                fontSize: "20px",
                fontWeight: 500,
                color: "#a1a1aa",
              }}
            >
              Nic
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Plus Jakarta Sans",
          data: fontMedium,
          style: "normal",
          weight: 500,
        },
        {
          name: "Plus Jakarta Sans",
          data: fontBold,
          style: "normal",
          weight: 700,
        },
      ],
    },
  )
}
