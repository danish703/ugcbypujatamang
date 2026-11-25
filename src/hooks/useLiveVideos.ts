import { useEffect, useState } from 'react'
import { ALL_BRAND_REELS, type InstagramReel } from '../data/portfolio'
import {
  buildCleanTitle,
  detectBrandFromCaption,
  inferFormatTag,
} from '../utils/brandClassifier'

interface LiveFeedPayload {
  lastSyncedAt?: string
  videos?: InstagramReel[]
  /** Also supports Behold.so / Meta Graph API `posts` or `data` arrays directly */
  posts?: RawExternalPost[]
  data?: RawExternalPost[]
}

interface RawExternalPost {
  id?: string
  permalink?: string
  mediaUrl?: string
  thumbnailUrl?: string
  thumbnail_url?: string
  media_url?: string
  cover_image_url?: string
  share_url?: string
  caption?: string
  video_description?: string
  title?: string
  mediaType?: string
  media_type?: string
}

function extractInstagramShortcode(permalink = ''): string | undefined {
  const match = permalink.match(/\/(?:reel|p)\/([A-Za-z0-9_-]+)/)
  return match?.[1]
}

function extractTikTokId(url = ''): string | undefined {
  const match = url.match(/\/video\/(\d+)/)
  return match?.[1]
}

function normalizeExternalPost(raw: RawExternalPost): InstagramReel | null {
  const permalink = raw.permalink || raw.share_url || ''
  const caption = raw.caption || raw.video_description || raw.title || ''
  const coverImage =
    raw.thumbnailUrl || raw.thumbnail_url || raw.cover_image_url || raw.mediaUrl || raw.media_url
  if (!permalink || !coverImage) return null

  const brand = detectBrandFromCaption(caption)
  if (!brand) return null

  const isTikTok = permalink.includes('tiktok.com')
  const shortcode = isTikTok ? undefined : extractInstagramShortcode(permalink)
  const tiktokId = isTikTok ? extractTikTokId(permalink) || raw.id : undefined
  if (!shortcode && !tiktokId) return null

  return {
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
    badgeText: brand.textColor,
    title: buildCleanTitle(brand.name, caption),
    caption: caption.trim(),
    formatTag: inferFormatTag(caption),
    coverImage,
    category: 'Skincare',
  }
}

function mergeUniqueVideos(incoming: InstagramReel[], baseline: InstagramReel[]): InstagramReel[] {
  const seen = new Set<string>()
  const merged: InstagramReel[] = []

  const keyFor = (v: InstagramReel) =>
    v.platform === 'tiktok' ? `tt:${v.tiktokId || v.id}` : `ig:${v.shortcode || v.id}`

  for (const item of [...incoming, ...baseline]) {
    const key = keyFor(item)
    if (seen.has(key)) continue
    seen.add(key)
    merged.push(item)
  }
  return merged
}

/**
 * Loads videos dynamically from:
 *  1. `/data/videos.json` (auto-updated by `npm run sync:social` / GitHub Actions cron)
 *  2. Optional real-time `VITE_LIVE_FEED_URL` (e.g. Behold.so Instagram feed or custom worker)
 * Falls back instantly to bundled `ALL_BRAND_REELS` with zero loading flicker.
 */
export function useLiveVideos() {
  const [videos, setVideos] = useState<InstagramReel[]>(ALL_BRAND_REELS)
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function hydrateFeeds() {
      let dynamicVideos: InstagramReel[] = []

      // 1. Load synced local JSON feed (updated automatically by scheduled sync workflow)
      try {
        const res = await fetch('/data/videos.json', { cache: 'no-cache' })
        if (res.ok) {
          const json: LiveFeedPayload = await res.json()
          if (Array.isArray(json.videos) && json.videos.length > 0) {
            dynamicVideos = mergeUniqueVideos(json.videos, dynamicVideos)
          }
          if (!cancelled && json.lastSyncedAt) {
            setLastSyncedAt(json.lastSyncedAt)
          }
        }
      } catch {
        // Keep bundled fallback silently
      }

      // 2. Optional live external feed URL (e.g. Behold.so JSON feed or serverless API)
      const liveFeedUrl = import.meta.env.VITE_LIVE_FEED_URL as string | undefined
      if (liveFeedUrl) {
        try {
          const res = await fetch(liveFeedUrl)
          if (res.ok) {
            const payload: LiveFeedPayload | RawExternalPost[] = await res.json()
            const rawList = Array.isArray(payload)
              ? payload
              : payload.posts || payload.data || []
            const parsed = rawList
              .map(normalizeExternalPost)
              .filter((v): v is InstagramReel => v !== null)
            if (parsed.length > 0) {
              dynamicVideos = mergeUniqueVideos(parsed, dynamicVideos)
            }
          }
        } catch {
          // Non-fatal; local synced feed remains intact
        }
      }

      if (!cancelled && dynamicVideos.length > 0) {
        setVideos(mergeUniqueVideos(dynamicVideos, ALL_BRAND_REELS))
      }
    }

    hydrateFeeds()
    return () => {
      cancelled = true
    }
  }, [])

  return { videos, lastSyncedAt }
}

