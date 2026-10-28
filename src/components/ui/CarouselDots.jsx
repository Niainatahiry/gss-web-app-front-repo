import { cn } from '../../lib/cn'

/**
 * Dot indicator shared by every home-page carousel (Hero, SpecialPromo,
 * PopularGames) so the pattern is identical everywhere: brand-accent pill for
 * the active slide, small translucent dot for the others.
 *
 * The visible dot stays 8px tall (24px wide when active) and sits inside a
 * 24x32px button, so the tap target is comfortable on mobile while the row
 * itself is 32px tall. Callers that used to render an 8px tall row should
 * subtract 12px (3 Tailwind steps) from their own vertical margin/padding to
 * keep the previous visual rhythm.
 */
function CarouselDots({ count, activeIndex, onSelect, getLabel, groupLabel, className }) {
  return (
    <div
      role="group"
      aria-label={groupLabel}
      className={cn('flex items-center justify-center gap-2', className)}
    >
      {Array.from({ length: count }, (_, index) => {
        const isActive = index === activeIndex

        return (
          <button
            key={index}
            type="button"
            onClick={() => onSelect?.(index)}
            aria-label={getLabel?.(index)}
            aria-current={isActive ? 'true' : undefined}
            className="group flex h-8 w-6 shrink-0 cursor-pointer items-center justify-center focus-visible:outline-none"
          >
            <span
              className={cn(
                'h-2 rounded-full transition-all duration-300 motion-reduce:transition-none',
                'group-focus-visible:ring-2 group-focus-visible:ring-white/70',
                'group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-primary',
                isActive
                  ? 'w-6 bg-secondary'
                  : 'w-2 bg-white/30 group-hover:bg-white/60'
              )}
            />
          </button>
        )
      })}
    </div>
  )
}

export default CarouselDots
