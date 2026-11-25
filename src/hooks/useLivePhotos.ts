import { useEffect, useState } from 'react'
import { EDITORIAL_STILLS, type StillPhoto } from '../data/portfolio'
import { buildCleanTitle, detectBrandFromCaption } from '../utils/brandClassifier'

interface PhotosFeedPayload {
  lastSyncedAt?: string
  photos?: StillPhoto[]
  posts?: RawPhotoPost[]
  data?: RawPhotoPost[]
}

interface RawPhotoPost {
  id?: string
  permalink?: string
  mediaUrl?: string
  media_url?: string
  mediaType?: string
  media_type?: string
  caption?: string
  children?: Array<{ id?: string; mediaUrl?: string; media_url?: string; mediaType?: string; media_type?: string }>
}

function normalizePhotoPosts(rawList: RawPhotoPost[]): StillPhoto[] {
  const results: StillPhoto[] = []

  for (const post of rawList) {
    const type = (post.mediaType || post.media_type || '').toUpperCase()
    const permalink = post.permalink || ''
    if (!permalink || type === 'VIDEO') continue

    const caption = post.caption || ''
    const matchedBrand = detectBrandFromCaption(caption)
    const brandName = matchedBrand?.name || 'Skincare & Beauty'
    const shortcode = permalink.match(/\/p\/([A-Za-z0-9_-]+)/)?.[1] || ''
    const title = buildCleanTitle(brandName, caption)

    if (type === 'CAROUSEL_ALBUM' && Array.isArray(post.children) && post.children.length > 0) {
      post.children.forEach((child, idx) => {
        const cType = (child.mediaType || child.media_type || 'IMAGE').toUpperCase()
        const cUrl = child.mediaUrl || child.media_url
        if (cType === 'IMAGE' && cUrl) {
          results.push({
            id: `live-photo-${child.id || `${shortcode}-${idx + 1}`}`,
            image: cUrl,
            brand: brandName,
            title: post.children!.length > 1 ? `${title} (${idx + 1})` : title,
            permalink,
            shortcode,
          })
        }
      })
    } else {
      const url = post.mediaUrl || post.media_url
      if (url) {
        results.push({
          id: `live-photo-${post.id || shortcode}`,
          image: url,
          brand: brandName,
          title,
          permalink,
          shortcode,
        })
      }
    }
  }
  return results
}

function mergeUniquePhotos(incoming: StillPhoto[], baseline: StillPhoto[]): StillPhoto[] {
  const seen = new Set<string>()
  const merged: StillPhoto[] = []

  for (const photo of [...incoming, ...baseline]) {
    const key = photo.id || `${photo.shortcode}:${photo.image}`
    if (seen.has(key)) continue
    seen.add(key)
    merged.push(photo)
  }
  return merged
}

/**
 * Loads Product Photography dynamically from:
 *  1. `/data/photos.json` (auto-updated by `npm run sync:social` / GitHub Actions cron / `npm run add-photo`)
 *  2. Optional real-time `VITE_LIVE_FEED_URL` (e.g. Behold.so Instagram JSON feed)
 * Falls back immediately to bundled `EDITORIAL_STILLS` with zero flicker.
 */
export function useLivePhotos() {
  const [photos, setPhotos] = useState<StillPhoto[]>(EDITORIAL_STILLS)
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function hydratePhotos() {
      let dynamicPhotos: StillPhoto[] = []

      // 1. Load synced local JSON feed
      try {
        const res = await fetch('/data/photos.json', { cache: 'no-cache' })
        if (res.ok) {
          const json: PhotosFeedPayload = await res.json()
          if (Array.isArray(json.photos) && json.photos.length > 0) {
            dynamicPhotos = mergeUniquePhotos(json.photos, dynamicPhotos)
          }
          if (!cancelled && json.lastSyncedAt) {
            setLastSyncedAt(json.lastSyncedAt)
          }
        }
      } catch {
        // Keep bundled fallback
      }

      // 2. Optional live external feed URL (Behold.so / custom endpoint)
      const liveFeedUrl = import.meta.env.VITE_LIVE_FEED_URL as string | undefined
      if (liveFeedUrl) {
        try {
          const res = await fetch(liveFeedUrl)
          if (res.ok) {
            const payload: PhotosFeedPayload | RawPhotoPost[] = await res.json()
            const rawList = Array.isArray(payload)
              ? payload
              : payload.posts || payload.data || []
            const parsed = normalizePhotoPosts(rawList)
            if (parsed.length > 0) {
              dynamicPhotos = mergeUniquePhotos(parsed, dynamicPhotos)
            }
          }
        } catch {
          // Non-fatal
        }
      }

      if (!cancelled && dynamicPhotos.length > 0) {
        setPhotos(mergeUniquePhotos(dynamicPhotos, EDITORIAL_STILLS))
      }
    }

    hydratePhotos()
    return () => {
      cancelled = true
    }
  }, [])

  return { photos, lastSyncedAt }
}

