import { useCallback, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import HeroGameCard from '../ui/HeroGameCard'
import PromotionDescription from '../ui/PromotionDescription'
import { onHeroAutoplayPause, onHeroAutoplayResume } from '../../utils/heroAutoplay'
import { formatAriary } from '../../utils/formatPrice'

const STEAM_LOGO = "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg"

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
        discount: 35,
        originalPrice: 300000,
        salePrice: 195000,
        currency: "AR",
        launcherLogo: STEAM_LOGO
      },
      {
        id: 2,
        imageUrl: "https://store-images.s-microsoft.com/image/apps.1471.13782753939064744.ecc264a7-2365-4110-b06e-a6f978c761d7.e0760a01-ad9a-4fce-bb5a-bbe691096d01",
        productName: "FORZA HORIZON 6 DELUXE Edition",
        discount: 44,
        originalPrice: 425000,
        salePrice: 240000,
        currency: "AR",
        launcherLogo: STEAM_LOGO
      },
      {
        id: 3,
        imageUrl: "https://store-images.s-microsoft.com/image/apps.60342.13547047233571036.013c5ec3-a5d7-4e8a-83e7-470299116376.2346f664-c01a-4b06-a92c-4819a43e8f75",
        productName: "FORZA HORIZON 6 PREMIUM Edition",
        discount: 42,
        originalPrice: 510000,
        salePrice: 295000,
        currency: "AR",
        launcherLogo: STEAM_LOGO
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
        discount: 40,
        originalPrice: 350000,
        salePrice: 210000,
        currency: "AR",
        launcherLogo: STEAM_LOGO
      },
      {
        id: 5,
        imageUrl: "https://store-images.s-microsoft.com/image/apps.26403.13995152356447586.3e46d8cd-8538-4377-826c-ab6ef69216af.2a425d27-aa3b-44f5-85c6-9424a736b7be",
        productName: "ELDEN RING DELUXE Edition",
        discount: 42,
        originalPrice: 480000,
        salePrice: 280000,
        currency: "AR",
        launcherLogo: STEAM_LOGO
      },
      {
        id: 6,
        imageUrl: "https://store-images.s-microsoft.com/image/apps.19413.14509973624768376.8012321a-394e-42b7-ba2b-040f89ebe965.a1419550-a86b-4ca1-9063-0b92a45c0604",
        productName: "ELDEN RING Shadow of the Erdtree Edition",
        discount: 40,
        originalPrice: 550000,
        salePrice: 330000,
        currency: "AR",
        launcherLogo: STEAM_LOGO
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
      discount: 28,
      originalPrice: 250000,
      salePrice: 180000,
      currency: "AR",
      launcherLogo: STEAM_LOGO
    },
    {
      id: 8,
      imageUrl: "https://store-images.s-microsoft.com/image/apps.27637.13724331513791367.30e3cd9a-beea-4797-8509-a950e1c1e48d.7f6d6861-aac4-4ec0-bcbf-42f8323c5bb0?",
      productName: "ARC RAIDERS Founder Edition",
      discount: 27,
      originalPrice: 320000,
      salePrice: 235000,
      currency: "AR",
      launcherLogo: STEAM_LOGO
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
  const SLIDE_DURATION = 500
  const RESET_DELAY = 800
  const CONTENT_FADE_DURATION = 250

  const totalSlides = slidesData.length
  const hasMultipleSlides = totalSlides > 1

  /* `slideIndex` runs over the extended list (real slides + one clone of the
     first) so the background can wrap around seamlessly. */
  const [slideIndex, setSlideIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)

  const slideIndexRef = useRef(0)
  const isResettingRef = useRef(false)
  const resetTimerRef = useRef(null)
  const isAutoplayPausedRef = useRef(false)
  const touchStartRef = useRef(null)

  const extendedSlides = hasMultipleSlides
    ? [...slidesData, slidesData[0]]
    : slidesData

  const activeSlideIndex = slideIndex % totalSlides

  /**
   * Warm the cache once on mount: every slide's background and card artwork is
   * fetched and decoded up front, so nothing gets decoded on the main thread
   * while the strip is sliding.
   */
  useEffect(() => {
    const urls = new Set(
      slidesData.flatMap((slide) => [
        slide.imageUrl,
        ...slide.games.map((game) => game.imageUrl),
        ...slide.games.map((game) => game.launcherLogo).filter(Boolean)
      ])
    )

    urls.forEach((url) => {
      const image = new Image()
      image.decoding = 'async'
      image.src = url
    })
  }, [])

  const nextSlide = useCallback(() => {
    if (!hasMultipleSlides || isResettingRef.current) return

    /* On the clone after wrapping: snap back to the real first slide without
       animating (same artwork), so the next click advances normally. */
    if (slideIndexRef.current >= totalSlides) {
      clearTimeout(resetTimerRef.current)
      isResettingRef.current = true
      setIsTransitioning(false)
      setSlideIndex(0)
      slideIndexRef.current = 0

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true)
          isResettingRef.current = false
        })
      })
      return
    }

    clearTimeout(resetTimerRef.current)

    const next = slideIndexRef.current + 1
    setIsTransitioning(true)
    setSlideIndex(next)
    slideIndexRef.current = next

    /* Reached the clone: after the slide settles, jump back to the real first
       slide with the transition disabled (invisible, same artwork). */
    if (next === totalSlides) {
      resetTimerRef.current = setTimeout(() => {
        isResettingRef.current = true
        setIsTransitioning(false)
        setSlideIndex(0)
        slideIndexRef.current = 0

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true)
            isResettingRef.current = false
          })
        })
      }, SLIDE_DURATION + RESET_DELAY)
    }
  }, [hasMultipleSlides, totalSlides])

  const prevSlide = useCallback(() => {
    if (!hasMultipleSlides || isResettingRef.current) return

    clearTimeout(resetTimerRef.current)

    /* On the clone after a wrap: slide back to the last real slide. */
    if (slideIndexRef.current >= totalSlides) {
      const prev = totalSlides - 1
      setIsTransitioning(true)
      setSlideIndex(prev)
      slideIndexRef.current = prev
      return
    }

    if (slideIndexRef.current === 0) {
      /* At the first slide: jump to the clone with no transition, then slide
         back to the last real slide. */
      isResettingRef.current = true
      setIsTransitioning(false)
      setSlideIndex(totalSlides)
      slideIndexRef.current = totalSlides

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true)
          setSlideIndex(totalSlides - 1)
          slideIndexRef.current = totalSlides - 1
          isResettingRef.current = false
        })
      })
      return
    }

    const prev = slideIndexRef.current - 1
    setIsTransitioning(true)
    setSlideIndex(prev)
    slideIndexRef.current = prev
  }, [hasMultipleSlides, totalSlides])

  /* Jump straight to a slide (dot navigation). */
  const goToSlide = useCallback(
    (index) => {
      if (!hasMultipleSlides || isResettingRef.current) return
      if (index === activeSlideIndex && slideIndexRef.current < totalSlides) return

      clearTimeout(resetTimerRef.current)

      /* On the clone after a wrap: snap to the target without animating. */
      if (slideIndexRef.current >= totalSlides) {
        isResettingRef.current = true
        setIsTransitioning(false)
        setSlideIndex(index)
        slideIndexRef.current = index

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setIsTransitioning(true)
            isResettingRef.current = false
          })
        })
        return
      }

      setIsTransitioning(true)
      setSlideIndex(index)
      slideIndexRef.current = index
    },
    [activeSlideIndex, hasMultipleSlides, totalSlides]
  )

  /* Swipe the hero to change slides. The cards no longer scroll, so there is
     no inner horizontal gesture to protect. */
  const handleTouchStart = (event) => {
    const touch = event.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleTouchEnd = (event) => {
    const start = touchStartRef.current
    touchStartRef.current = null
    if (!start) return

    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - start.x
    const deltaY = touch.clientY - start.y

    /* Ignore taps and mostly vertical gestures (page scrolling). */
    if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY) * 1.2) return

    if (deltaX < 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }

  /* Auto-advance. Skipped while the pointer sits over the header
     (see utils/heroAutoplay). */
  useEffect(() => {
    if (!hasMultipleSlides) return undefined

    const intervalId = setInterval(() => {
      if (isAutoplayPausedRef.current) return
      nextSlide()
    }, AUTO_SLIDE_INTERVAL)

    return () => {
      clearInterval(intervalId)
      clearTimeout(resetTimerRef.current)
    }
  }, [hasMultipleSlides, nextSlide])

  useEffect(() => {
    const pause = () => { isAutoplayPausedRef.current = true }
    const resume = () => { isAutoplayPausedRef.current = false }

    const removePause = onHeroAutoplayPause(pause)
    const removeResume = onHeroAutoplayResume(resume)

    return () => {
      removePause()
      removeResume()
    }
  }, [])

  return (
    <section
      className="relative w-full bg-tertiary-550"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background strip — slides horizontally. `willChange` is only set while
          a transition runs so the wide strip isn't kept as a layer when idle.
          On md+ the artwork is capped at 600px: the section height follows the
          content, so letting the image fill it would zoom and crop the artwork
          to a sliver. Below the cap, the page colour takes over. */}
      <div className="absolute inset-x-0 top-0 h-full overflow-hidden bg-primary-700 [contain:strict] md:h-[600px] xl:h-full">
        <div
          className="absolute inset-0 flex"
          style={{
            willChange: hasMultipleSlides && isTransitioning ? 'transform' : 'auto',
            transform: `translateX(-${slideIndex * 100}%)`,
            transition: hasMultipleSlides && isTransitioning
              ? `transform ${SLIDE_DURATION}ms ease-in-out`
              : 'none'
          }}
        >
          {extendedSlides.map((s, i) => (
            <img
              key={`${s.id}-${i}`}
              src={s.imageUrl}
              alt=""
              aria-hidden="true"
              decoding="async"
              className="w-full h-full object-cover shrink-0"
            />
          ))}
        </div>

        {/* Scrim — darkens bright artwork so the white text stays readable */}
        <div className="absolute inset-0 bg-tertiary-700/35" />
        <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/20 to-transparent" />

        {/* Bottom fade — anchored to the artwork's bottom edge, so it ends
            exactly where the page colour takes over below the 600px cap. */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-b from-transparent to-tertiary-550 sm:h-20 md:h-56 xl:h-64" />
      </div>

      {/* Content layers — all slides share one grid cell so the tallest slide
          defines the height, then they cross-fade in place. */}
      <div className="relative z-10 grid">
        {slidesData.map((slide, index) => {
          const isActive = index === activeSlideIndex
          const bestOffer = slide.games.reduce(
            (best, game) => (game.salePrice < best.salePrice ? game : best),
            slide.games[0]
          )

          return (
            <div
              key={slide.id}
              aria-hidden={!isActive}
              className={`[grid-area:1/1] min-w-0 transition-opacity ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              style={{ transitionDuration: `${CONTENT_FADE_DURATION}ms` }}
            >
              {/* < md — simplified: artwork + title + discount/price only. */}
              <div className="flex min-h-80 flex-col px-4 pt-28 pb-8 sm:min-h-88 sm:px-6 sm:pt-32 sm:pb-10 md:hidden">
                <p
                  className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-secondary"
                  style={{ textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}
                >
                  {slide.subtitle}
                </p>

                <div className="mt-1 flex flex-col items-start gap-2">
                  <h2
                    className="max-w-md font-heading text-4xl leading-none text-white uppercase sm:text-5xl"
                    style={{ textShadow: '0 2px 8px rgba(0,0,0,0.35)' }}
                  >
                    {slide.promotion.gameName}
                  </h2>
                  <span className="rounded-sm bg-secondary px-2.5 py-1 font-body text-sm font-black text-secondary-700">
                    -{bestOffer.discount}%
                  </span>
                </div>

                {/* Price card — bottom-right of the hero, glass surface like the header */}
                <div className="mt-auto flex w-full justify-end pt-6">
                  <div className="rounded-card px-4 py-3 backdrop-blur-xl ring-1 ring-white/10">
                    <p className="font-body text-[10px] uppercase tracking-[0.15em] text-white/60">
                      À partir de
                    </p>
                    <p className="font-display text-2xl font-bold leading-tight text-white">
                      {formatAriary(bestOffer.salePrice)}{' '}
                      <span className="font-body text-sm font-semibold">
                        {bestOffer.currency}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* ≥ md — centered, stacked composition: title, promo above the
                  three cards, all fully visible (no carousel scrolling). The
                  side-by-side desktop row returns at xl. */}
              <div className="hidden min-w-0 flex-col px-6 pt-40 pb-10 md:flex md:min-h-175 md:justify-center md:px-8 md:pt-48 xl:justify-between">
                <div className="mx-auto w-full max-w-7xl md:px-12 lg:px-20 xl:px-24 2xl:px-0">
                  <div className="text-center xl:text-left">
                    <p
                      className="font-heading text-3xl font-black text-white uppercase tracking-wider text-balance md:text-5xl 2xl:text-8xl"
                      style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.3)' }}
                    >
                      {slide.subtitle}
                    </p>
                    <h2
                      className="font-body text-lg font-bold text-white uppercase tracking-wide text-balance 2xl:text-xl"
                      style={{ textShadow: '0 2px 8px rgba(0,0,0,0.3), 0 0 20px rgba(0,0,0,0.3)' }}
                    >
                      {slide.title}
                    </h2>
                  </div>
                </div>

                <div className="mx-auto mt-6 w-full max-w-7xl md:px-12 md:mt-8 lg:px-20 xl:px-24 2xl:px-0">
                  <div className="flex flex-col items-center gap-8 xl:flex-row xl:items-end xl:gap-10">

                    {/* md/lg: the row is exactly as wide as the promotion
                        block, so three cards + two gaps span it edge to edge.
                        (Card width is derived from this in HeroGameCard.) */}
                    <div
                      className="flex w-full justify-center gap-3 md:max-w-2xl md:gap-4 xl:min-w-0 xl:max-w-none xl:flex-1 xl:justify-start"
                    >
                      {slide.games.map(game => (
                        <HeroGameCard key={game.id} {...game} />
                      ))}
                    </div>

                    <div className="w-full shrink-0 md:max-w-2xl xl:w-auto">
                      <PromotionDescription {...slide.promotion} />
                    </div>

                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile: dots. Tablet/desktop: the previous side arrows. */}
      {hasMultipleSlides && (
        <>
          <div
            className="relative z-20 flex justify-center gap-2 pb-6 md:hidden"
            role="group"
            aria-label="Navigation des promotions"
          >
            {slidesData.map((slide, index) => {
              const isActive = index === activeSlideIndex

              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`Aller à la promotion ${index + 1}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`h-2 cursor-pointer rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-tertiary-550 ${
                    isActive ? 'w-6 bg-white' : 'w-2 bg-white/30 hover:bg-white/60'
                  }`}
                />
              )
            })}
          </div>

          <button
            type="button"
            aria-label="Slide précédent"
            onClick={prevSlide}
            className="absolute left-1 top-1/2 z-30 hidden -translate-y-1/2 p-2 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] transition-all duration-200 hover:-translate-x-0.5 hover:text-secondary-100 md:flex md:left-2"
          >
            <FontAwesomeIcon icon={faAngleLeft} className="text-5xl md:text-6xl" />
          </button>
          <button
            type="button"
            aria-label="Slide suivant"
            onClick={nextSlide}
            className="absolute right-1 top-1/2 z-30 hidden -translate-y-1/2 p-2 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] transition-all duration-200 hover:translate-x-0.5 hover:text-secondary-100 md:flex md:right-2"
          >
            <FontAwesomeIcon icon={faAngleRight} className="text-5xl md:text-6xl" />
          </button>
        </>
      )}
    </section>
  )
}

export default Hero