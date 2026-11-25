import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, ChevronLeft, ChevronRight, Copy, Instagram, Mail, X } from 'lucide-react'
import {
  PUJA_PROFILE,
  type InstagramReel,
  type StillPhoto,
} from '../data/portfolio'
import { TikTokIcon } from './SocialIcons'

/**
 * 1. LIVE VIDEO PLAYER MODAL (Supports BOTH Instagram Reels & TikTok Videos!)
 * Direct email CTA — zero forms, zero "Book A Call".
 */
export function ReelPlayerModal({
  reel,
  onClose,
}: {
  reel: InstagramReel | null
  onClose: () => void
}) {
  useEffect(() => {
    document.body.style.overflow = reel ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [reel])

  const embedUrl = reel
    ? reel.platform === 'tiktok' && reel.tiktokId
      ? `https://www.tiktok.com/player/v1/${reel.tiktokId}?music_info=1&description=1`
      : `https://www.instagram.com/reel/${reel.shortcode}/embed/`
    : ''

  return (
    <AnimatePresence>
      {reel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[28px] border border-white/15 bg-[#161413] text-[#F7F5F2] shadow-2xl md:grid-cols-12 md:overflow-hidden"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close video player"
              className="absolute top-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white ring-1 ring-white/25 transition hover:bg-white hover:text-[#11100F]"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Live Embed Stage (Instagram Reel or TikTok Video) */}
            <div className="flex items-center justify-center bg-[#0C0B0A] p-4 md:col-span-6">
              <div className="relative h-[540px] w-full max-w-[330px] overflow-hidden rounded-[22px] border border-white/12 bg-black shadow-2xl">
                <iframe
                  key={reel.id}
                  src={embedUrl}
                  title={reel.title}
                  className="h-full w-full border-0 bg-black"
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Right Video Context & Direct Email CTA */}
            <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 pr-10">
                  <span
                    style={{ backgroundColor: reel.badgeBg, color: reel.badgeText }}
                    className="rounded-full px-3.5 py-1 text-[11px] font-bold tracking-[0.12em] uppercase"
                  >
                    {reel.brand}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-[#E8CFA6]">
                    {reel.platform === 'tiktok' ? (
                      <>
                        <TikTokIcon className="h-3 w-3" />
                        <span>TikTok</span>
                      </>
                    ) : (
                      <>
                        <Instagram className="h-3 w-3" />
                        <span>Instagram Reel</span>
                      </>
                    )}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-3xl leading-tight font-normal text-white">
                  {reel.title}
                </h3>

                <p className="mt-4 font-book text-sm leading-relaxed text-[#D8CEC4]">
                  “{reel.caption}”
                </p>

                <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[#C9AE7E] uppercase">
                    Creator Profiles
                  </p>
                  <div className="mt-2.5 flex items-center gap-3">
                    <img
                      src={PUJA_PROFILE.profileAvatar}
                      alt={PUJA_PROFILE.fullName}
                      className="h-10 w-10 rounded-full border border-[#C9AE7E] object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-white">{PUJA_PROFILE.fullName}</p>
                      <p className="text-xs text-[#C2B6AA]">
                        IG: {PUJA_PROFILE.handle} • TikTok: {PUJA_PROFILE.tiktokHandle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3 border-t border-white/10 pt-5">
                <a
                  href={`mailto:${PUJA_PROFILE.email}?subject=${encodeURIComponent(`UGC Collaboration Inquiry — Inspired by ${reel.title}`)}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#F7F5F2] px-6 py-3.5 text-xs font-bold tracking-[0.14em] text-[#11100F] uppercase transition hover:bg-[#C5B18C]"
                >
                  <Mail className="h-4 w-4" />
                  <span>Email Puja ({PUJA_PROFILE.email})</span>
                </a>
                <a
                  href={reel.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-xs font-semibold tracking-[0.14em] text-white uppercase transition hover:bg-white hover:text-[#11100F]"
                >
                  {reel.platform === 'tiktok' ? (
                    <>
                      <TikTokIcon className="h-4 w-4" />
                      <span>Open Original Video on TikTok</span>
                    </>
                  ) : (
                    <>
                      <Instagram className="h-4 w-4" />
                      <span>Open Original Reel on Instagram</span>
                    </>
                  )}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * 2. STILL PHOTOGRAPHY LIGHTBOX (with Previous/Next & Keyboard Navigation)
 */
export function StillLightboxModal({
  still,
  list = [],
  onSelectStill,
  onClose,
}: {
  still: StillPhoto | null
  list?: StillPhoto[]
  onSelectStill?: (next: StillPhoto) => void
  onClose: () => void
}) {
  const currentIndex = still ? list.findIndex((item) => item.id === still.id) : -1
  const canNavigate = Boolean(onSelectStill && list.length > 1 && currentIndex !== -1)

  const goPrev = () => {
    if (!canNavigate || !onSelectStill) return
    const nextIdx = (currentIndex - 1 + list.length) % list.length
    onSelectStill(list[nextIdx])
  }

  const goNext = () => {
    if (!canNavigate || !onSelectStill) return
    const nextIdx = (currentIndex + 1) % list.length
    onSelectStill(list[nextIdx])
  }

  useEffect(() => {
    if (!still) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [still, currentIndex, list])

  return (
    <AnimatePresence>
      {still && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/82 p-4 backdrop-blur-md"
        >
          {canNavigate && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                goPrev()
              }}
              aria-label="Previous photo"
              className="absolute left-3 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/25 transition hover:bg-white hover:text-black sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <motion.div
            key={still.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg overflow-hidden rounded-[24px] bg-[#181615] text-white shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close photo"
              className="absolute top-3 right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white transition hover:bg-white hover:text-black"
            >
              <X className="h-4 w-4" />
            </button>
            <img
              src={still.image}
              alt={still.title}
              className="max-h-[72vh] w-full object-contain bg-black"
            />
            <div className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="text-[10px] font-bold tracking-[0.18em] text-[#C9AE7E] uppercase">
                  {still.brand}
                  {canNavigate ? ` • ${currentIndex + 1} / ${list.length}` : ''}
                </p>
                <p className="truncate text-sm font-medium text-white">{still.title}</p>
              </div>
              <a
                href={still.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#F7F5F2] px-4 py-2 text-[10px] font-bold tracking-[0.14em] text-[#11100F] uppercase transition hover:bg-[#C5B18C]"
              >
                <Instagram className="h-3.5 w-3.5" />
                <span>View Post</span>
              </a>
            </div>
          </motion.div>

          {canNavigate && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                goNext()
              }}
              aria-label="Next photo"
              className="absolute right-3 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-black/55 text-white ring-1 ring-white/25 transition hover:bg-white hover:text-black sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * 3. CLEAN READ-ONLY MEDIA KIT & DIRECT EMAIL MODAL (Zero forms!)
 */
export function MediaKitModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PUJA_PROFILE.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[30px] border border-[#11100F]/15 bg-[#EFE6DC] p-6 text-[#11100F] shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close media kit"
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#11100F]/10 text-[#11100F] transition hover:bg-[#11100F] hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-4 pr-10">
              <img
                src={PUJA_PROFILE.profileAvatar}
                alt={PUJA_PROFILE.fullName}
                className="h-16 w-16 rounded-full border-2 border-[#C9AE7E] object-cover"
              />
              <div>
                <p className="text-[10px] font-bold tracking-[0.22em] text-[#7A5E42] uppercase">
                  Creator Media Kit
                </p>
                <h3 className="font-display text-3xl font-medium text-[#11100F]">
                  {PUJA_PROFILE.fullName}
                </h3>
                <p className="text-xs font-medium text-[#3A332D]">
                  {PUJA_PROFILE.locationFlag} • Medicube Global Ambassador
                </p>
              </div>
            </div>

            {/* Verified Reach Grid */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {PUJA_PROFILE.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[#11100F]/10 bg-[#F8F5F0] p-3.5 text-center"
                >
                  <p className="font-display text-2xl font-medium text-[#11100F]">{stat.value}</p>
                  <p className="mt-0.5 text-[10px] font-medium text-[#4A413A]">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Direct Email & Social Footer */}
            <div className="mt-6 rounded-2xl border border-[#11100F]/12 bg-[#D4C6B9]/70 p-5 text-center">
              <p className="text-[10px] font-bold tracking-[0.2em] text-[#4A3F36] uppercase">
                Email For Custom Rates &amp; PR Inquiries
              </p>
              <p className="mt-1 font-display text-2xl font-medium text-[#11100F]">
                {PUJA_PROFILE.email}
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
                <a
                  href={`mailto:${PUJA_PROFILE.email}?subject=${encodeURIComponent('UGC Rate Card & Collaboration Inquiry — Puja Tamang')}`}
                  className="inline-flex items-center gap-2 rounded-full bg-[#11100F] px-6 py-2.5 text-xs font-bold tracking-[0.16em] text-white uppercase transition hover:bg-[#7A5E42]"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Email Me</span>
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#F8F5F0] px-5 py-2.5 text-xs font-bold tracking-[0.14em] text-[#11100F] uppercase transition hover:bg-white"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-700" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Email'}</span>
                </button>
                <a
                  href={PUJA_PROFILE.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#11100F] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3A332D]"
                >
                  <TikTokIcon className="h-3.5 w-3.5" />
                  <span>TikTok</span>
                </a>
                <a
                  href={PUJA_PROFILE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#11100F] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#3A332D]"
                >
                  <Instagram className="h-3.5 w-3.5" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
