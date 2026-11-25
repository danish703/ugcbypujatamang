import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ChevronLeft, ChevronRight, Instagram, Mail } from 'lucide-react'
import { PUJA_PROFILE, type StillPhoto } from '../data/portfolio'
import { TikTokIcon } from './SocialIcons'
import { SectionHeading } from './TaperedDivider'

interface ProductGalleryPageProps {
  photos: StillPhoto[]
  onBack: () => void
  onOpenStill: (still: StillPhoto, filteredList: StillPhoto[]) => void
}

const PHOTOS_PER_PAGE = 15

export function ProductGalleryPage({
  photos,
  onBack,
  onOpenStill,
}: ProductGalleryPageProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>('All')
  const [page, setPage] = useState<number>(1)

  const brandFilters = useMemo(() => {
    const counts = new Map<string, number>()
    for (const p of photos) {
      counts.set(p.brand, (counts.get(p.brand) || 0) + 1)
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1])
  }, [photos])

  const filteredPhotos = useMemo(() => {
    if (selectedBrand === 'All') return photos
    return photos.filter((p) => p.brand === selectedBrand)
  }, [photos, selectedBrand])

  const totalPages = Math.max(1, Math.ceil(filteredPhotos.length / PHOTOS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const paginatedPhotos = filteredPhotos.slice(
    (safePage - 1) * PHOTOS_PER_PAGE,
    safePage * PHOTOS_PER_PAGE,
  )

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand)
    setPage(1)
  }

  return (
    <div className="sand-canvas-bg min-h-screen text-[#11100F]">
      {/* Sticky Minimal Top Bar */}
      <header className="sticky top-0 z-40 border-b border-[#11100F]/10 bg-[#D4C6B9]/90 px-4 py-3.5 backdrop-blur-md sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-full bg-[#11100F] px-4 py-2 text-[11px] font-bold tracking-[0.14em] text-[#F7F5F2] uppercase transition hover:bg-[#7A5E42]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Portfolio</span>
          </button>

          <button
            type="button"
            onClick={onBack}
            className="hidden items-center gap-2.5 sm:flex"
          >
            <img
              src={PUJA_PROFILE.profileAvatar}
              alt={PUJA_PROFILE.fullName}
              className="h-8 w-8 rounded-full border border-[#C9AE7E] object-cover"
            />
            <span className="font-display text-xl font-medium text-[#11100F]">
              Puja <span className="font-normal opacity-75">tamang</span>
            </span>
          </button>

          <div className="flex items-center gap-2">
            <a
              href={PUJA_PROFILE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#11100F] text-white transition hover:scale-105"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href={PUJA_PROFILE.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#11100F] text-white transition hover:scale-105"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${PUJA_PROFILE.email}?subject=${encodeURIComponent('Product Photography Collaboration — Puja Tamang')}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F5F2] px-4 py-2 text-[10px] font-bold tracking-[0.16em] text-[#11100F] uppercase shadow-xs transition hover:bg-[#11100F] hover:text-white"
            >
              <Mail className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Email Me</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Dedicated Product Photography Gallery */}
      <main className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-12">
        <SectionHeading
          title="Product Photography Gallery"
          subtitle={`${photos.length} real product flatlays, PR unboxings & editorial stills from @ugcbypujatamang`}
        />

        {/* Brand Filter Pills */}
        <div className="mx-auto mt-10 max-w-5xl rounded-[24px] border border-[#11100F]/10 bg-[#EDE3D8]/80 p-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handleBrandChange('All')}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                selectedBrand === 'All'
                  ? 'bg-[#11100F] text-[#F7F5F2] shadow-sm'
                  : 'bg-[#F7F5F2]/85 text-[#2B2521] ring-1 ring-[#11100F]/10 hover:bg-[#F7F5F2]'
              }`}
            >
              All Photos ({photos.length})
            </button>
            {brandFilters.map(([brand, count]) => (
              <button
                key={brand}
                type="button"
                onClick={() => handleBrandChange(brand)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  selectedBrand === brand
                    ? 'bg-[#11100F] text-[#F7F5F2] shadow-sm'
                    : 'bg-[#F7F5F2]/80 text-[#2B2521] ring-1 ring-[#11100F]/10 hover:bg-[#F7F5F2]'
                }`}
              >
                <span>{brand}</span>
                <span
                  className={`rounded-full px-1.5 text-[10px] font-bold ${
                    selectedBrand === brand
                      ? 'bg-[#C5B18C] text-[#11100F]'
                      : 'bg-[#D4C6B9]/75 text-[#11100F]'
                  }`}
                >
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Full Responsive Gallery Grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
          {paginatedPhotos.map((still, idx) => (
            <motion.button
              key={still.id}
              type="button"
              onClick={() => onOpenStill(still, filteredPhotos)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: (idx % 5) * 0.04 }}
              className="group relative aspect-[4/5] overflow-hidden rounded-[8px] bg-[#C5B6A7] text-left shadow-[0_14px_32px_rgba(17,16,15,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(17,16,15,0.2)]"
            >
              <img
                src={still.image}
                alt={`${still.brand} — ${still.title}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/15 to-transparent p-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-[10px] font-bold tracking-[0.18em] text-[#E8CFA6] uppercase">
                  {still.brand}
                </p>
                <p className="mt-0.5 line-clamp-2 text-xs font-medium text-white">{still.title}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Multi-Page Pagination (automatically appears when > 15 photos) */}
        {totalPages > 1 && (
          <div className="mt-12 flex items-center justify-center gap-3">
            <button
              type="button"
              disabled={safePage <= 1}
              onClick={() => {
                setPage((p) => Math.max(1, p - 1))
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#11100F]/20 bg-[#F7F5F2] px-4 py-2 text-xs font-bold tracking-[0.12em] text-[#11100F] uppercase transition hover:bg-[#11100F] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Prev</span>
            </button>

            <div className="flex items-center gap-1.5">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    setPage(num)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition ${
                    num === safePage
                      ? 'bg-[#11100F] text-[#F7F5F2] shadow-md'
                      : 'bg-[#F7F5F2]/80 text-[#11100F] hover:bg-[#F7F5F2]'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={safePage >= totalPages}
              onClick={() => {
                setPage((p) => Math.min(totalPages, p + 1))
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#11100F]/20 bg-[#F7F5F2] px-4 py-2 text-xs font-bold tracking-[0.12em] text-[#11100F] uppercase transition hover:bg-[#11100F] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Bottom Email Strip */}
        <div className="mt-16 rounded-[28px] border border-[#11100F]/12 bg-[#F8F5F0]/90 p-7 text-center shadow-sm">
          <p className="font-display text-2xl text-[#11100F] sm:text-3xl">
            Want custom product photography for your brand?
          </p>
          <p className="mt-2 font-editorial text-xl italic text-[#4A413A]">
            Email Puja directly at{' '}
            <a
              href={`mailto:${PUJA_PROFILE.email}?subject=${encodeURIComponent('Product Photography Inquiry — Puja Tamang')}`}
              className="font-medium text-[#11100F] underline underline-offset-4"
            >
              {PUJA_PROFILE.email}
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}

