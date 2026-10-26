import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import TestimonialCard from '../ui/TestimonialCard'
import StarRating from '../ui/StarRating'
import IconButton from '../ui/IconButton'

// ── JSON Data — Real Facebook Reviews (anonymized) ──
const testimonialsData = [
  {
    id: 1,
    username: "Yohan R",
    avatar: null,
    gamePurchased: "Compte Steam Assassin's Creed IV: Black Flag Resynced",
    rating: 5,
    testimonial: "Je recommande, mahay mandray olona sady milamina tsara ny achat.",
    gameName: "Assassin's Creed IV: Black Flag Resynced",
    genre: ["Action", "Aventure", "Open World"],
    platform: "PC",
    launcher: "Steam"
  },
  {
    id: 2,
    username: "Xavier E",
    avatar: null,
    gamePurchased: "Compte Steam EA SPORTS FC 26",
    rating: 5,
    testimonial: "Je recommande vivement, c'est super fiable.",
    gameName: "EA SPORTS FC 26",
    genre: ["Sport", "Simulation", "Multiplayer"],
    platform: "PC",
    launcher: "Steam"
  },
  {
    id: 3,
    username: "Nambinintsoa R",
    avatar: null,
    gamePurchased: "Compte Steam EA SPORTS FC 26",
    rating: 5,
    testimonial: "Merci fa milamina tsara ilay FC 26 azo antoka tsara ny achat à distance.",
    gameName: "EA SPORTS FC 26",
    genre: ["Sport", "Simulation", "Multiplayer"],
    platform: "PC",
    launcher: "Steam"
  },
  {
    id: 4,
    username: "Anthony S",
    avatar: null,
    gamePurchased: "Compte Steam EA SPORTS FC 26",
    rating: 5,
    testimonial: "Un grand merci pour le jeu ! Super fiable, rapide et sans aucune prise de tête. Je recommande les yeux fermés !",
    gameName: "EA SPORTS FC 26",
    genre: ["Sport", "Simulation", "Multiplayer"],
    platform: "PC",
    launcher: "Steam"
  },
]

const AUTO_ADVANCE_MS = 5200

/* Auto-rotation must never fight accessibility: if the visitor asked the OS
   for reduced motion, the carousel becomes fully manual. */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(query.matches)

    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return reduced
}

function TestimonialsSection() {
  const scrollerRef = useRef(null)
  const [canScroll, setCanScroll] = useState(false)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  const averageRating = (
    testimonialsData.reduce((sum, item) => sum + item.rating, 0) /
    testimonialsData.length
  )
  const averageLabel = averageRating.toFixed(1).replace('.', ',')

  /* Arrows only exist while the track actually overflows — otherwise the
     section stays a calm row of cards. */
  const syncScrollState = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return

    const maxScroll = el.scrollWidth - el.clientWidth
    setCanScroll(maxScroll > 1)
    setAtStart(el.scrollLeft <= 1)
    setAtEnd(el.scrollLeft >= maxScroll - 1)
  }, [])

  useLayoutEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    syncScrollState()

    const observer = new ResizeObserver(syncScrollState)
    observer.observe(el)
    if (el.firstElementChild) observer.observe(el.firstElementChild)

    return () => observer.disconnect()
  }, [syncScrollState])

  const scrollByCard = useCallback(
    (direction, { loop = false } = {}) => {
      const el = scrollerRef.current
      if (!el) return

      const track = el.firstElementChild
      const firstCard = track?.firstElementChild
      const gap = parseFloat(getComputedStyle(track).columnGap) || 0
      const step = (firstCard?.getBoundingClientRect().width || el.clientWidth * 0.8) + gap
      const behavior = prefersReducedMotion ? 'auto' : 'smooth'

      const maxScroll = el.scrollWidth - el.clientWidth

      // Auto-play wraps around; manual navigation stops at the edges.
      if (loop && direction > 0 && el.scrollLeft >= maxScroll - 2) {
        el.scrollTo({ left: 0, behavior })
        return
      }

      el.scrollBy({ left: direction * step, behavior })
    },
    [prefersReducedMotion]
  )

  useEffect(() => {
    if (!canScroll || isPaused || prefersReducedMotion) return

    const timer = window.setInterval(() => scrollByCard(1, { loop: true }), AUTO_ADVANCE_MS)
    return () => window.clearInterval(timer)
  }, [canScroll, isPaused, prefersReducedMotion, scrollByCard])

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      scrollByCard(-1)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      scrollByCard(1)
    }
  }

  return (
    <section className="w-full overflow-x-clip bg-primary-100/5 py-10 sm:py-12 md:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0">
        {/* Editorial banner — giant opening quote + section label */}
        <div className="flex justify-start text-secondary">
          <FontAwesomeIcon
            icon={faQuoteLeft}
            aria-hidden="true"
            className="-ml-1 text-5xl sm:-ml-2 sm:text-6xl xl:-ml-3 xl:text-8xl"
          />
        </div>

        <p className="font-heading text-4xl leading-none text-white/80 sm:text-5xl xl:text-7xl">
          témoignages
        </p>

        <div className="mt-8 grid items-start gap-8 sm:mt-10 lg:grid-cols-[minmax(240px,300px)_minmax(0,1fr)] lg:gap-10 xl:mt-14 xl:gap-14">

          {/* Static rail — never moves while the cards slide */}
          <div className="flex flex-col items-start">

            <h2 className="font-heading text-3xl leading-[1.05] text-white/80 sm:text-3xl md:text-4xl">
              Que disent{' '}
              <br />
              Nos clients&nbsp;?
            </h2>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Des avis authentiques de vrais joueurs, des achats vérifiés.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <StarRating count={Math.round(averageRating)} size="sm" />
              <span className="font-display text-sm font-semibold text-white/90">
                {averageLabel}/5
              </span>
            </div>

            <p className="mt-1 text-xs text-white/50">
              Basé sur {testimonialsData.length} avis clients
            </p>


          </div>

          {/* Carousel — pauses on hover and keyboard focus */}
          <div
            className="relative min-w-0"
            onPointerEnter={() => setIsPaused(true)}
            onPointerLeave={() => setIsPaused(false)}
            onFocusCapture={() => setIsPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false)
            }}
          >

            {/* Edge fades — stay in place; the track stops before them */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-linear-to-r from-[#1C515E] to-transparent sm:w-20"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-linear-to-l from-[#1C515E] to-transparent sm:w-20"
            />

            <div
              ref={scrollerRef}
              role="region"
              aria-roledescription="carrousel"
              aria-label="Avis de nos clients"
              tabIndex={0}
              onScroll={syncScrollState}
              onKeyDown={handleKeyDown}
              className="
                flex items-stretch overflow-x-auto
                snap-x snap-mandatory scroll-pl-12 sm:scroll-pl-20
                pb-2 pt-3
                [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-4 focus-visible:ring-offset-tertiary-550
              "
            >
              <div className="flex w-max gap-5 pl-12 pr-12 sm:pl-20 sm:pr-20">
                {testimonialsData.map((testimonial, index) => (
                  <TestimonialCard
                    key={testimonial.id}
                    data={testimonial}
                    index={index}
                  />
                ))}
              </div>
            </div>

            {canScroll && (
              <>
                <IconButton
                  variant="surface"
                  onClick={() => scrollByCard(-1)}
                  disabled={atStart}
                  aria-label="Avis précédents"
                  className="absolute left-0 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 rounded-full border border-white/10 bg-primary-700/85 backdrop-blur lg:-left-10 lg:inline-flex xl:-left-12"
                >
                  <ChevronLeft size={18} strokeWidth={2} />
                </IconButton>

                <IconButton
                  variant="surface"
                  onClick={() => scrollByCard(1)}
                  disabled={atEnd}
                  aria-label="Avis suivants"
                  className="absolute right-0 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 rounded-full border border-white/10 bg-primary-700/85 backdrop-blur lg:-right-6 lg:inline-flex xl:right-1"
                >
                  <ChevronRight size={18} strokeWidth={2} />
                </IconButton>
              </>
            )}

          </div>

        </div>

        {/* Closing quote — frames the section from the bottom right. */}
        <div className="mt-4 flex justify-end text-secondary sm:mt-6 xl:mt-8">
          <FontAwesomeIcon
            icon={faQuoteRight}
            aria-hidden="true"
            className="-mr-1 text-5xl sm:-mr-2 sm:text-6xl xl:-mr-6 xl:text-8xl"
          />
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
