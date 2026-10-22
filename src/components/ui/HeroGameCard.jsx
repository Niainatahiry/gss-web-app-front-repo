import { useNavigate } from 'react-router-dom'
import ProductInfoPanel from './ProductInfoPanel'

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

  return (
    <div
      onClick={handleClick}
      className="w-48 sm:w-40 md:w-48 lg:w-40 xl:w-48 2xl:w-54 shrink-0 @container group cursor-pointer"
    >
      {/* Game Image — Portrait, never covered by the panel */}
      <div className="relative w-full aspect-2/3 rounded-t-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow inset-ring-1 inset-ring-white/10">
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

      {/* Description Panel — sits below the cover, so it carries its own
          bottom radius (ProductCard relies on the card's overflow clip instead) */}
      <ProductInfoPanel
        className="rounded-b-sm"
        productName={productName}
        discount={resolvedDiscount}
        originalPrice={originalPrice}
        salePrice={salePrice}
        currency={currency}
        launcherLogo={launcherLogo}
      />
    </div>
  )
}

export default HeroGameCard
