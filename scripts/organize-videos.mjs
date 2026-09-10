// Sorts the local video archive (public/videos/animated, public/videos/ugc) into one
// subfolder per style, following ANIMATED_SUBS / UGC_SUBS in src/data/portfolio.ts.
// Safe to re-run after re-assigning videos: files are found wherever they currently are.
// Bunny CDN stays flat ({category}/NN.mp4) — this only affects the local copies.
//
//   node scripts/organize-videos.mjs
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(import.meta.dirname, '..')
const source = fs.readFileSync(path.join(root, 'src/data/portfolio.ts'), 'utf8')
const FILE_RE = /^\d{2}(-poster\.webp|\.mp4)$/

function parseSubs(constName) {
  const block = source.match(new RegExp(`const ${constName}[^{]*\\{([\\s\\S]*?)\\n\\}`))?.[1]
  if (!block) throw new Error(`${constName} not found in portfolio.ts`)
  const groups = {}
  for (const m of block.matchAll(/^\s*['"]?(.+?)['"]?\s*:\s*\[([\d,\s]*)\]/gm)) {
    groups[m[1]] = m[2].split(',').map((n) => n.trim()).filter(Boolean).map(Number)
  }
  return groups
}

// macOS folder names can't contain "/"
const folderName = (sub) => sub.replace(/\s*\/\s*/g, ' - ')

for (const [category, groups] of [['animated', parseSubs('ANIMATED_SUBS')], ['ugc', parseSubs('UGC_SUBS')]]) {
  const dir = path.join(root, 'public/videos', category)

  // Where does each NN.mp4 / NN-poster.webp live right now (category root or any subfolder)?
  const current = new Map()
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const folder = entry.isDirectory() ? path.join(dir, entry.name) : dir
    const names = entry.isDirectory() ? fs.readdirSync(folder) : [entry.name]
    for (const name of names) if (FILE_RE.test(name)) current.set(name, path.join(folder, name))
  }

  let moved = 0
  const missing = []
  for (const [sub, numbers] of Object.entries(groups)) {
    const target = path.join(dir, folderName(sub))
    fs.mkdirSync(target, { recursive: true })
    for (const n of numbers) {
      const nn = String(n).padStart(2, '0')
      if (!current.has(`${nn}.mp4`)) missing.push(nn)
      for (const name of [`${nn}.mp4`, `${nn}-poster.webp`]) {
        const from = current.get(name)
        const to = path.join(target, name)
        if (from && from !== to) { fs.renameSync(from, to); moved++ }
      }
    }
  }

  // Drop subfolders left empty (e.g. after renaming a style)
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const folder = path.join(dir, entry.name)
    if (fs.readdirSync(folder).every((f) => f === '.DS_Store')) fs.rmSync(folder, { recursive: true })
  }

  console.log(`${category}: moved ${moved} files into ${Object.keys(groups).length} style folders` +
    (missing.length ? ` — missing locally: ${missing.join(', ')}` : ''))
}
