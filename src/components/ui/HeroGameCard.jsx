import { useNavigate } from 'react-router-dom'
import ProductInfoPanel from './ProductInfoPanel'
import Card from './Card'

function HeroGameCard({
  imageUrl = '/src/assets/hero.png',
  productName = 'FORZA HORIZON 6 STANDARD Edition',
  discount,
  originalPrice = 150000,
  salePrice = 89000,
  currency = 'AR',
  launcherLogo
}) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/product/1')
  }

  // Per-edition discount when none is provided (e.g. 300000 -> 195000 = 35%)
  const resolvedDiscount = discount ?? (originalPrice > 0
    ? Math.round((1 - salePrice / originalPrice) * 100)
    : 0)

  /* md/lg: one third of the parent row (which matches the promotion
     description width) minus the two `md:gap-4` gaps. Keep 2rem in sync
     with that gap. */
  return (
    <Card
      interactive
      radius="md"
      onClick={handleClick}
      className="group w-36 sm:w-40 md:w-[calc((100%_-_2rem)/3)] xl:w-44 2xl:w-54 shrink-0 @container overflow-hidden"
    >
      {/* Game Image — Portrait, never covered by the panel.
          No radius/shadow/ring of its own: the Card supplies the whole
          silhouette so cover + panel read as one surface. */}
      <div className="relative w-full aspect-2/3 overflow-hidden">
        <img
          src={imageUrl}
          alt={productName}
          className="w-full h-full object-cover transition-[filter] duration-300 group-hover:brightness-110"
        />

        {/* Glass shine — sweeps across the artwork on hover, cover only */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 -translate-x-[250%] bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[250%] motion-reduce:transition-none"
        />
      </div>

      {/* Description Panel — clipped by the card, so it carries no radius
          or shadow of its own */}
      <ProductInfoPanel
        productName={productName}
        discount={resolvedDiscount}
        originalPrice={originalPrice}
        salePrice={salePrice}
        currency={currency}
        launcherLogo={launcherLogo}
      />
    </Card>
  )
}

export default HeroGameCard
