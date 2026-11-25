#!/usr/bin/env node
/**
 * Instant Zero-Token Video Adder (uses official TikTok oEmbed API or IG permalink)
 * Usage:
 *   npm run add-video -- https://www.tiktok.com/@pooza946/video/7701376076282465543
 *   npm run add-video -- https://www.instagram.com/ugcbypujatamang/reel/Df-Ru8xyfvH/ abib
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const DATA_PATH = path.join(ROOT, 'public', 'data', 'videos.json')
const IMG_DIR = path.join(ROOT, 'public', 'images', 'puja')

const inputUrl = process.argv[2]
const manualBrandId = process.argv[3]

if (!inputUrl) {
  console.error('Usage: npm run add-video -- <tiktok-or-instagram-url> [optional-brand-id]')
  process.exit(1)
}

const BRAND_MAP = {
  arencia: { name: 'Arencia', wordmark: 'ARENCIA', logoSrc: '/images/brands/arencia.png', bg: '#FAF7F2', text: '#11100F', re: /arencia/i },
  abib: { name: 'Abib', wordmark: 'Abib', logoSrc: '/images/brands/abib.png', bg: '#FFFFFF', text: '#11100F', re: /abib/i },
  'axis-y': { name: 'AXIS-Y', wordmark: 'AXIS-Y', logoSrc: '/images/brands/axis-y.png', bg: '#FAF6EB', text: '#11100F', re: /axis[-\s]?y/i },
  'seoul-1988': { name: 'SEOUL 1988', wordmark: 'SEOUL 1988', logoSrc: '/images/brands/seoul-1988.png', bg: '#FFFFFF', text: '#11100F', re: /seoul\s*1988|k[-\s]?secret/i },
  tage: { name: 'Tage', wordmark: 'Tage', logoSrc: '/images/brands/tage.jpg', bg: '#FFFFFF', text: '#E55A1B', re: /\btage\b/i },
  isntree: { name: 'Isntree', wordmark: 'Isntree', logoSrc: '/images/brands/isntree.png', bg: '#F7FAF6', text: '#11100F', re: /isntree/i },
  firmoo: { name: 'Firmoo', wordmark: 'FIRMOO', logoSrc: '/images/brands/firmoo.svg', bg: '#FFFFFF', text: '#11100F', re: /firmoo/i },
  clio: { name: 'CLIO', wordmark: 'CLIO', logoSrc: '/images/brands/clio.jpg', bg: '#FFFFFF', text: '#11100F', re: /\bclio\b/i },
  meditherapy: { name: 'Meditherapy', wordmark: 'Meditherapy', logoSrc: '/images/brands/meditherapy.png', bg: '#FFFFFF', text: '#11100F', re: /meditherapy/i },
  'fg-beauty': { name: 'FG Beauty', wordmark: 'FG Beauty', logoSrc: '/images/brands/fg-beauty.png', bg: '#181716', text: '#8ED1D4', re: /fg\s*beauty/i },
  medicube: { name: 'Medicube', wordmark: 'Medicube', logoSrc: '/images/brands/medicube.svg', bg: '#FFFFFF', text: '#11100F', re: /medicube|aprilskin/i },
  lorealistar: { name: "L'Oréalista", wordmark: 'lorealistar', logoSrc: '/images/brands/lorealistar.svg', bg: '#11100F', text: '#FFFFFF', re: /lorealistar|lor[eé]al|maybelline|garnier/i },
  caraseoul: { name: 'Caraseoul', wordmark: 'Caraseoul', logoSrc: '/images/brands/caraseoul.png', bg: '#233B2A', text: '#FFFFFF', re: /caraseoul/i },
  ilso: { name: 'ilso', wordmark: 'ilso', logoSrc: '/images/brands/ilso.svg', bg: '#FFFFFF', text: '#0047BB', re: /\bilso\b/i },
  rijeseo: { name: 'RIJE:SEO', wordmark: 'RIJE:SEO', logoSrc: '/images/brands/rijeseo.png', bg: '#FFFFFF', text: '#11100F', re: /rije\s*:?\s*seo/i },
  'calli-gift': { name: 'Calli Gift', wordmark: 'Calli Gift', bg: '#F6ECE4', text: '#3B281E', re: /calli[e]?\s*gift/i },
  celimax: { name: 'Celimax', wordmark: 'celimax', logoSrc: '/images/brands/celimax.png', bg: '#FFFFFF', text: '#11100F', re: /celimax/i },
  stylevana: { name: 'Stylevana', wordmark: 'STYLEVANA', bg: '#161515', text: '#F5D6C6', re: /stylevana/i },
  oulac: { name: 'OULAC Cosmetics', wordmark: 'Oulac', logoSrc: '/images/brands/oulac.png', bg: '#FFF6FA', text: '#D62F7F', re: /oulac/i },
  'dr-melaxin': { name: 'Dr. Melaxin', wordmark: 'Dr. Melaxin', logoSrc: '/images/brands/dr-melaxin-us.png', bg: '#FFFFFF', text: '#11100F', re: /melaxin/i },
}

async function run() {
  const isTikTok = inputUrl.includes('tiktok.com')
  let caption = ''
  let remoteThumb = ''
  let tiktokId
  let shortcode

  if (isTikTok) {
    tiktokId = inputUrl.match(/\/video\/(\d+)/)?.[1]
    const res = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(inputUrl)}`)
    if (res.ok) {
      const meta = await res.json()
      caption = meta.title || ''
      remoteThumb = meta.thumbnail_url || ''
      if (!tiktokId && meta.embed_product_id) tiktokId = String(meta.embed_product_id)
    }
  } else {
    shortcode = inputUrl.match(/\/(?:reel|p)\/([A-Za-z0-9_-]+)/)?.[1]
  }

  const brandId =
    manualBrandId ||
    Object.entries(BRAND_MAP).find(([, b]) => b.re.test(caption))?.[0]

  if (!brandId || !BRAND_MAP[brandId]) {
    console.error('Could not auto-detect brand from caption. Pass brandId as 2nd argument (e.g. abib, celimax, medicube).')
    process.exit(1)
  }

  const brand = BRAND_MAP[brandId]
  let coverImage = '/images/puja/portrait-robe-clean.jpg'

  if (remoteThumb) {
    const r = await fetch(remoteThumb)
    if (r.ok) {
      const ct = (r.headers.get('content-type') || '').toLowerCase()
      const ext = ct.includes('avif') ? 'avif' : ct.includes('webp') ? 'webp' : 'jpg'
      const fname = `added-${isTikTok ? 'tt' : 'ig'}-${tiktokId || shortcode}.${ext}`
      fs.writeFileSync(path.join(IMG_DIR, fname), Buffer.from(await r.arrayBuffer()))
      coverImage = `/images/puja/${fname}`
    }
  }

  const newVideo = {
    id: `${isTikTok ? 'tt' : 'ig'}-${tiktokId || shortcode}`,
    brandId,
    platform: isTikTok ? 'tiktok' : 'instagram',
    ...(tiktokId ? { tiktokId } : {}),
    ...(shortcode ? { shortcode } : {}),
    permalink: inputUrl,
    brand: brand.name,
    badgeLabel: brand.wordmark,
    ...(brand.logoSrc ? { badgeLogoSrc: brand.logoSrc } : {}),
    badgeBg: brand.bg,
    badgeText: brand.text,
    title: caption ? caption.replace(/[#@][\w._-]+/g, '').trim().slice(0, 56) : `${brand.name} Featured UGC`,
    caption: caption || `${brand.name} UGC collaboration by Puja Tamang`,
    formatTag: 'Brand UGC',
    coverImage,
    category: 'Skincare',
  }

  const existing = fs.existsSync(DATA_PATH)
    ? JSON.parse(fs.readFileSync(DATA_PATH, 'utf8')).videos || []
    : []

  const filtered = existing.filter((v) => v.id !== newVideo.id)
  const payload = {
    lastSyncedAt: new Date().toISOString(),
    totalVideos: filtered.length + 1,
    videos: [newVideo, ...filtered],
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(payload, null, 2) + '\n')
  console.log(`Added [${brand.name}] ${newVideo.title} -> ${DATA_PATH}`)
}

run()

