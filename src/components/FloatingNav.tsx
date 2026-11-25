import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Instagram, Mail } from 'lucide-react'
import { PUJA_PROFILE } from '../data/portfolio'
import { TikTokIcon } from './SocialIcons'

const LINKS = [
  { label: 'Brands', href: '#brands' },
  { label: 'Videos', href: '#skincare' },
  { label: 'Photography', href: '#stills' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export function FloatingNav() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.28 }}
          className="fixed inset-x-0 top-4 z-40 px-4"
        >
          <nav className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-[#11100F]/12 bg-[#F7F5F2]/92 px-4 py-2 shadow-[0_14px_38px_rgba(17,16,15,0.14)] backdrop-blur-md sm:px-6">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex items-center gap-2.5"
            >
              <img
                src={PUJA_PROFILE.profileAvatar}
                alt={PUJA_PROFILE.fullName}
                className="h-8 w-8 rounded-full border border-[#C9AE7E] object-cover"
              />
              <span className="font-display text-lg font-medium text-[#11100F]">
                Puja <span className="font-normal opacity-75">tamang</span>
              </span>
            </a>

            <div className="hidden items-center gap-6 md:flex">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[11px] font-semibold tracking-[0.14em] text-[#2D2825] uppercase transition-colors hover:text-[#8E6F4E]"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={PUJA_PROFILE.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                title={`Instagram ${PUJA_PROFILE.handle}`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#11100F] text-white transition hover:scale-105"
              >
                <Instagram className="h-3.5 w-3.5" />
              </a>
              <a
                href={PUJA_PROFILE.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                title={`TikTok ${PUJA_PROFILE.tiktokHandle}`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#11100F] text-white transition hover:scale-105"
              >
                <TikTokIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href={`mailto:${PUJA_PROFILE.email}?subject=${encodeURIComponent('UGC Brand Collaboration — Puja Tamang')}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#11100F] px-4 py-2 text-[10px] font-bold tracking-[0.16em] text-[#F7F5F2] uppercase transition hover:bg-[#8E6F4E]"
              >
                <Mail className="h-3 w-3" />
                <span>Email Me</span>
              </a>
            </div>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
