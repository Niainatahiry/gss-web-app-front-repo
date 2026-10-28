/**
 * Mock promotion data — single source of truth for the promotional surfaces.
 *
 * `sidePromotions` feeds the two square rails shown beside "Populaires en ce
 * moment" on very wide screens (≥ 1800px). `specialPromotions` feeds the
 * SpecialPromo carousel. Both shapes mirror the future `GET /api/promotions`
 * payload, so when the Symfony endpoint is ready only the imports below need to
 * become a service call (same migration path as `src/data/products.js`).
 */

import promoPhantomBladeZero from '../assets/images/promotions/promo-phantom-blade-zero.jpg'
import promoArcRaiders from '../assets/images/promotions/promo-arc-raiders.jpg'
import fc27Banner from '../assets/images/promotions/special/fc27-banner.jpg'
import acShadowsBanner from '../assets/images/promotions/special/ac-shadows-banner.jpg'
import acShadowsStandardCover from '../assets/images/promotions/special/ac-shadows-standard.jpg'
import acShadowsDeluxeCover from '../assets/images/promotions/special/ac-shadows-deluxe.jpg'
import acShadowsPremiumCover from '../assets/images/promotions/special/ac-shadows-premium.jpg'
import duneAwakeningBanner from '../assets/images/promotions/special/dune-awakening-banner.jpg'
import duneAwakeningStandardCover from '../assets/images/promotions/special/dune-awakening-standard.jpg'
import duneAwakeningDeluxeCover from '../assets/images/promotions/special/dune-awakening-deluxe.jpg'
import duneAwakeningUltimateCover from '../assets/images/promotions/special/dune-awakening-ultimate.jpg'

/* FC27 covers are still hosted remotely — drop local files in
   `assets/images/promotions/special/` when they are available. */
const FC27_STANDARD_IMAGE =
  'https://athlonsports.com/.image/MjY6MDAwMDAwMDAxNDIwMzkz/ea-fc-27.png?profile=w2560&ar=16-9'
const FC27_DELUXE_IMAGE = 'https://pbs.twimg.com/media/HQuu88AWUAAPQCg.jpg'
const FC27_ULTIMATE_IMAGE =
  'https://storage.ghost.io/c/50/c6/50c61f91-0165-4605-93bc-f8598149e466/content/images/2026/07/FC-27-News-header-1.jpeg'

export const sidePromotions = [
  {
    id: 'phantom-blade-zero-2026-10',
    slot: 'left',
    position: 0,
    imageUrl: promoPhantomBladeZero,
    alt: 'Offre GSS — Phantom Blade Zero sur Steam PC : -10 % et backup offert',
    href: '/product/10',
    isActive: true,
    startsAt: null,
    endsAt: null,
  },
  {
    id: 'arc-raiders-2026-10',
    slot: 'right',
    position: 0,
    imageUrl: promoArcRaiders,
    alt: 'Offre GSS — ARC Raiders sur Steam PC : -30 % et backup offert',
    href: '/product/11',
    isActive: true,
    startsAt: null,
    endsAt: null,
  },
]

/**
 * Special-promo carousel — one entry per game.
 *
 *  - `banner`   wide strip shown above the cards (and per slide on mobile)
 *  - `cover`    single artwork used by the dimmed side slots on desktop
 *  - `editions` the three cards shown in the spotlight; on mobile only the
 *               edition with the biggest discount is rendered
 *
 * `SpecialPromo` sorts promotions by their best edition discount, so the
 * biggest deal leads on mobile and sits in the desktop spotlight.
 *
 * Prices are placeholders until merchandising signs them off.
 *
 * To add a game: drop `<slug>-banner` and one cover per edition in
 * `assets/images/promotions/special/`, import them above, then append an entry.
 * A Mafia: The Old Country banner is already optimized and waiting
 * (`mafia-old-country-banner.jpg`) for its landscape covers.
 */
export const specialPromotions = [
  {
    id: 'fc27',
    banner: {
      image: fc27Banner,
      alt: 'GSS — Offre Steam sur EA SPORTS FC 27',
      href: '/promotions/fc27',
    },
    cover: FC27_ULTIMATE_IMAGE,
    editions: [
      {
        id: 'fc27-standard',
        productType: 'Compte Steam',
        productName: 'EA SPORTS FC 27',
        edition: 'Standard Edition',
        imageUrl: FC27_STANDARD_IMAGE,
        discount: 25,
        originalPrice: 280000,
        salePrice: 210000,
      },
      {
        id: 'fc27-deluxe',
        productType: 'Compte Steam',
        productName: 'EA SPORTS FC 27',
        edition: 'Deluxe Edition',
        imageUrl: FC27_DELUXE_IMAGE,
        discount: 30,
        originalPrice: 350000,
        salePrice: 245000,
      },
      {
        id: 'fc27-ultimate',
        productType: 'Compte Steam',
        productName: 'EA SPORTS FC 27',
        edition: 'Ultimate Edition',
        imageUrl: FC27_ULTIMATE_IMAGE,
        discount: 35,
        originalPrice: 450000,
        salePrice: 292500,
      },
    ],
  },
  {
    id: 'ac-shadows',
    banner: {
      image: acShadowsBanner,
      alt: "GSS — Offre Steam sur Assassin's Creed Shadows",
      href: '/promotions/ac-shadows',
    },
    cover: acShadowsPremiumCover,
    editions: [
      {
        id: 'ac-shadows-standard',
        productType: 'Offre Steam',
        productName: "Assassin's Creed Shadows",
        edition: 'Standard Edition',
        imageUrl: acShadowsStandardCover,
        discount: 20,
        originalPrice: 380000,
        salePrice: 304000,
      },
      {
        id: 'ac-shadows-deluxe',
        productType: 'Offre Steam',
        productName: "Assassin's Creed Shadows",
        edition: 'Deluxe Edition',
        imageUrl: acShadowsDeluxeCover,
        discount: 25,
        originalPrice: 420000,
        salePrice: 315000,
      },
      {
        id: 'ac-shadows-premium',
        productType: 'Offre Steam',
        productName: "Assassin's Creed Shadows",
        edition: 'Premium Edition',
        imageUrl: acShadowsPremiumCover,
        discount: 30,
        originalPrice: 460000,
        salePrice: 322000,
      },
    ],
  },
  {
    id: 'dune-awakening',
    banner: {
      image: duneAwakeningBanner,
      alt: 'GSS — Offre Steam sur Dune: Awakening',
      href: '/promotions/dune-awakening',
    },
    cover: duneAwakeningUltimateCover,
    editions: [
      {
        id: 'dune-awakening-standard',
        productType: 'Offre Steam',
        productName: 'Dune: Awakening',
        edition: 'Standard Edition',
        imageUrl: duneAwakeningStandardCover,
        discount: 15,
        originalPrice: 340000,
        salePrice: 289000,
      },
      {
        id: 'dune-awakening-deluxe',
        productType: 'Offre Steam',
        productName: 'Dune: Awakening',
        edition: 'Deluxe Edition',
        imageUrl: duneAwakeningDeluxeCover,
        discount: 20,
        originalPrice: 380000,
        salePrice: 304000,
      },
      {
        id: 'dune-awakening-ultimate',
        productType: 'Offre Steam',
        productName: 'Dune: Awakening',
        edition: 'Ultimate Edition',
        imageUrl: duneAwakeningUltimateCover,
        discount: 25,
        originalPrice: 420000,
        salePrice: 315000,
      },
    ],
  },
]

const isLive = (promo, now) => {
  if (!promo.isActive) return false
  if (promo.startsAt && new Date(promo.startsAt) > now) return false
  if (promo.endsAt && new Date(promo.endsAt) < now) return false
  return true
}

/**
 * First live promotion for a rail, ordered by `position`.
 * Returns `null` when the slot has nothing to show.
 */
export function getPromotionForSlot(slot, now = new Date()) {
  return (
    sidePromotions
      .filter((promo) => promo.slot === slot && isLive(promo, now))
      .sort((a, b) => a.position - b.position)[0] ?? null
  )
}
