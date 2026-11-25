import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, Check, Copy, Images, Instagram, Mail } from 'lucide-react'
import {
  PUJA_PROFILE,
  type StillPhoto,
} from '../data/portfolio'
import { TikTokIcon } from './SocialIcons'
import { SectionHeading } from './TaperedDivider'

interface StillsAboutContactProps {
  photos: StillPhoto[]
  onOpenStill: (still: StillPhoto, list: StillPhoto[]) => void
  onOpenFullGallery: () => void
  onOpenMediaKit: () => void
}

const HOME_PHOTO_LIMIT = 10

export function StillsAboutContact({
  photos,
  onOpenStill,
  onOpenFullGallery,
  onOpenMediaKit,
}: StillsAboutContactProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const previewPhotos = photos.slice(0, HOME_PHOTO_LIMIT)
  const hasMorePhotos = photos.length > HOME_PHOTO_LIMIT

  const copyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(key)
      window.setTimeout(() => setCopiedCode(null), 2200)
    } catch {
      setCopiedCode(null)
    }
  }

  return (
    <>
      {/* SECTION 6 — 2 Rows × 5 Columns Product Photography Stills Grid (+ Full Gallery Page trigger) */}
      <section id="stills" className="scroll-mt-24 px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            title="Product Photography"
            subtitle="Real skincare flatlays, PR unboxings & aesthetic stills from @ugcbypujatamang"
          />

          <div
            className={`mx-auto mt-12 grid grid-cols-2 gap-3.5 md:gap-5 ${
              previewPhotos.length <= 4
                ? 'max-w-5xl sm:grid-cols-2 lg:grid-cols-4'
                : 'sm:grid-cols-3 lg:grid-cols-5'
            }`}
          >
            {previewPhotos.map((still, idx) => (
              <motion.button
                key={still.id}
                type="button"
                onClick={() => onOpenStill(still, photos)}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: (idx % 5) * 0.05 }}
                className="group relative aspect-[4/5] overflow-hidden rounded-[6px] bg-[#C5B6A7] text-left shadow-[0_14px_32px_rgba(17,16,15,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_44px_rgba(17,16,15,0.2)]"
              >
                <img
                  src={still.image}
                  alt={`${still.brand} — ${still.title}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/75 via-black/15 to-transparent p-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-[10px] font-bold tracking-[0.18em] text-[#E8CFA6] uppercase">
                    {still.brand}
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-xs font-medium text-white">
                    {still.title}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Automatically displays dedicated Full Gallery Page CTA whenever photos exceed 10 */}
          {hasMorePhotos && (
            <div className="mt-10 flex justify-center">
              <button
                type="button"
                onClick={onOpenFullGallery}
                className="pill-ivory group inline-flex items-center gap-2.5 rounded-full px-8 py-4 text-xs font-bold tracking-[0.18em] uppercase"
              >
                <Images className="h-4 w-4" />
                <span>View Full Product Gallery ({photos.length} Photos)</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* SECTION 7 — About Me... (3-Column Symmetry Flanked by Puja's Portraits) */}
      <section id="about" className="scroll-mt-24 overflow-hidden px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading title="About Me..." />

          <div className="mt-14 grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
            {/* Left Angled Skincare Portrait */}
            <motion.div
              initial={{ opacity: 0, x: -24, rotate: -4 }}
              whileInView={{ opacity: 1, x: 0, rotate: -3 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="mx-auto w-full max-w-[260px] lg:col-span-3 lg:max-w-none"
            >
              <div className="overflow-hidden rounded-[28px] border-2 border-[#F7F5F2]/80 bg-[#EDE4DA] p-2 shadow-[0_24px_54px_rgba(17,16,15,0.18)]">
                <div className="aspect-[3/4] overflow-hidden rounded-[22px]">
                  <img
                    src={PUJA_PROFILE.aboutLeftPortrait}
                    alt="Puja holding Abib PDRN Skincare Cream"
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            </motion.div>

            {/* Center First-Person Book Serif Story */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65 }}
              className="mx-auto max-w-2xl text-center lg:col-span-6"
            >
              <div className="space-y-5 font-book text-lg leading-[1.7] text-[#1A1816] sm:text-[1.28rem]">
                {PUJA_PROFILE.aboutParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              {/* Clean Creator Reach & Metrics Strip */}
              <div className="mt-10 grid grid-cols-2 gap-4 border-t border-[#11100F]/15 pt-7 sm:grid-cols-4">
                {PUJA_PROFILE.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-2xl font-medium text-[#11100F] sm:text-3xl">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] font-medium tracking-[0.04em] text-[#3B342E]">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Angled Clean Beauty Portrait */}
            <motion.div
              initial={{ opacity: 0, x: 24, rotate: 4 }}
              whileInView={{ opacity: 1, x: 0, rotate: 3 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="mx-auto w-full max-w-[260px] lg:col-span-3 lg:max-w-none"
            >
              <div className="overflow-hidden rounded-[28px] border-2 border-[#F7F5F2]/80 bg-[#EDE4DA] p-2 shadow-[0_24px_54px_rgba(17,16,15,0.18)]">
                <div className="aspect-[3/4] overflow-hidden rounded-[22px]">
                  <img
                    src={PUJA_PROFILE.aboutRightPortrait}
                    alt="Puja holding Caraseoul Cleansing Oil"
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — Let's Work Together! (Email-Spotlight + TikTok & Instagram — ZERO forms / ZERO Book Call) */}
      <footer
        id="contact"
        className="scroll-mt-24 relative overflow-hidden border-t border-[#11100F]/10 px-5 pt-16 pb-14 sm:px-8 lg:px-12 lg:pt-24"
      >
        <div className="gold-shimmer-aura pointer-events-none absolute top-0 left-0 h-[520px] w-[520px]" />

        {/* Delicate White Orchid Botanical SVG Accent */}
        <svg
          viewBox="0 0 260 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -bottom-10 h-60 w-60 opacity-45 sm:h-72 sm:w-72"
        >
          <g fill="#F8F5F0" stroke="#C9AE7E" strokeWidth="1.2">
            <ellipse cx="160" cy="145" rx="46" ry="28" transform="rotate(-24 160 145)" />
            <ellipse cx="195" cy="182" rx="42" ry="26" transform="rotate(28 195 182)" />
            <ellipse cx="132" cy="196" rx="44" ry="25" transform="rotate(-70 132 196)" />
            <ellipse cx="176" cy="212" rx="34" ry="22" transform="rotate(64 176 212)" />
            <ellipse cx="116" cy="164" rx="36" ry="22" transform="rotate(14 116 164)" />
            <circle cx="158" cy="176" r="14" fill="#E8CFA6" />
          </g>
        </svg>

        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* LEFT — Radiant Blush-Robe Portrait with Gold Shimmer Halo */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7 }}
              className="relative mx-auto w-full max-w-md lg:col-span-5"
            >
              <svg
                viewBox="0 0 420 420"
                fill="none"
                className="pointer-events-none absolute -top-8 -left-8 h-full w-full opacity-80"
                aria-hidden="true"
              >
                <path
                  d="M42 210 C32 98, 124 24, 240 34 C330 42, 392 108, 390 198"
                  stroke="url(#goldSwirl)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="2 7"
                />
                <defs>
                  <linearGradient id="goldSwirl" x1="0" y1="0" x2="400" y2="300">
                    <stop offset="0%" stopColor="#EBD29B" />
                    <stop offset="50%" stopColor="#C9AE7E" />
                    <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              <div className="relative overflow-hidden rounded-t-[200px] rounded-b-[32px] border border-[#C9AE7E]/70 bg-[#F7F5F2] p-2.5 shadow-[0_28px_65px_rgba(17,16,15,0.18)]">
                <div className="aspect-[4/5] overflow-hidden rounded-t-[192px] rounded-b-[24px]">
                  <img
                    src={PUJA_PROFILE.contactPortrait}
                    alt={`${PUJA_PROFILE.fullName} in embroidered Puja robe`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                </div>
              </div>
            </motion.div>

            {/* RIGHT — Email-Highlighted Collaboration Hub + TikTok & Instagram */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: 0.08 }}
              className="flex flex-col items-center text-center lg:col-span-7"
            >
              <h2 className="font-display text-4xl leading-tight font-normal text-[#11100F] sm:text-6xl">
                Let&apos;s Work Together!
              </h2>

              <p className="mt-3 font-editorial text-2xl font-light italic text-[#2B2623] sm:text-3xl">
                PR Packages • Paid UGC Campaigns • Brand Collaborations
              </p>

              {/* Prominent Direct Email Spotlight Card */}
              <div className="mt-8 w-full max-w-lg rounded-[28px] border border-[#11100F]/15 bg-[#F8F5F0] p-6 shadow-[0_20px_50px_rgba(17,16,15,0.14)] sm:p-7">
                <p className="text-[10px] font-bold tracking-[0.24em] text-[#8E6F4E] uppercase">
                  Direct Collaboration Email
                </p>
                <a
                  href={`mailto:${PUJA_PROFILE.email}?subject=${encodeURIComponent('UGC Brand Collaboration — Puja Tamang')}`}
                  className="mt-2 block break-all font-display text-2xl font-medium text-[#11100F] transition hover:text-[#7A5E42] sm:text-3xl"
                >
                  {PUJA_PROFILE.email}
                </a>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={`mailto:${PUJA_PROFILE.email}?subject=${encodeURIComponent('UGC Brand Collaboration — Puja Tamang')}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#11100F] px-8 py-3.5 text-xs font-bold tracking-[0.18em] text-[#F7F5F2] uppercase shadow-md transition hover:-translate-y-0.5 hover:bg-[#7A5E42]"
                  >
                    <Mail className="h-4 w-4" />
                    <span>Email Me Now</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => copyText(PUJA_PROFILE.email, 'email')}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#11100F]/25 bg-white px-6 py-3.5 text-xs font-bold tracking-[0.16em] text-[#11100F] uppercase transition hover:border-[#11100F]"
                  >
                    {copiedCode === 'email' ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-700" />
                        <span>Email Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Underlined Media Kit Link */}
              <button
                type="button"
                onClick={onOpenMediaKit}
                className="mt-6 inline-flex items-center gap-1.5 font-editorial text-2xl font-medium text-[#11100F] underline decoration-[#11100F]/50 decoration-1 underline-offset-6 transition hover:text-[#6E563B] hover:decoration-[#6E563B]"
              >
                <span>View Media Kit</span>
                <ArrowUpRight className="h-5 w-5" />
              </button>

              {/* Prominent TikTok & Instagram Social Account Buttons */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={PUJA_PROFILE.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#11100F] px-6 py-3 text-xs font-bold tracking-[0.12em] text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#2C2825]"
                >
                  <TikTokIcon className="h-4 w-4 text-[#E8CFA6]" />
                  <span>TikTok {PUJA_PROFILE.tiktokHandle}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-75" />
                </a>
                <a
                  href={PUJA_PROFILE.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full bg-[#11100F] px-6 py-3 text-xs font-bold tracking-[0.12em] text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#2C2825]"
                >
                  <Instagram className="h-4 w-4 text-[#E8CFA6]" />
                  <span>Instagram {PUJA_PROFILE.handle}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 opacity-75" />
                </a>
              </div>

              {/* Verified Partner Discount Codes Strip */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={() => copyText(PUJA_PROFILE.yesStyleCode, 'yesstyle')}
                  className="inline-flex items-center gap-2 rounded-full border border-[#11100F]/15 bg-[#F7F5F2]/75 px-4 py-1.5 text-xs font-medium text-[#11100F] transition hover:bg-[#F7F5F2]"
                >
                  <span>YesStyle:</span>
                  <strong className="tracking-wider">{PUJA_PROFILE.yesStyleCode}</strong>
                  {copiedCode === 'yesstyle' ? (
                    <Check className="h-3 w-3 text-emerald-800" />
                  ) : (
                    <Copy className="h-3 w-3 opacity-55" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => copyText(PUJA_PROFILE.stylevanaCode, 'stylevana')}
                  className="inline-flex items-center gap-2 rounded-full border border-[#11100F]/15 bg-[#F7F5F2]/75 px-4 py-1.5 text-xs font-medium text-[#11100F] transition hover:bg-[#F7F5F2]"
                >
                  <span>Stylevana:</span>
                  <strong className="tracking-wider">{PUJA_PROFILE.stylevanaCode}</strong>
                  {copiedCode === 'stylevana' ? (
                    <Check className="h-3 w-3 text-emerald-800" />
                  ) : (
                    <Copy className="h-3 w-3 opacity-55" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => copyText(PUJA_PROFILE.firmooCode, 'firmoo')}
                  className="inline-flex items-center gap-2 rounded-full border border-[#11100F]/15 bg-[#F7F5F2]/75 px-4 py-1.5 text-xs font-medium text-[#11100F] transition hover:bg-[#F7F5F2]"
                >
                  <span>Firmoo 50% Off:</span>
                  <strong className="tracking-wider">{PUJA_PROFILE.firmooCode}</strong>
                  {copiedCode === 'firmoo' ? (
                    <Check className="h-3 w-3 text-emerald-800" />
                  ) : (
                    <Copy className="h-3 w-3 opacity-55" />
                  )}
                </button>
              </div>
            </motion.div>
          </div>

          {/* Minimalist Copyright Footer */}
          <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-[#11100F]/12 pt-6 text-xs text-[#3A332D] sm:flex-row">
            <p>
              © {new Date().getFullYear()} {PUJA_PROFILE.fullName} • {PUJA_PROFILE.locationFlag}
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <a
                href={`mailto:${PUJA_PROFILE.email}`}
                className="inline-flex items-center gap-1.5 font-semibold text-[#11100F] hover:underline"
              >
                <Mail className="h-3.5 w-3.5" />
                <span>{PUJA_PROFILE.email}</span>
              </a>
              <a
                href={PUJA_PROFILE.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-[#11100F] hover:underline"
              >
                <TikTokIcon className="h-3.5 w-3.5" />
                <span>{PUJA_PROFILE.tiktokHandle}</span>
              </a>
              <a
                href={PUJA_PROFILE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-semibold text-[#11100F] hover:underline"
              >
                <Instagram className="h-3.5 w-3.5" />
                <span>{PUJA_PROFILE.handle}</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
