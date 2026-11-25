import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, Instagram, Play } from 'lucide-react'
import {
  BEAUTY_SKINCARE_PHONES,
  BRAND_MEDALLIONS,
  CONTENT_STYLE_PHONES,
  PRODUCT_SHOWCASE_CARDS,
  type InstagramReel,
} from '../data/portfolio'
import { TikTokIcon } from './SocialIcons'
import { SectionHeading, TaperedDivider } from './TaperedDivider'

interface VideoShowcasesProps {
  videos: InstagramReel[]
  selectedBrandId: string | null
  onSelectBrand: (brandId: string | null) => void
  onPlayReel: (reel: InstagramReel) => void
}

function PlatformPill({ platform }: { platform: 'instagram' | 'tiktok' }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-0.5 text-[9px] font-bold tracking-wider text-white uppercase backdrop-blur-sm">
      {platform === 'tiktok' ? (
        <>
          <TikTokIcon className="h-2.5 w-2.5 text-[#E8CFA6]" />
          <span>TikTok</span>
        </>
      ) : (
        <>
          <Instagram className="h-2.5 w-2.5 text-[#E8CFA6]" />
          <span>Reel</span>
        </>
      )}
    </span>
  )
}

/**
 * Realistic matte-black iPhone bezel mockup with platform pill, view counter,
 * centered translucent Play button, and overlapping brand/format sticker.
 */
function IphoneReelCard({
  reel,
  onPlay,
  index,
  isFormatSticker = false,
}: {
  reel: InstagramReel
  onPlay: (reel: InstagramReel) => void
  index: number
  isFormatSticker?: boolean
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative mx-auto w-full max-w-[245px] pb-5 pl-2.5 sm:max-w-[260px]"
    >
      <button
        type="button"
        onClick={() => onPlay(reel)}
        aria-label={`Play ${reel.title} on ${reel.platform}`}
        className="relative block w-full text-left transition-transform duration-500 ease-out group-hover:-translate-y-2"
      >
        {/* Side Hardware Buttons */}
        <span className="pointer-events-none absolute top-[18%] -left-[3px] h-7 w-[3px] rounded-l bg-[#2C2B2B]" />
        <span className="pointer-events-none absolute top-[30%] -left-[3px] h-10 w-[3px] rounded-l bg-[#2C2B2B]" />
        <span className="pointer-events-none absolute top-[26%] -right-[3px] h-12 w-[3px] rounded-r bg-[#2C2B2B]" />

        {/* Matte-Black iPhone Outer Bezel */}
        <div className="iphone-shell relative rounded-[34px] p-[8px]">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[26px] bg-[#141312]">
            <img
              src={reel.coverImage}
              alt={reel.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/25" />

            {/* Top Dynamic Island */}
            <div className="pointer-events-none absolute top-2.5 left-1/2 flex h-3.5 w-16 -translate-x-1/2 items-center justify-end rounded-full bg-black/90 px-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1C2A3A]" />
            </div>

            {/* Platform Pill */}
            <div className="absolute top-8 left-2.5 flex items-center">
              <PlatformPill platform={reel.platform} />
            </div>

            {/* Centered Translucent Circular Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-13 w-13 items-center justify-center rounded-full bg-black/45 text-white ring-1 ring-white/40 backdrop-blur-xs transition-all duration-300 group-hover:scale-110 group-hover:bg-black/70">
                <Play className="ml-0.5 h-5 w-5 fill-current" />
              </span>
            </div>

            {/* Bottom Title Overlay */}
            <div className="pointer-events-none absolute right-2.5 bottom-3 left-14 text-right">
              <p className="truncate text-[10px] font-semibold text-white/95 drop-shadow-xs">
                {reel.title}
              </p>
            </div>
          </div>
        </div>

        {/* Overlapping Rounded-Square Sticker Badge at Bottom-Left */}
        <div
          style={{
            backgroundColor: reel.badgeBg,
            color: reel.badgeText,
          }}
          className={`absolute -bottom-3 -left-2.5 z-20 flex items-center justify-center overflow-hidden rounded-[14px] border border-black/10 shadow-[0_10px_22px_rgba(17,16,15,0.22)] transition-transform duration-300 group-hover:scale-105 ${
            isFormatSticker
              ? 'min-w-[84px] px-3 py-2.5'
              : 'h-[62px] w-[62px] p-2 sm:h-[68px] sm:w-[68px]'
          }`}
        >
          {!isFormatSticker && reel.badgeLogoSrc ? (
            <img
              src={reel.badgeLogoSrc}
              alt={reel.brand}
              loading="lazy"
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <span
              className={`text-center leading-tight ${
                isFormatSticker
                  ? 'font-sans text-[10px] font-extrabold tracking-[0.14em] uppercase'
                  : reel.badgeLabel.length > 8
                    ? 'font-sans text-[8.5px] font-extrabold tracking-[0.02em]'
                    : 'font-editorial text-[11px] font-bold tracking-[0.04em]'
              }`}
            >
              {reel.badgeLabel}
            </span>
          )}
        </div>
      </button>
    </motion.div>
  )
}

/**
 * Clean borderless rounded-corner 9:16 Product Showcase card (Row 2)
 */
function BorderlessShowcaseCard({
  reel,
  onPlay,
  index,
}: {
  reel: InstagramReel
  onPlay: (reel: InstagramReel) => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative pb-8"
    >
      <button
        type="button"
        onClick={() => onPlay(reel)}
        aria-label={`Play ${reel.title} Product Showcase Video`}
        className="relative block w-full text-left transition-transform duration-500 ease-out group-hover:-translate-y-2"
      >
        <div className="relative aspect-[9/16] overflow-hidden rounded-[20px] bg-[#191716] shadow-[0_22px_48px_rgba(17,16,15,0.2)]">
          <img
            src={reel.coverImage}
            alt={reel.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-black/15" />

          <div className="absolute top-3.5 left-3.5 flex items-center">
            <PlatformPill platform={reel.platform} />
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/45 text-white ring-1 ring-white/45 backdrop-blur-xs transition-all duration-300 group-hover:scale-110 group-hover:bg-black/70">
              <Play className="ml-0.5 h-6 w-6 fill-current" />
            </span>
          </div>
        </div>

        <div
          style={{
            backgroundColor: reel.badgeBg,
            color: reel.badgeText,
          }}
          className="absolute -bottom-6 left-1/2 z-20 flex h-[66px] w-[76px] -translate-x-1/2 items-center justify-center overflow-hidden rounded-[15px] border border-black/10 p-2 shadow-[0_12px_26px_rgba(17,16,15,0.22)] transition-transform duration-300 group-hover:scale-105"
        >
          {reel.badgeLogoSrc ? (
            <img
              src={reel.badgeLogoSrc}
              alt={reel.brand}
              loading="lazy"
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <span className="text-center font-editorial text-xs font-bold tracking-[0.04em]">
              {reel.badgeLabel}
            </span>
          )}
        </div>
      </button>
    </motion.div>
  )
}

export function VideoShowcases({
  videos,
  selectedBrandId,
  onSelectBrand,
  onPlayReel,
}: VideoShowcasesProps) {
  const activeBrand = selectedBrandId
    ? BRAND_MEDALLIONS.find((b) => b.id === selectedBrandId) || null
    : null

  const filteredBrandReels = selectedBrandId
    ? videos.filter((r) => r.brandId === selectedBrandId)
    : []

  return (
    <div id="skincare" className="scroll-mt-24 py-10">
      {/* Interactive Brand Filter Pill Bar (Synced 1:1 with the 20 Brand Medallions above) */}
      <div className="mx-auto mb-12 max-w-6xl px-5 sm:px-8 lg:px-12">
        <div className="rounded-[26px] border border-[#11100F]/10 bg-[#EDE3D8]/80 p-4 shadow-[0_10px_28px_rgba(17,16,15,0.06)] backdrop-blur-xs sm:p-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11px] font-bold tracking-[0.18em] text-[#4A3F36] uppercase">
              Browse UGC Videos By Brand ({videos.length} Real IG &amp; TikTok Videos)
            </p>
            {selectedBrandId && (
              <button
                type="button"
                onClick={() => onSelectBrand(null)}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#11100F] px-3.5 py-1 text-[10px] font-bold tracking-[0.14em] text-[#F7F5F2] uppercase transition hover:bg-[#7A5E42]"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>Show All Brands</span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onSelectBrand(null)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                selectedBrandId === null
                  ? 'bg-[#11100F] text-[#F7F5F2] shadow-sm'
                  : 'bg-[#F7F5F2]/85 text-[#2B2521] ring-1 ring-[#11100F]/10 hover:bg-[#F7F5F2]'
              }`}
            >
              All Brands
            </button>

            {BRAND_MEDALLIONS.map((brand) => {
              const count = videos.filter((r) => r.brandId === brand.id).length
              const isSelected = selectedBrandId === brand.id
              return (
                <button
                  key={brand.id}
                  type="button"
                  onClick={() => onSelectBrand(isSelected ? null : brand.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    isSelected
                      ? 'bg-[#11100F] text-[#F7F5F2] shadow-md'
                      : 'bg-[#F7F5F2]/80 text-[#2B2521] ring-1 ring-[#11100F]/10 hover:bg-[#F7F5F2] hover:ring-[#11100F]/35'
                  }`}
                >
                  <span>{brand.name}</span>
                  {count > 0 && (
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                        isSelected ? 'bg-[#C5B18C] text-[#11100F]' : 'bg-[#D4C6B9]/75 text-[#11100F]'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeBrand ? (
          /* DEDICATED SINGLE-BRAND VIDEO VIEW (Shows ONLY the clicked brand's IG & TikTok videos) */
          <motion.section
            key={activeBrand.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
            className="px-5 pb-12 sm:px-8 lg:px-12"
          >
            <div className="mx-auto max-w-6xl">
              <div className="flex flex-col items-center text-center">
                <div
                  style={{ backgroundColor: activeBrand.bg, color: activeBrand.textColor }}
                  className={`flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-[#11100F]/12 shadow-lg sm:h-24 sm:w-24 ${
                    activeBrand.logoSrc ? activeBrand.logoPadding || 'p-3.5' : 'px-2'
                  }`}
                >
                  {activeBrand.logoSrc ? (
                    <img
                      src={activeBrand.logoSrc}
                      alt={activeBrand.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="font-editorial text-lg font-semibold">
                      {activeBrand.wordmark}
                    </span>
                  )}
                </div>

                <h2 className="mt-4 font-display text-3xl font-normal text-[#11100F] sm:text-5xl">
                  {activeBrand.name} Videos
                </h2>
                <TaperedDivider />
                <p className="mt-3 font-editorial text-xl font-light italic text-[#2B2623] sm:text-2xl">
                  Showing {filteredBrandReels.length} featured video
                  {filteredBrandReels.length > 1 ? 's' : ''} for {activeBrand.name} — tap any phone
                  to watch
                </p>
              </div>

              <div className="mt-12 flex flex-wrap items-start justify-center gap-8 sm:gap-10">
                {filteredBrandReels.map((reel, idx) => (
                  <div key={reel.id} className="w-full max-w-[255px]">
                    <IphoneReelCard reel={reel} onPlay={onPlayReel} index={idx} />
                    <div className="mt-3 px-2 text-center">
                      <p className="text-xs font-bold text-[#11100F]">{reel.title}</p>
                      <p className="mt-0.5 text-[11px] text-[#4A413A]">
                        {reel.formatTag} • {reel.platform === 'tiktok' ? 'TikTok' : 'Instagram Reel'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => onSelectBrand(null)}
                  className="pill-ivory inline-flex items-center gap-2 rounded-full px-8 py-3.5 text-xs font-bold tracking-[0.18em] uppercase"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to All Brand Videos</span>
                </button>
              </div>
            </div>
          </motion.section>
        ) : (
          /* DEFAULT FULL SNOWIES-INSPIRED 3-ROW SHOWCASE */
          <motion.div
            key="all-brands"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="space-y-20 sm:space-y-24"
          >
            {/* ROW 1 — 5-Column Black iPhone Mockups (Top IG & TikTok Beauty / Skincare) */}
            <section className="px-5 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-7xl">
                <SectionHeading
                  title="Beauty / Skincare"
                  subtitle="Tap any phone to watch live Instagram Reels & TikTok videos"
                />

                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
                  {BEAUTY_SKINCARE_PHONES.map((reel, idx) => (
                    <IphoneReelCard key={reel.id} reel={reel} onPlay={onPlayReel} index={idx} />
                  ))}
                </div>
              </div>
            </section>

            {/* ROW 2 — 4-Column Borderless 9:16 Product Showcase Cards */}
            <section id="showcase" className="scroll-mt-24 px-5 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-6xl">
                <SectionHeading title="Product Showcase" />

                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
                  {PRODUCT_SHOWCASE_CARDS.map((reel, idx) => (
                    <BorderlessShowcaseCard
                      key={reel.id}
                      reel={reel}
                      onPlay={onPlayReel}
                      index={idx}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* ROW 3 — 5-Column Black iPhone Mockups (Content Style Format Badges) */}
            <section id="styles" className="scroll-mt-24 px-5 sm:px-8 lg:px-12">
              <div className="mx-auto max-w-7xl">
                <SectionHeading title="Content Styles" />

                <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 lg:gap-5">
                  {CONTENT_STYLE_PHONES.map((reel, idx) => (
                    <IphoneReelCard
                      key={reel.id}
                      reel={reel}
                      onPlay={onPlayReel}
                      index={idx}
                      isFormatSticker
                    />
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
