import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import GameCardThirdType from '../ui/GameCardThirdType'
import CarouselDots from '../ui/CarouselDots'
import { cn } from '../../lib/cn'
import { specialPromotions } from '../../data/promotions'

/* Matches Tailwind's `lg`. Below it the section is a one-promotion-per-view
   swipe track, above it the spotlight with dimmed neighbour covers. */
const LG_BREAKPOINT = 1024

/* Neighbour cards keep a constant width; only their height follows the
   spotlight block, which is measured at runtime (see the layout effect). */
const SIDE_CARD_HEIGHT_RATIO = 0.9
const SIDE_CARD_MIN_HEIGHT = 150
const SIDE_CARD_MAX_HEIGHT = 620

/** Distance between two slides, gap included. */
function getSlideStep(track) {
  const [first, second] = track.children
  if (first && second) return second.offsetLeft - first.offsetLeft
  return first?.offsetWidth ?? 0
}

/** Edition with the biggest discount — the single card shown on mobile. */
function getFeaturedEdition(promo) {
  return promo.editions.reduce(
    (best, edition) => (edition.discount > best.discount ? edition : best),
    promo.editions[0]
  )
}

function getPromotionTitle(promo) {
  return promo.editions[0]?.productName ?? 'cette promotion'
}

function PromotionBanner({ banner, eager = false }) {
  return (
    <a
      href={banner.href}
      className="group block w-full overflow-hidden rounded-sm"
    >
      <img
        src={banner.image}
        alt={banner.alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="block h-auto w-full transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:transition-none"
      />
    </a>
  )
}

/**
 * Dimmed neighbour on desktop — cover art only. Clicking anywhere (or the
 * chevron on its inner edge) brings that promotion to the middle.
 *
 * Width stays fixed; the height comes from `--side-card-h`, set by the
 * carousel to a share of the spotlight block's height. A percentage height
 * cannot be used here: the side slot has no definite height of its own.
 */
function SidePromotion({ promo, direction, onSelect }) {
  const isPrev = direction === 'prev'

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={`Afficher la promotion ${getPromotionTitle(promo)}`}
      className={cn(
        'group/card relative hidden xl:block h-(--side-card-h,150px) w-148 shrink-0 cursor-pointer overflow-hidden',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary',
        /* Fade only the exterior edge, so the artwork blends into the page
           instead of being cut by the viewport. */
        isPrev
          ? 'mask-[linear-gradient(to_right,transparent_0,black_45%)]'
          : 'mask-[linear-gradient(to_left,transparent_0,black_45%)]'
      )}
    >
      <img
        key={promo.id}
        src={promo.cover}
        alt=""
        decoding="async"
        className={cn(
          'absolute inset-0 h-full w-full object-cover',
          isPrev ? 'object-right' : 'object-left',
          'opacity-50 saturate-50 transition-[opacity,filter] duration-500',
          'group-hover/card:opacity-95 group-hover/card:saturate-100',
          'group-has-[.chevron:hover]:opacity-95 group-has-[.chevron:hover]:saturate-100',
          'motion-reduce:transition-none'
        )}
      />

      <span
        aria-hidden="true"
        className="absolute inset-0 bg-primary-700/25 transition-opacity duration-300 group-hover/card:opacity-30 group-has-[.chevron:hover]:opacity-30 motion-reduce:transition-none"
      />
    </button>
  )
}

/**
 * Bare arrow, same language as the Hero slider but smaller and without the
 * circular surface. Rendered inside the side slots on wide screens (outside
 * the spotlight) and over the banner only when there is no gutter at all.
 */
function NavChevron({ direction, onClick, className }) {
  const Icon = direction === 'prev' ? ChevronLeft : ChevronRight
  const isPrev = direction === 'prev'

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isPrev ? 'Promotion précédente' : 'Promotion suivante'}
      className={cn(
        'chevron flex shrink-0 cursor-pointer items-center justify-center text-white/85',
        'drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)] transition-transform duration-200 motion-reduce:transition-none',
        'hover:text-secondary',
        isPrev ? 'hover:-translate-x-0.5' : 'hover:translate-x-0.5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-primary-700',
        className
      )}
    >
      <Icon className="h-11 w-11 lg:h-16 lg:w-16  2xl:h-12 2xl:w-12" strokeWidth={2.5} />
    </button>
  )
}

function SpecialPromo() {
  const promotions = useMemo(
    () =>
      [...specialPromotions]
        .map((promo) => ({ ...promo, featured: getFeaturedEdition(promo) }))
        .sort((a, b) => (b.featured?.discount ?? 0) - (a.featured?.discount ?? 0)),
    []
  )
  const count = promotions.length

  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef(null)
  const scrollFrameRef = useRef(0)
  const rowRef = useRef(null)
  const spotlightRef = useRef(null)

  const goTo = useCallback(
    (index) => {
      if (!count) return

      const next = ((index % count) + count) % count
      setActiveIndex(next)

      const track = trackRef.current
      if (!track || !track.clientWidth) return

      const step = getSlideStep(track)
      if (step) track.scrollTo({ left: next * step, behavior: 'smooth' })
    },
    [count]
  )

  /* Mobile: derive the active promotion from the slide closest to the track
     start. rAF-throttled so a swipe does not set state on every scroll event. */
  const handleTrackScroll = useCallback(() => {
    if (scrollFrameRef.current) return

    scrollFrameRef.current = requestAnimationFrame(() => {
      scrollFrameRef.current = 0
      const track = trackRef.current
      if (!track) return

      const step = getSlideStep(track)
      if (!step) return

      const index = Math.min(count - 1, Math.max(0, Math.round(track.scrollLeft / step)))
      setActiveIndex((prev) => (prev === index ? prev : index))
    })
  }, [count])

  useEffect(
    () => () => {
      if (scrollFrameRef.current) cancelAnimationFrame(scrollFrameRef.current)
    },
    []
  )

  /* Re-align the swipe track when the viewport crosses back into the mobile
     breakpoint (e.g. after a desktop resize), using the shared active promo. */
  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${LG_BREAKPOINT - 1}px)`)

    const syncTrack = (matches) => {
      if (!matches) return

      const track = trackRef.current
      if (!track) return

      const step = getSlideStep(track)
      if (step) track.scrollTo({ left: activeIndex * step, behavior: 'auto' })
    }

    const handleChange = (event) => syncTrack(event.matches)

    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [activeIndex])

  /* Desktop: the neighbour cards keep a fixed width, but grow to a share of the
     spotlight block's height. Measured and written to a CSS variable — no
     state, so resizing never re-renders the carousel. */
  useLayoutEffect(() => {
    const row = rowRef.current
    const spotlight = spotlightRef.current
    if (!row || !spotlight) return undefined

    const measure = () => {
      const { height } = spotlight.getBoundingClientRect()
      if (!height) return // display:none below lg

      const next = Math.max(
        SIDE_CARD_MIN_HEIGHT,
        Math.min(height * SIDE_CARD_HEIGHT_RATIO, SIDE_CARD_MAX_HEIGHT)
      )
      row.style.setProperty('--side-card-h', `${Math.floor(next)}px`)
    }

    measure()

    const observer = new ResizeObserver(measure)
    observer.observe(spotlight)
    window.addEventListener('resize', measure)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  if (!count) return null

  const current = Math.min(activeIndex, count - 1)
  const activePromo = promotions[current]

  /* A single neighbour would repeat itself on both sides, so the spotlight
     only grows side slots when there are at least three promotions. */
  const showSides = count >= 3
  const prevPromo = showSides ? promotions[(current - 1 + count) % count] : null
  const nextPromo = showSides ? promotions[(current + 1) % count] : null

  return (
    <div className="overflow-x-clip pb-4 pt-8">
      {/* < lg — one promotion per view: banner + its biggest-discount edition */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 lg:hidden">
        <div
          ref={trackRef}
          onScroll={handleTrackScroll}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {promotions.map((promo, index) => (
            <div key={promo.id} className="w-full shrink-0 snap-start">
              <PromotionBanner banner={promo.banner} eager={index === 0} />
              <div className="mt-4">
                <GameCardThirdType {...promo.featured} />
              </div>
            </div>
          ))}
        </div>

        {count > 1 && (
          <CarouselDots
            count={promotions.length}
            activeIndex={current}
            onSelect={goTo}
            getLabel={(index) => `Afficher la promotion ${getPromotionTitle(promotions[index])}`}
            groupLabel="Choisir une promotion"
            className="mt-2"
          />
        )}
      </div>

      {/* lg+ — center aligned with every other home section; the neighbour
          covers sit in the margins and fade into the page at the screen edge */}
      <div className="hidden lg:block">
        <div ref={rowRef} className="flex justify-center">
          <div className="group @container flex min-w-0 flex-1 basis-0 items-center justify-end gap-5 overflow-hidden pr-1">
            {prevPromo && (
              <SidePromotion
                promo={prevPromo}
                direction="prev"
                onSelect={() => goTo(current - 1)}
              />
            )}

            {count > 1 && (
              <NavChevron
                direction="prev"
                onClick={() => goTo(current - 1)}
                className="hidden 2xl:flex"
              />
            )}
          </div>

          <div
            ref={spotlightRef}
            className="w-7xl max-w-full shrink-0 px-4 sm:px-6 md:px-8 lg:px-16 xl:w-280 xl:px-16 2xl:px-6 min-[1920px]:w-7xl"
          >
            <div className="relative">
              {count > 1 && (
                <>
                  <NavChevron
                    direction="prev"
                    onClick={() => goTo(current - 1)}
                    className="absolute -left-14 top-1/2 z-10 -translate-y-1/2 2xl:hidden"
                  />

                  <NavChevron
                    direction="next"
                    onClick={() => goTo(current + 1)}
                    className="absolute -right-14 top-1/2 z-10 -translate-y-1/2 2xl:hidden"
                  />
                </>
              )}

              <div
                key={activePromo.id}
                className="transition-opacity duration-300 starting:opacity-0 motion-reduce:transition-none"
              >
                <PromotionBanner banner={activePromo.banner} eager />
                <div className="mt-8 grid grid-cols-3 gap-4">
                  {activePromo.editions.map((edition) => (
                    <GameCardThirdType key={edition.id} {...edition} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="group @container flex min-w-0 flex-1 basis-0 items-center justify-start gap-5 overflow-hidden pl-1">
            {count > 1 && (
              <NavChevron
                direction="next"
                onClick={() => goTo(current + 1)}
                className="hidden 2xl:flex"
              />
            )}

            {nextPromo && (
              <SidePromotion
                promo={nextPromo}
                direction="next"
                onSelect={() => goTo(current + 1)}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpecialPromo
