import { getPromotionForSlot } from '../../data/promotions'
import PromoThumbnail from '../ui/PromoThumbnail'
import { cn } from '../../lib/cn'

const RAIL_LABELS = {
  left: 'Promotion à gauche',
  right: 'Promotion à droite',
}

/**
 * Promotional rail beside the "Populaires en ce moment" card grid.
 *
 * Mounted by PopularGames as a child of its card grid (see the `sideRails`
 * prop) and positioned outside the 1280px column, so it never affects the
 * section's width and starts exactly where the cards start — no spacer needed.
 *
 * Width comes from the `--rail-size` variable set by PopularGames: the free
 * margin, capped by the card grid height, so the square grows with the screen
 * but never runs past the cards. It falls back to 18rem before that first
 * measurement. Hidden below 1920px, where there is no room for it. Rendering
 * returns `null` when the slot has no live promotion, so nothing is reserved.
 */
function SidePromotions({ slot, className }) {
  const promo = getPromotionForSlot(slot)

  if (!promo) return null

  return (
    <aside
      aria-label={RAIL_LABELS[slot] ?? 'Promotion'}
      className={cn('hidden min-[1920px]:block w-[var(--rail-size,18rem)]', className)}
    >
      <PromoThumbnail imageUrl={promo.imageUrl} alt={promo.alt} href={promo.href} />
    </aside>
  )
}

export default SidePromotions
