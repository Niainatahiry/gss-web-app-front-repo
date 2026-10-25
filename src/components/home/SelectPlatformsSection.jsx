import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Monitor } from 'lucide-react'
import Button from '../ui/Button'
import IconButton from '../ui/IconButton'
import PlaystationLogo from '../../assets/logos/consoleLogos/playstation.svg?react'
import XboxLogo from '../../assets/logos/consoleLogos/Xbox_Logo.svg?react'
import NintendoLogo from '../../assets/logos/consoleLogos/Nintendo_Switch_Logo.svg?react'

const platforms = [
  { name: 'PC', Icon: Monitor },
  { name: 'PlayStation', Icon: PlaystationLogo },
  { name: 'Xbox', Icon: XboxLogo },
  { name: 'Nintendo Switch', Icon: NintendoLogo },
]

function SelectPlatformsSection() {
  const scrollerRef = useRef(null)
  const [canScroll, setCanScroll] = useState(false)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  /* Arrows only exist while the track actually overflows, so the section stays
     a plain centered row on large screens and becomes a carousel when the
     cards no longer fit (more platforms, narrower viewport). */
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

  const scrollByCard = (direction) => {
    const el = scrollerRef.current
    if (!el) return

    const track = el.firstElementChild
    if (!track) return

    const firstCard = track.firstElementChild
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const step = (firstCard?.getBoundingClientRect().width || el.clientWidth * 0.8) + gap

    el.scrollBy({ left: direction * step, behavior: 'smooth' })
  }

  const arrowClass = 'w-9 h-9 shrink-0 rounded-full'

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0">
      <div className="flex items-center gap-2 sm:gap-4">
        {canScroll && (
          <IconButton
            variant="surface"
            onClick={() => scrollByCard(-1)}
            disabled={atStart}
            aria-label="Faire défiler les plateformes vers la gauche"
            className={arrowClass}
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </IconButton>
        )}

        <div
          ref={scrollerRef}
          onScroll={syncScrollState}
          className="
            min-w-0 flex-1
            overflow-x-auto scroll-smooth motion-reduce:scroll-auto
            snap-x snap-mandatory py-1
            [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
          "
        >
          {/* w-max + mx-auto keeps the row centered while it fits and falls
              back to a left-aligned track once it overflows (auto margins
              collapse instead of clipping the first card). */}
          <div className="mx-auto flex w-max gap-3 sm:gap-8">
            {platforms.map(({ name, Icon }) => (
              <Button
                key={name}
                variant="ghost"
                shape="none"
                className="group w-28 h-28 shrink-0 snap-start flex-col gap-2 rounded-card bg-white/5 text-white hover:bg-white/[0.02] hover:text-white"
              >
                <Icon
                  className="
                    w-9 h-9
                    opacity-70
                    group-hover:opacity-100
                    transition-opacity
                  "
                />

                <span className="text-xs font-medium text-center">
                  {name}
                </span>
              </Button>
            ))}
          </div>
        </div>

        {canScroll && (
          <IconButton
            variant="surface"
            onClick={() => scrollByCard(1)}
            disabled={atEnd}
            aria-label="Faire défiler les plateformes vers la droite"
            className={arrowClass}
          >
            <ChevronRight size={18} strokeWidth={2} />
          </IconButton>
        )}
      </div>
    </section>
  )
}

export default SelectPlatformsSection
