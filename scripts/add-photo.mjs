#!/usr/bin/env node
/**
 * Add any new Product Photo (local file OR remote URL) directly to `public/data/photos.json`.
 * Automatically displays in Product Photography on the homepage AND in the dedicated Gallery Page!
 *
 * Usage:
 *   npm run add-photo -- /path/to/photo.jpg "Abib" "PDRN Serum Flatlay" "https://www.instagram.com/ugcbypujatamang/p/SHORTCODE/"
 *   npm run add-photo -- https://example.com/product.jpg "Arencia" "Mochi Cleanser Still"
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const PHOTOS_PATH = path.join(ROOT, 'public', 'data', 'photos.json')
const PHOTOS_DIR = path.join(ROOT, 'public', 'images', 'puja', 'photos')

fs.mkdirSync(path.dirname(PHOTOS_PATH), { recursive: true })
fs.mkdirSync(PHOTOS_DIR, { recursive: true })

const [source, brand = 'Skincare & Beauty', title = 'Product Photography Still', permalink = 'https://www.instagram.com/ugcbypujatamang/'] = process.argv.slice(2)

if (!source) {
  console.error('Usage: npm run add-photo -- <local-image-or-url> "<Brand>" "<Title>" [instagram-url]')
  process.exit(1)
}

async function run() {
  const slug = `${brand}-${Date.now()}`.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  let imagePath

  if (/^https?:\/\//i.test(source)) {
    const res = await fetch(source, { headers: { 'User-Agent': 'Mozilla/5.0' } })
    if (!res.ok) throw new Error(`Failed to download image: HTTP ${res.status}`)
    const ct = (res.headers.get('content-type') || '').toLowerCase()
    const ext = ct.includes('png') ? 'png' : ct.includes('webp') ? 'webp' : 'jpg'
    const fname = `${slug}.${ext}`
    fs.writeFileSync(path.join(PHOTOS_DIR, fname), Buffer.from(await res.arrayBuffer()))
    imagePath = `/images/puja/photos/${fname}`
  } else {
    const abs = path.resolve(source)
    if (!fs.existsSync(abs)) {
      console.error(`File not found: ${abs}`)
      process.exit(1)
    }
    const ext = path.extname(abs) || '.jpg'
    const fname = `${slug}${ext}`
    fs.copyFileSync(abs, path.join(PHOTOS_DIR, fname))
    imagePath = `/images/puja/photos/${fname}`
  }

  const shortcode = permalink.match(/\/(?:p|reel)\/([A-Za-z0-9_-]+)/)?.[1] || ''
  const entry = {
    id: `photo-${slug}`,
    image: imagePath,
    brand,
    title,
    permalink,
    shortcode,
  }

  const existing = fs.existsSync(PHOTOS_PATH)
    ? JSON.parse(fs.readFileSync(PHOTOS_PATH, 'utf8')).photos || []
    : []

  const payload = {
    lastSyncedAt: new Date().toISOString(),
    totalPhotos: existing.length + 1,
    photos: [entry, ...existing],
  }
  fs.writeFileSync(PHOTOS_PATH, JSON.stringify(payload, null, 2) + '\n')
  console.log(`Added [${brand}] "${title}" -> ${imagePath} (total: ${payload.totalPhotos} photos)`)
}

run()

