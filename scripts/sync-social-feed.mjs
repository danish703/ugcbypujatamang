#!/usr/bin/env node
/**
 * ============================================================================
 * PUJA TAMANG PORTFOLIO — AUTOMATED INSTAGRAM & TIKTOK SYNC SCRIPT
 * ============================================================================
 * Syncs newly posted brand videos from:
 *  1. Official Meta Instagram Graph API  (IG_ACCESS_TOKEN + IG_USER_ID)
 *  2. Official TikTok Display API v2     (TIKTOK_ACCESS_TOKEN)
 *  3. Optional JSON Feed URL (Behold.so) (SOCIAL_FEED_JSON_URL)
 *
 * Downloads thumbnails locally into `public/images/puja/` so signed CDN links
 * never expire, auto-categorizes every post to the right brand partner, and
 * writes `public/data/videos.json` without duplicating existing videos.
 *
 * Run manually:  npm run sync:social
 * Runs automatically via GitHub Actions every 6 hours (.github/workflows/sync-social.yml)
 */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const DATA_PATH = path.join(ROOT, 'public', 'data', 'videos.json')
const PHOTOS_DATA_PATH = path.join(ROOT, 'public', 'data', 'photos.json')
const IMG_DIR = path.join(ROOT, 'public', 'images', 'puja')
const PHOTOS_IMG_DIR = path.join(IMG_DIR, 'photos')

fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true })
fs.mkdirSync(IMG_DIR, { recursive: true })
fs.mkdirSync(PHOTOS_IMG_DIR, { recursive: true })

const BRANDS = [
  { id: 'arencia', name: 'Arencia', wordmark: 'ARENCIA', logoSrc: '/images/brands/arencia.png', bg: '#FAF7F2', text: '#11100F', patterns: [/\barencia\b/i, /#arencia/i] },
  { id: 'abib', name: 'Abib', wordmark: 'Abib', logoSrc: '/images/brands/abib.png', bg: '#FFFFFF', text: '#11100F', patterns: [/\babib\b/i, /#abib/i, /#glowwithabib/i, /#joinmonthlyabib/i] },
  { id: 'axis-y', name: 'AXIS-Y', wordmark: 'AXIS-Y', logoSrc: '/images/brands/axis-y.png', bg: '#FAF6EB', text: '#11100F', patterns: [/\baxis[-\s]?y\b/i, /#axisy/i] },
  { id: 'seoul-1988', name: 'SEOUL 1988', wordmark: 'SEOUL 1988', logoSrc: '/images/brands/seoul-1988.png', bg: '#FFFFFF', text: '#11100F', patterns: [/seoul\s*1988/i, /\bk[-\s]?secret\b/i, /#ksecret/i] },
  { id: 'tage', name: 'Tage', wordmark: 'Tage', logoSrc: '/images/brands/tage.jpg', bg: '#FFFFFF', text: '#E55A1B', patterns: [/\btage\b/i, /#tage/i] },
  { id: 'isntree', name: 'Isntree', wordmark: 'Isntree', logoSrc: '/images/brands/isntree.png', bg: '#F7FAF6', text: '#11100F', patterns: [/\bisntree\b/i, /#isntree/i] },
  { id: 'firmoo', name: 'Firmoo', wordmark: 'FIRMOO', logoSrc: '/images/brands/firmoo.svg', bg: '#FFFFFF', text: '#11100F', patterns: [/\bfirmoo\b/i, /#firmoo/i, /aqrc50/i] },
  { id: 'clio', name: 'CLIO', wordmark: 'CLIO', logoSrc: '/images/brands/clio.jpg', bg: '#FFFFFF', text: '#11100F', patterns: [/\bclio\b/i, /#clio/i] },
  { id: 'meditherapy', name: 'Meditherapy', wordmark: 'Meditherapy', logoSrc: '/images/brands/meditherapy.png', bg: '#FFFFFF', text: '#11100F', patterns: [/\bmeditherapy\b/i, /#meditherapy/i] },
  { id: 'fg-beauty', name: 'FG Beauty', wordmark: 'FG Beauty', logoSrc: '/images/brands/fg-beauty.png', bg: '#181716', text: '#8ED1D4', patterns: [/\bfg\s*beauty\b/i, /#fgbeauty/i] },
  { id: 'medicube', name: 'Medicube', wordmark: 'Medicube', logoSrc: '/images/brands/medicube.svg', bg: '#FFFFFF', text: '#11100F', patterns: [/\bmedicube\b/i, /#medicube/i, /aprilskin/i] },
  { id: 'lorealistar', name: "L'Oréalista", wordmark: 'lorealistar', logoSrc: '/images/brands/lorealistar.svg', bg: '#11100F', text: '#FFFFFF', patterns: [/lorealistar/i, /lor[eé]al/i, /\bmaybelline\b/i, /\bgarnier\b/i] },
  { id: 'caraseoul', name: 'Caraseoul', wordmark: 'Caraseoul', logoSrc: '/images/brands/caraseoul.png', bg: '#233B2A', text: '#FFFFFF', patterns: [/\bcaraseoul\b/i, /#caraseoul/i] },
  { id: 'ilso', name: 'ilso', wordmark: 'ilso', logoSrc: '/images/brands/ilso.svg', bg: '#FFFFFF', text: '#0047BB', patterns: [/\bilso\b/i, /#ilso/i] },
  { id: 'rijeseo', name: 'RIJE:SEO', wordmark: 'RIJE:SEO', logoSrc: '/images/brands/rijeseo.png', bg: '#FFFFFF', text: '#11100F', patterns: [/rije\s*:?\s*seo/i, /#rijeseo/i] },
  { id: 'calli-gift', name: 'Calli Gift', wordmark: 'Calli Gift', bg: '#F6ECE4', text: '#3B281E', patterns: [/calli[e]?\s*gift/i, /#calliegifts/i, /wishs478/i] },
  { id: 'celimax', name: 'Celimax', wordmark: 'celimax', logoSrc: '/images/brands/celimax.png', bg: '#FFFFFF', text: '#11100F', patterns: [/\bcelimax\b/i, /#celimax/i] },
  { id: 'stylevana', name: 'Stylevana', wordmark: 'STYLEVANA', bg: '#161515', text: '#F5D6C6', patterns: [/\bstylevana\b/i, /#stylevana/i, /inf10pzafn/i] },
  { id: 'oulac', name: 'OULAC Cosmetics', wordmark: 'Oulac', logoSrc: '/images/brands/oulac.png', bg: '#FFF6FA', text: '#D62F7F', patterns: [/\boulac\b/i, /#oulac/i] },
  { id: 'dr-melaxin', name: 'Dr. Melaxin', wordmark: 'Dr. Melaxin', logoSrc: '/images/brands/dr-melaxin-us.png', bg: '#FFFFFF', text: '#11100F', patterns: [/dr\.?\s*melaxin/i, /\bmelaxin\b/i] },
]

function detectBrand(caption = '') {
  return BRANDS.find((b) => b.patterns.some((re) => re.test(caption))) || null
}

function cleanTitle(brandName, caption = '') {
  const first = caption
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[#@][\w._-]+/g, '')
    .split(/[\n.!?]/)[0]
    ?.trim()
  return first && first.length >= 10 && first.length <= 58 ? first : `${brandName} Featured UGC`
}

function inferFormat(caption = '') {
  if (/unbox|pr\s*(haul|package|box)/i.test(caption)) return 'PR Unboxing'
  if (/grwm|makeup look/i.test(caption)) return 'GRWM'
  if (/transition|7[\s-]?day/i.test(caption)) return 'Results Demo'
  if (/sunscreen|spf/i.test(caption)) return 'SPF Wear Test'
  if (/lip\s*(tint|stain|combo)/i.test(caption)) return 'Lip Swatch'
  return 'Skincare Demo'
}

async function downloadCoverLocally(remoteUrl, filenameBase, targetDir = IMG_DIR, publicPrefix = '/images/puja') {
  if (!remoteUrl) return null
  try {
    const res = await fetch(remoteUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } })
    if (!res.ok) return null
    const ct = (res.headers.get('content-type') || '').toLowerCase()
    const ext = ct.includes('avif') ? 'avif' : ct.includes('webp') ? 'webp' : ct.includes('png') ? 'png' : 'jpg'
    const fileName = `${filenameBase}.${ext}`
    const buf = Buffer.from(await res.arrayBuffer())
    if (buf.length < 2000) return null
    fs.writeFileSync(path.join(targetDir, fileName), buf)
    return `${publicPrefix}/${fileName}`
  } catch {
    return null
  }
}

async function fetchInstagramGraph() {
  const token = process.env.IG_ACCESS_TOKEN
  const userId = process.env.IG_USER_ID || 'me'
  if (!token) return { videos: [], photos: [] }

  const url = `https://graph.instagram.com/v21.0/${userId}/media?fields=id,caption,media_type,permalink,thumbnail_url,media_url,timestamp,children{id,media_type,media_url}&limit=30&access_token=${encodeURIComponent(token)}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Instagram Graph API HTTP ${res.status}`)
  const { data = [] } = await res.json()

  const videos = []
  const photos = []

  for (const post of data) {
    const caption = post.caption || ''
    const brand = detectBrand(caption)
    const shortcode = String(post.permalink || '').match(/\/(?:reel|p)\/([A-Za-z0-9_-]+)/)?.[1]
    if (!shortcode) continue

    // 1. Reels / Videos
    if (post.media_type === 'VIDEO' || String(post.permalink || '').includes('/reel/')) {
      if (!brand) continue
      const localCover = await downloadCoverLocally(
        post.thumbnail_url || post.media_url,
        `sync-ig-${shortcode}`,
      )
      videos.push({
        id: `ig-${shortcode}`,
        brandId: brand.id,
        platform: 'instagram',
        shortcode,
        permalink: post.permalink,
        brand: brand.name,
        badgeLabel: brand.wordmark,
        badgeLogoSrc: brand.logoSrc,
        badgeBg: brand.bg,
        badgeText: brand.text,
        title: cleanTitle(brand.name, caption),
        caption: caption.trim(),
        formatTag: inferFormat(caption),
        coverImage: localCover || post.thumbnail_url || post.media_url,
        category: 'Skincare',
      })
      continue
    }

    // 2. Single Photo & Carousel Product Photography Posts
    const brandName = brand?.name || 'Skincare & Beauty'
    if (post.media_type === 'CAROUSEL_ALBUM' && Array.isArray(post.children?.data)) {
      let slideIndex = 0
      for (const child of post.children.data) {
        if (child.media_type !== 'IMAGE' || !child.media_url) continue
        slideIndex += 1
        const localPhoto = await downloadCoverLocally(
          child.media_url,
          `sync-photo-${shortcode}-${slideIndex}`,
          PHOTOS_IMG_DIR,
          '/images/puja/photos',
        )
        photos.push({
          id: `photo-${shortcode}-${slideIndex}`,
          image: localPhoto || child.media_url,
          brand: brandName,
          title: cleanTitle(brandName, caption),
          permalink: post.permalink,
          shortcode,
        })
      }
    } else if (post.media_type === 'IMAGE' && post.media_url) {
      const localPhoto = await downloadCoverLocally(
        post.media_url,
        `sync-photo-${shortcode}`,
        PHOTOS_IMG_DIR,
        '/images/puja/photos',
      )
      photos.push({
        id: `photo-${shortcode}`,
        image: localPhoto || post.media_url,
        brand: brandName,
        title: cleanTitle(brandName, caption),
        permalink: post.permalink,
        shortcode,
      })
    }
  }
  return { videos, photos }
}

async function fetchTikTokApi() {
  const token = process.env.TIKTOK_ACCESS_TOKEN
  if (!token) return []

  const res = await fetch(
    'https://open.tiktokapis.com/v2/video/list/?fields=id,title,video_description,cover_image_url,share_url,create_time',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ max_count: 20 }),
    },
  )
  if (!res.ok) throw new Error(`TikTok Display API HTTP ${res.status}`)
  const payload = await res.json()
  const list = payload?.data?.videos || []

  const items = []
  for (const v of list) {
    const caption = v.video_description || v.title || ''
    const brand = detectBrand(caption)
    if (!brand || !v.id) continue

    const localCover = await downloadCoverLocally(v.cover_image_url, `sync-tt-${v.id}`)
    items.push({
      id: `tt-${v.id}`,
      brandId: brand.id,
      platform: 'tiktok',
      tiktokId: String(v.id),
      permalink: v.share_url || `https://www.tiktok.com/@pooza946/video/${v.id}`,
      brand: brand.name,
      badgeLabel: brand.wordmark,
      badgeLogoSrc: brand.logoSrc,
      badgeBg: brand.bg,
      badgeText: brand.text,
      title: cleanTitle(brand.name, caption),
      caption: caption.trim(),
      formatTag: inferFormat(caption),
      coverImage: localCover || v.cover_image_url,
      category: 'Skincare',
    })
  }
  return items
}

async function fetchExternalJsonFeed() {
  const feedUrl = process.env.SOCIAL_FEED_JSON_URL
  if (!feedUrl) return []
  const res = await fetch(feedUrl)
  if (!res.ok) throw new Error(`External feed HTTP ${res.status}`)
  const payload = await res.json()
  const rawList = Array.isArray(payload) ? payload : payload.posts || payload.data || []

  const items = []
  for (const raw of rawList) {
    const permalink = raw.permalink || raw.share_url || ''
    const caption = raw.caption || raw.video_description || raw.title || ''
    const brand = detectBrand(caption)
    if (!brand || !permalink) continue
    const isTikTok = permalink.includes('tiktok.com')
    const shortcode = isTikTok ? undefined : permalink.match(/\/(?:reel|p)\/([A-Za-z0-9_-]+)/)?.[1]
    const tiktokId = isTikTok ? permalink.match(/\/video\/(\d+)/)?.[1] : undefined
    if (!shortcode && !tiktokId) continue

    const remoteThumb = raw.thumbnailUrl || raw.thumbnail_url || raw.cover_image_url || raw.mediaUrl
    const localCover = await downloadCoverLocally(
      remoteThumb,
      `sync-${isTikTok ? 'tt' : 'ig'}-${tiktokId || shortcode}`,
    )
    items.push({
      id: `${isTikTok ? 'tt' : 'ig'}-${tiktokId || shortcode}`,
      brandId: brand.id,
      platform: isTikTok ? 'tiktok' : 'instagram',
      shortcode,
      tiktokId,
      permalink,
      brand: brand.name,
      badgeLabel: brand.wordmark,
      badgeLogoSrc: brand.logoSrc,
      badgeBg: brand.bg,
      badgeText: brand.text,
      title: cleanTitle(brand.name, caption),
      caption: caption.trim(),
      formatTag: inferFormat(caption),
      coverImage: localCover || remoteThumb,
      category: 'Skincare',
    })
  }
  return items
}

async function main() {
  const existing = fs.existsSync(DATA_PATH)
    ? JSON.parse(fs.readFileSync(DATA_PATH, 'utf8')).videos || []
    : []
  const existingPhotos = fs.existsSync(PHOTOS_DATA_PATH)
    ? JSON.parse(fs.readFileSync(PHOTOS_DATA_PATH, 'utf8')).photos || []
    : []

  const incoming = []
  const incomingPhotos = []
  try {
    const ig = await fetchInstagramGraph()
    console.log(`Instagram Graph API: ${ig.videos.length} brand reels, ${ig.photos.length} product photos found`)
    incoming.push(...ig.videos)
    incomingPhotos.push(...ig.photos)
  } catch (err) {
    console.warn('Instagram sync skipped/warning:', err.message)
  }

  try {
    const tt = await fetchTikTokApi()
    console.log(`TikTok Display API: ${tt.length} brand videos found`)
    incoming.push(...tt)
  } catch (err) {
    console.warn('TikTok sync skipped/warning:', err.message)
  }

  try {
    const ext = await fetchExternalJsonFeed()
    console.log(`External JSON Feed: ${ext.length} brand videos found`)
    incoming.push(...ext)
  } catch (err) {
    console.warn('External feed skipped/warning:', err.message)
  }

  const seen = new Set()
  const merged = []
  const keyOf = (v) => (v.platform === 'tiktok' ? `tt:${v.tiktokId || v.id}` : `ig:${v.shortcode || v.id}`)

  for (const v of [...incoming, ...existing]) {
    const k = keyOf(v)
    if (seen.has(k)) continue
    seen.add(k)
    merged.push(v)
  }

  const addedCount = merged.length - existing.length
  const output = {
    lastSyncedAt: new Date().toISOString(),
    totalVideos: merged.length,
    videos: merged,
  }
  fs.writeFileSync(DATA_PATH, JSON.stringify(output, null, 2) + '\n')
  console.log(`Saved ${DATA_PATH} (${merged.length} total videos, +${Math.max(0, addedCount)} new)`)

  const seenPhotos = new Set()
  const mergedPhotos = []
  for (const p of [...incomingPhotos, ...existingPhotos]) {
    const key = p.id || `${p.shortcode}:${p.image}`
    if (seenPhotos.has(key)) continue
    seenPhotos.add(key)
    mergedPhotos.push(p)
  }
  const addedPhotos = mergedPhotos.length - existingPhotos.length
  fs.writeFileSync(
    PHOTOS_DATA_PATH,
    JSON.stringify(
      { lastSyncedAt: new Date().toISOString(), totalPhotos: mergedPhotos.length, photos: mergedPhotos },
      null,
      2,
    ) + '\n',
  )
  console.log(`Saved ${PHOTOS_DATA_PATH} (${mergedPhotos.length} total photos, +${Math.max(0, addedPhotos)} new)`)
}

main()

