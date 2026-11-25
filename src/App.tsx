import { useEffect, useState } from 'react'
import { FloatingNav } from './components/FloatingNav'
import { SnowiesHero } from './components/SnowiesHero'
import { BrandsStrip } from './components/BrandsStrip'
import { VideoShowcases } from './components/VideoShowcases'
import { StillsAboutContact } from './components/StillsAboutContact'
import { ProductGalleryPage } from './components/ProductGalleryPage'
import {
  MediaKitModal,
  ReelPlayerModal,
  StillLightboxModal,
} from './components/Modals'
import { useLiveVideos } from './hooks/useLiveVideos'
import { useLivePhotos } from './hooks/useLivePhotos'
import { type InstagramReel, type StillPhoto } from './data/portfolio'

function isGalleryUrl() {
  return new URLSearchParams(window.location.search).get('view') === 'gallery'
}

export default function App() {
  const { videos } = useLiveVideos()
  const { photos } = useLivePhotos()
  const [pageView, setPageView] = useState<'home' | 'gallery'>(() =>
    isGalleryUrl() ? 'gallery' : 'home',
  )
  const [selectedBrandId, setSelectedBrandId] = useState<string | null>(null)
  const [activeReel, setActiveReel] = useState<InstagramReel | null>(null)
  const [activeStill, setActiveStill] = useState<StillPhoto | null>(null)
  const [lightboxList, setLightboxList] = useState<StillPhoto[]>([])
  const [mediaKitOpen, setMediaKitOpen] = useState(false)

  useEffect(() => {
    const onPopState = () => setPageView(isGalleryUrl() ? 'gallery' : 'home')
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const openFullGallery = () => {
    const url = new URL(window.location.href)
    url.searchParams.set('view', 'gallery')
    url.hash = ''
    window.history.pushState({ view: 'gallery' }, '', url.toString())
    setPageView('gallery')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const returnHome = () => {
    const url = new URL(window.location.href)
    url.searchParams.delete('view')
    window.history.pushState({ view: 'home' }, '', url.toString())
    setPageView('home')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenStill = (still: StillPhoto, list: StillPhoto[]) => {
    setLightboxList(list)
    setActiveStill(still)
  }

  const handleSelectBrandFromStrip = (brandId: string | null) => {
    setSelectedBrandId(brandId)
    if (brandId) {
      window.setTimeout(() => {
        document.getElementById('skincare')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 60)
    }
  }

  return (
    <>
      {pageView === 'gallery' ? (
        <ProductGalleryPage
          photos={photos}
          onBack={returnHome}
          onOpenStill={handleOpenStill}
        />
      ) : (
        <div className="sand-canvas-bg min-h-screen text-[#11100F]">
          <FloatingNav />

          <main>
            <SnowiesHero />
            <BrandsStrip
              videos={videos}
              selectedBrandId={selectedBrandId}
              onSelectBrand={handleSelectBrandFromStrip}
            />
            <VideoShowcases
              videos={videos}
              selectedBrandId={selectedBrandId}
              onSelectBrand={setSelectedBrandId}
              onPlayReel={(reel) => setActiveReel(reel)}
            />
            <StillsAboutContact
              photos={photos}
              onOpenStill={handleOpenStill}
              onOpenFullGallery={openFullGallery}
              onOpenMediaKit={() => setMediaKitOpen(true)}
            />
          </main>
        </div>
      )}

      <ReelPlayerModal
        reel={activeReel}
        onClose={() => setActiveReel(null)}
      />

      <StillLightboxModal
        still={activeStill}
        list={lightboxList}
        onSelectStill={(next) => setActiveStill(next)}
        onClose={() => setActiveStill(null)}
      />

      <MediaKitModal
        open={mediaKitOpen}
        onClose={() => setMediaKitOpen(false)}
      />
    </>
  )
}
