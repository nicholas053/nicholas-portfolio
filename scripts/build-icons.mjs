/**
 * Rasterise the NC ligature from scripts/icon-templates using ACCENT in src/lib/theme.ts.
 * Run automatically before `next build` (npm prebuild).
 */
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import sharp from "sharp"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")

function token(name) {
  const source = readFileSync(join(root, "src/lib/theme.ts"), "utf8")
  const match = source.match(new RegExp(`export const ${name} = "([^"]+)"`))
  if (!match) throw new Error(`Missing ${name} in src/lib/theme.ts`)
  return match[1]
}

const accent = token("ACCENT")

function svg(name) {
  return readFileSync(join(root, "scripts/icon-templates", name), "utf8").replaceAll(
    "__ACCENT__",
    accent,
  )
}

async function png(markup, size) {
  return sharp(Buffer.from(markup), { density: 384 })
    .resize(size, size)
    .png()
    .toBuffer()
}

function ico(pngs) {
  const header = Buffer.alloc(6)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(pngs.length, 4)
  const entries = Buffer.alloc(16 * pngs.length)
  let offset = 6 + entries.length
  for (let i = 0; i < pngs.length; i++) {
    const { size, buffer } = pngs[i]
    const at = i * 16
    entries.writeUInt8(size >= 256 ? 0 : size, at)
    entries.writeUInt8(size >= 256 ? 0 : size, at + 1)
    entries.writeUInt16LE(1, at + 4)
    entries.writeUInt16LE(32, at + 6)
    entries.writeUInt32LE(buffer.length, at + 8)
    entries.writeUInt32LE(offset, at + 12)
    offset += buffer.length
  }
  return Buffer.concat([header, entries, ...pngs.map((png) => png.buffer)])
}

const staticSvg = svg("favicon.svg")
const animSvg = svg("favicon-anim.svg")
writeFileSync(join(root, "public/favicon.svg"), staticSvg)
writeFileSync(join(root, "public/favicon-anim.svg"), animSvg)

const sizes = [16, 32, 48, 180, 192, 512]
const buffers = new Map()
for (const size of sizes) {
  buffers.set(size, await png(staticSvg, size))
}

writeFileSync(join(root, "public/favicon-16.png"), buffers.get(16))
writeFileSync(join(root, "public/favicon-32.png"), buffers.get(32))
writeFileSync(join(root, "public/favicon-48.png"), buffers.get(48))
writeFileSync(join(root, "public/apple-touch-icon.png"), buffers.get(180))
writeFileSync(join(root, "public/icon-192.png"), buffers.get(192))
writeFileSync(join(root, "public/icon-512.png"), buffers.get(512))
writeFileSync(
  join(root, "public/favicon.ico"),
  ico([
    { size: 16, buffer: buffers.get(16) },
    { size: 32, buffer: buffers.get(32) },
    { size: 48, buffer: buffers.get(48) },
  ]),
)

console.log(`icons rebuilt with accent ${accent}`)
