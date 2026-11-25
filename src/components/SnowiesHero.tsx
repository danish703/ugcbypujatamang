import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Instagram, Mail } from 'lucide-react'
import { PUJA_PROFILE } from '../data/portfolio'
import { TikTokIcon } from './SocialIcons'

export function SnowiesHero() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PUJA_PROFILE.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section
      id="top"
      className="relative flex min-h-[92vh] flex-col justify-between overflow-hidden px-5 pt-7 pb-10 sm:px-10 lg:min-h-[760px] lg:px-14"
    >
      {/* Full-bleed dreamy pastel sunset ocean backdrop */}
      <img
        src={PUJA_PROFILE.heroBackdrop}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full scale-[1.03] object-cover object-center"
      />
      <div className="hero-sunset-tint pointer-events-none absolute inset-0" />

      {/* Top Row — Social Handles + Solid Black Social Icon Circles (IG, TikTok, Email) */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={PUJA_PROFILE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F5F2]/85 px-3.5 py-1.5 text-xs font-semibold text-[#11100F] shadow-xs backdrop-blur-md transition hover:bg-[#F7F5F2]"
          >
            <Instagram className="h-3.5 w-3.5" />
            <span>{PUJA_PROFILE.handle}</span>
          </a>
          <a
            href={PUJA_PROFILE.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#11100F]/85 px-3.5 py-1.5 text-xs font-semibold text-[#F7F5F2] shadow-xs backdrop-blur-md transition hover:bg-[#11100F]"
          >
            <TikTokIcon className="h-3.5 w-3.5" />
            <span>{PUJA_PROFILE.tiktokHandle}</span>
          </a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={PUJA_PROFILE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Puja Tamang Instagram"
            title={`Instagram ${PUJA_PROFILE.handle}`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#11100F] text-white shadow-md transition-transform duration-300 hover:scale-110"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href={PUJA_PROFILE.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Puja Tamang TikTok"
            title={`TikTok ${PUJA_PROFILE.tiktokHandle}`}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#11100F] text-white shadow-md transition-transform duration-300 hover:scale-110"
          >
            <TikTokIcon className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${PUJA_PROFILE.email}?subject=${encodeURIComponent('UGC Brand Collaboration — Puja Tamang')}`}
            aria-label="Email Puja Tamang"
            title={PUJA_PROFILE.email}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-[#11100F] text-white shadow-md transition-transform duration-300 hover:scale-110"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Center Editorial Hero Composition */}
      <div className="relative z-10 mx-auto my-auto flex w-full max-w-7xl flex-col items-center justify-center py-10 lg:py-8">
        <div className="relative flex w-full flex-col items-center justify-center lg:flex-row">
          {/* LEFT — Location Eyebrow + Large White Curvy Display Name */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="z-20 mb-7 text-center lg:mb-0 lg:w-[34%] lg:pr-6 lg:text-right"
          >
            <p className="font-display text-lg font-medium tracking-[0.02em] text-[#11100F] sm:text-xl">
              {PUJA_PROFILE.location}
            </p>
            <h1 className="mt-1 font-display text-[4.4rem] leading-[0.86] font-normal tracking-[-0.02em] text-white drop-shadow-[0_4px_22px_rgba(17,16,15,0.18)] sm:text-[5.5rem] lg:text-[6.2rem]">
              {PUJA_PROFILE.firstName}
            </h1>
            <p className="mt-1 font-display text-3xl font-normal tracking-[0.04em] text-white/95 drop-shadow-[0_2px_14px_rgba(17,16,15,0.16)] sm:text-4xl lg:pr-1">
              {PUJA_PROFILE.lastName}
            </p>
          </motion.div>

          {/* CENTER — Delicate Hairline Gold Circle Ring Framing Puja's Real Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.08 }}
            className="relative z-20 flex shrink-0 items-center justify-center"
          >
            <div className="relative flex h-[290px] w-[290px] items-center justify-center rounded-full border border-[#C9AE7E] p-3 shadow-[0_24px_65px_rgba(17,16,15,0.18)] backdrop-blur-[2px] sm:h-[360px] sm:w-[360px] lg:h-[400px] lg:w-[400px]">
              <div className="pointer-events-none absolute inset-1.5 rounded-full border border-white/40" />
              <div className="h-full w-full overflow-hidden rounded-full bg-[#F5ECE8] shadow-inner">
                <img
                  src={PUJA_PROFILE.heroPortrait}
                  alt={`${PUJA_PROFILE.fullName} — Skincare & Beauty UGC Creator`}
                  className="h-full w-full object-cover object-[50%_18%] transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

          {/* RIGHT — Warm Champagne-Camel Niche Pill Ribbon Extending Behind Circle */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.14 }}
            className="z-10 mt-7 flex justify-center lg:mt-0 lg:-ml-10 lg:w-[36%] lg:justify-start"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 rounded-full bg-[#C5B18C]/95 px-7 py-3.5 text-center shadow-[0_12px_32px_rgba(17,16,15,0.14)] backdrop-blur-xs lg:rounded-l-none lg:rounded-r-full lg:py-4 lg:pr-9 lg:pl-14">
              {PUJA_PROFILE.nicheRibbon.map((item, idx) => (
                <span key={item} className="inline-flex items-center gap-2.5">
                  <span className="font-display text-sm font-medium tracking-[0.02em] text-[#11100F] sm:text-base">
                    {item}
                  </span>
                  {idx < PUJA_PROFILE.nicheRibbon.length - 1 && (
                    <span className="text-[#11100F]/55">|</span>
                  )}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Email-First Spotlight Bar (No Book Call button — highlights Email + TikTok) */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.24 }}
        className="relative z-20 mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-3.5 pt-4 sm:flex-row sm:gap-4"
      >
        {/* Spotlight Direct Email Box with One-Click Copy */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 rounded-full border border-white/55 bg-[#11100F]/75 py-2 pr-2 pl-5 text-white shadow-[0_16px_40px_rgba(17,16,15,0.24)] backdrop-blur-md">
          <Mail className="h-4 w-4 text-[#E8CFA6]" />
          <a
            href={`mailto:${PUJA_PROFILE.email}?subject=${encodeURIComponent('UGC Brand Collaboration — Puja Tamang')}`}
            className="font-editorial text-xl font-medium tracking-wide text-white transition hover:text-[#E8CFA6] sm:text-2xl"
          >
            {PUJA_PROFILE.email}
          </a>
          <button
            type="button"
            onClick={handleCopyEmail}
            title="Copy email address"
            className="inline-flex items-center gap-1 rounded-full bg-white/12 px-3 py-1.5 text-[10px] font-bold tracking-[0.14em] text-[#F7F5F2] uppercase transition hover:bg-white/25"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-[#E8CFA6]" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>
          <a
            href={`mailto:${PUJA_PROFILE.email}?subject=${encodeURIComponent('UGC Brand Collaboration Inquiry — Puja Tamang')}`}
            className="pill-ivory inline-flex items-center gap-1.5 rounded-full px-6 py-2.5 text-[11px] font-bold tracking-[0.18em] uppercase"
          >
            <span>Email Me</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </motion.div>
    </section>
  )
}
