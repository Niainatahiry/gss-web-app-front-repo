import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import heroImage from '../../assets/images/hero-image.jpg'
import HeroGameCard from '../ui/HeroGameCard'
import PromotionDescription from '../ui/PromotionDescription'

const slidesData = [
  {
    id: 1,
    imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2483190/3eeb9970d8a8b6634d114b43e0edba78a7ee1eb6/library_hero_2x.jpg",
    title: "GSS exclusive sale on Forza Horizon 6",
    subtitle: "SUMMER SALE",
    games: [
      {
        id: 1,
        imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2483190/711e39803402def82a90e1f31578c64744f952f3/library_capsule_2x.jpg",
        productName: "FORZA HORIZON 6 STANDARD Edition",
        originalPrice: 300000,
        salePrice: 195000,
        currency: "AR"
      },
      {
        id: 2,
        imageUrl: "https://store-images.s-microsoft.com/image/apps.1471.13782753939064744.ecc264a7-2365-4110-b06e-a6f978c761d7.e0760a01-ad9a-4fce-bb5a-bbe691096d01",
        productName: "FORZA HORIZON 6 DELUXE Edition",
        originalPrice: 425000,
        salePrice: 240000,
        currency: "AR"
      },
      {
        id: 3,
        imageUrl: "https://store-images.s-microsoft.com/image/apps.60342.13547047233571036.013c5ec3-a5d7-4e8a-83e7-470299116376.2346f664-c01a-4b06-a92c-4819a43e8f75",
        productName: "FORZA HORIZON 6 PREMIUM Edition",
        originalPrice: 510000,
        salePrice: 295000,
        currency: "AR"
      }
    ],
    promotion: {
      endDate: "15 Juillet 2026",
      discount: "44",
      maxSavings: "44",
      gameName: "FORZA HORIZON 6",
      description: "la meilleure licence automobile du moment. Achetez un compte Steam neuf avec le jeu à un prix imbattable."
    }
  },
  {
    id: 2,
    imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/library_hero_2x.jpg?t=1767883716",
    title: "GSS exclusive sale on Elden Ring",
    subtitle: "WINTER SALE",
    games: [
      {
        id: 4,
        imageUrl: "https://store-images.s-microsoft.com/image/apps.25322.14537704372270848.6ecb6038-5426-409a-8660-158d1eb64fb0.d230176a-d7a2-4696-ad23-ff53a6e004df",
        productName: "ELDEN RING STANDARD Edition",
        originalPrice: 350000,
        salePrice: 210000,
        currency: "AR"
      },
      {
        id: 5,
        imageUrl: "https://store-images.s-microsoft.com/image/apps.26403.13995152356447586.3e46d8cd-8538-4377-826c-ab6ef69216af.2a425d27-aa3b-44f5-85c6-9424a736b7be",
        productName: "ELDEN RING DELUXE Edition",
        originalPrice: 480000,
        salePrice: 280000,
        currency: "AR"
      },
      {
        id: 6,
        imageUrl: "https://store-images.s-microsoft.com/image/apps.19413.14509973624768376.8012321a-394e-42b7-ba2b-040f89ebe965.a1419550-a86b-4ca1-9063-0b92a45c0604",
        productName: "ELDEN RING Shadow of the Erdtree Edition",
        originalPrice: 550000,
        salePrice: 330000,
        currency: "AR"
      }
    ],
    promotion: {
      endDate: "20 Août 2026",
      discount: "40",
      maxSavings: "40",
      gameName: "ELDEN RING",
      description: "l'aventure la plus acclamée de FromSoftware. Un monde ouvert épique vous attend."
    }
  },
  {
  id: 3,
  imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1808500/ab1991cd931978e06440673952afb6f802db383d/library_hero_2x.jpg",
  title: "GSS exclusive sale on ARC Raiders",
  subtitle: "NEW RELEASE SALE",
  games: [
    {
      id: 7,
      imageUrl: "https://store-images.s-microsoft.com/image/apps.1218.13550041517005289.7f3b0841-0084-4cae-88f4-8996d95d574f.96567331-f46b-4380-96a6-ab86b5c38634",
      productName: "ARC RAIDERS STANDARD Edition",
      originalPrice: 250000,
      salePrice: 180000,
      currency: "AR"
    },
    {
      id: 8,
      imageUrl: "https://store-images.s-microsoft.com/image/apps.27637.13724331513791367.30e3cd9a-beea-4797-8509-a950e1c1e48d.7f6d6861-aac4-4ec0-bcbf-42f8323c5bb0?",
      productName: "ARC RAIDERS Founder Edition",
      originalPrice: 320000,
      salePrice: 235000,
      currency: "AR"
    },
  ],
  promotion: {
    endDate: "31 Août 2026",
    discount: "28",
    maxSavings: "28",
    gameName: "ARC RAIDERS",
    description: "Le nouveau shooter d'extraction coopératif signé Embark Studios. Affrontez les ARC, récupérez du butin et survivez dans un monde post-apocalyptique."
  }
}
]

function Hero() {
  const AUTO_SLIDE_INTERVAL = 10800
  const TRANSITION_DURATION = 500
  const RESET_DELAY = 800
  const FADE_DURATION = 300

  const hasMultipleSlides = slidesData.length > 1

  const [currentSlide, setCurrentSlide] = useState(0)
  const [visibleSlide, setVisibleSlide] = useState(0)   // ← NEW: what the user actually sees
  const [isFading, setIsFading] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(true)

  const currentSlideRef = useRef(0)
  const isResettingRef = useRef(false)
  const transitionTimerRef = useRef(null)
  const autoTimerRef = useRef(null)

  useEffect(() => {
    currentSlideRef.current = currentSlide
  }, [currentSlide])

  // Extended slides only when multiple
  const extendedSlides = hasMultipleSlides
    ? [...slidesData, slidesData[0]]
    : slidesData

  // ── NEW: Sync visible content after fade completes ──
  useEffect(() => {
    if (!isFading) {
      setVisibleSlide(currentSlide % slidesData.length)
    }
  }, [isFading, currentSlide])

  const resetToSlide0 = useCallback(() => {
    if (!hasMultipleSlides) return
    isResettingRef.current = true
    setIsTransitioning(false)
    setCurrentSlide(0)
    currentSlideRef.current = 0

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsTransitioning(true)
        isResettingRef.current = false
      })
    })
  }, [hasMultipleSlides])

  const nextSlide = useCallback(() => {
    if (!hasMultipleSlides || isResettingRef.current) return

    const next = currentSlideRef.current + 1
    const totalRealSlides = slidesData.length

    // Start fade-out → content stays old during fade
    setIsFading(true)

    setTimeout(() => setIsFading(false), FADE_DURATION)

    if (next === totalRealSlides) {
      setIsTransitioning(true)
      setCurrentSlide(next)
      currentSlideRef.current = next

      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current)
      transitionTimerRef.current = setTimeout(() => {
        resetToSlide0()
      }, TRANSITION_DURATION + RESET_DELAY)
    } else {
      setIsTransitioning(true)
      setCurrentSlide(next)
      currentSlideRef.current = next
    }
  }, [hasMultipleSlides, resetToSlide0])

  const prevSlide = useCallback(() => {
    if (!hasMultipleSlides || isResettingRef.current) return

    const prev = currentSlideRef.current - 1
    const totalRealSlides = slidesData.length

    // Start fade-out → content stays old during fade
    setIsFading(true)
    setTimeout(() => setIsFading(false), FADE_DURATION)

    if (currentSlideRef.current === 0) {
      isResettingRef.current = true
      setIsTransitioning(false)
      setCurrentSlide(totalRealSlides)
      currentSlideRef.current = totalRealSlides

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true)
          setCurrentSlide(totalRealSlides - 1)
          currentSlideRef.current = totalRealSlides - 1
          isResettingRef.current = false
        })
      })
    } else {
      setIsTransitioning(true)
      setCurrentSlide(prev)
      currentSlideRef.current = prev
    }
  }, [hasMultipleSlides])

  // Auto-timer
  useEffect(() => {
    if (!hasMultipleSlides) return

    autoTimerRef.current = setInterval(nextSlide, AUTO_SLIDE_INTERVAL)
    return () => {
      clearInterval(autoTimerRef.current)
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current)
    }
  }, [nextSlide, hasMultipleSlides])

  // ── KEY FIX: derive content from VISIBLE slide, not current slide ──
  const slide = slidesData[visibleSlide]

  return (
    <section className="relative w-full h-125 md:h-150 lg:h-175">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 flex"
          style={{
            transform: hasMultipleSlides
              ? `translateX(-${currentSlide * 100}%)`
              : 'none',
            transition: isTransitioning && hasMultipleSlides
              ? `transform ${TRANSITION_DURATION}ms ease-in-out`
              : 'none'
          }}
        >
          {extendedSlides.map((s, i) => (
            <img
              key={`${s.id}-${i}`}
              src={s.imageUrl}
              alt={s.title}
              className="w-full h-full object-cover shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Content wrapper — fades out/in, but data is locked to visibleSlide */}
      <div
        className={`relative z-10 h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 transition-opacity duration-300 ${
          isFading ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="w-full max-w-7xl md:px-16 xl:px-24 2xl:px-0">
          <div className="mb-6 xl:mb-7 2xl:mb-8">
            <h2 className="font-display text-lg md:text-lg 2xl:text-3xl font-bold text-white drop-shadow-xl uppercase tracking-wide" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.3)' }}>
              {slide.title}
            </h2>
            <p className="font-display text-3xl md:text-5xl 2xl:text-7xl font-black text-white drop-shadow-xl uppercase tracking-wider mt-1.5 xl:mt-2 2xl:mt-2" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.3)' }}>
              {slide.subtitle}
            </p>
          </div>
        </div>

        <div
          className={`absolute top-[70%] left-1/2 -translate-x-1/2 z-20 w-full max-w-7xl md:px-16 xl:px-24 2xl:px-0 transition-opacity duration-300 ${
            isFading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="flex flex-col-reverse lg:flex-row gap-4 md:gap-12 justify-center lg:justify-start md:w-full">
            <div className="shrink-0 bg">
              <PromotionDescription {...slide.promotion} />
            </div>
            <div className="flex flex-nowrap gap-4 flex-1 justify-end md:mx-auto ">
              {slide.games.map(game => (
                <HeroGameCard key={game.id} {...game} />
              ))}
            </div>

          </div>
        </div>
      </div>

      <div className="absolute top-1/2 inset-0 bg-linear-to-b from-transparent via-primary/50 via-40% to-primary to-100%" />

      {hasMultipleSlides && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 md:left-8 lg:left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-600/80 hover:bg-primary-500 flex items-center justify-center transition-colors cursor-pointer z-30"
          >
            <ChevronLeft size={24} className="text-primary-100" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 md:right-8 lg:right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary-600/80 hover:bg-primary-500 flex items-center justify-center transition-colors cursor-pointer z-30"
          >
            <ChevronRight size={24} className="text-primary-100" />
          </button>
        </>
      )}
    </section>
  )
}

export default Hero