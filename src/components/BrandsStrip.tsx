import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { BRAND_MEDALLIONS, PUJA_PROFILE, type InstagramReel } from '../data/portfolio'
import { SectionHeading } from './TaperedDivider'

interface BrandsStripProps {
  videos: InstagramReel[]
  selectedBrandId: string | null
  onSelectBrand: (brandId: string | null) => void
}

export function BrandsStrip({ videos, selectedBrandId, onSelectBrand }: BrandsStripProps) {
  const getReelCount = (brandId: string) =>
    videos.filter((r) => r.brandId === brandId).length

  return (
    <section id="brands" className="scroll-mt-24 px-5 pt-16 pb-14 sm:px-8 lg:px-12 lg:pt-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="Partnered with 20+ Brands..."
          subtitle="Click any brand below to watch its featured UGC videos"
        />

        {/* Symmetric 4 rows × 5 columns Clickable Circular Brand Logo Medallions */}
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-3 gap-x-4 gap-y-7 sm:grid-cols-4 md:grid-cols-5 md:gap-x-7 md:gap-y-8">
          {BRAND_MEDALLIONS.map((brand, idx) => {
            const count = getReelCount(brand.id)
            const isSelected = selectedBrandId === brand.id

            return (
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, delay: (idx % 5) * 0.04 }}
                className="flex flex-col items-center justify-center"
              >
                <button
                  type="button"
                  onClick={() => onSelectBrand(isSelected ? null : brand.id)}
                  aria-pressed={isSelected}
                  title={`Show ${brand.name} videos${count > 0 ? ` (${count})` : ''}`}
                  className="group relative flex flex-col items-center focus:outline-none"
                >
                  <div
                    style={{
                      backgroundColor: brand.bg,
                      color: brand.textColor,
                    }}
                    className={`relative flex h-24 w-24 flex-col items-center justify-center overflow-hidden rounded-full text-center transition-all duration-300 sm:h-28 sm:w-28 ${
                      brand.logoSrc ? brand.logoPadding || 'p-4' : 'px-2.5'
                    } ${
                      isSelected
                        ? 'scale-105 ring-[3px] ring-[#11100F] ring-offset-4 ring-offset-[#D4C6B9] shadow-[0_20px_38px_rgba(17,16,15,0.26)]'
                        : 'border border-[#11100F]/10 shadow-[0_10px_24px_rgba(17,16,15,0.1)] group-hover:-translate-y-1.5 group-hover:ring-2 group-hover:ring-[#11100F]/45 group-hover:shadow-[0_18px_34px_rgba(17,16,15,0.18)]'
                    }`}
                  >
                    {brand.logoSrc ? (
                      <img
                        src={brand.logoSrc}
                        alt={brand.name}
                        loading="lazy"
                        className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <>
                        <span
                          className={`leading-none ${
                            brand.fontStyle === 'serif'
                              ? 'font-editorial text-[1.1rem] font-semibold tracking-[0.06em]'
                              : brand.fontStyle === 'italic'
                                ? 'font-editorial text-[1.25rem] font-semibold italic'
                                : brand.fontStyle === 'mono'
                                  ? 'font-mono text-sm font-bold tracking-[0.12em]'
                                  : 'font-sans text-[11px] font-extrabold tracking-[0.11em]'
                          }`}
                        >
                          {brand.wordmark}
                        </span>
                        {brand.subtext && (
                          <span className="mt-1 text-[8px] font-semibold tracking-[0.22em] opacity-75 uppercase">
                            {brand.subtext}
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  {/* Subtle Video Count Pill Badge (bottom-right of circle) */}
                  {count > 0 && (
                    <span
                      className={`absolute top-0 right-0 flex h-6 min-w-6 items-center justify-center gap-0.5 rounded-full px-1.5 text-[10px] font-bold shadow-md transition-all ${
                        isSelected
                          ? 'bg-[#11100F] text-[#E8CFA6] scale-110'
                          : 'bg-[#F7F5F2] text-[#11100F] ring-1 ring-[#11100F]/15 group-hover:bg-[#11100F] group-hover:text-white'
                      }`}
                    >
                      <Play className="h-2.5 w-2.5 fill-current" />
                      <span>{count}</span>
                    </span>
                  )}

                  <span
                    className={`mt-2.5 text-[10px] font-bold tracking-[0.12em] uppercase transition-all duration-200 ${
                      isSelected
                        ? 'text-[#11100F] opacity-100'
                        : 'text-[#3B332C]/80 opacity-75 group-hover:text-[#11100F] group-hover:opacity-100'
                    }`}
                  >
                    {brand.name}
                  </span>
                </button>
              </motion.div>
            )
          })}
        </div>

        {/* Centered Light Italic Editorial Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-12 max-w-3xl text-center font-editorial text-3xl leading-snug font-light italic text-[#11100F] sm:text-4xl"
        >
          {PUJA_PROFILE.tagline}
        </motion.p>
      </div>
    </section>
  )
}
