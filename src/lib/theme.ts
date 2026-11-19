/**
 * Site accent. This is the only hex for the brand colour.
 *
 * Change `ACCENT` and redeploy:
 * - the CSS token `--trace` reads `--accent`, which the root layout sets from this constant
 * - `next/og` paints the Open Graph and Twitter cards with it
 * - `npm run build` runs `prebuild`, which rewrites the favicon SVG, PNG, and ICO files
 */
export const ACCENT = "#A9D18E"

/** Page background. Icons and the share card use the same ink. */
export const INK = "#0E1116"

/** Primary text on the dark background. */
export const PAPER = "#EDEAE2"

/** Secondary text on the share card. */
export const MUTE = "#8A94A0"
