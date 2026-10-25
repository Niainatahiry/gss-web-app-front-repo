import ProductInfoPanel from './ProductInfoPanel'
import Card from './Card'

function ProductCard({
  imageUrl,
  productName,
  discount,
  originalPrice,
  salePrice,
  currency,
  launcherLogo
}) {
  return (
    <Card
      interactive
      radius="sm"
      className="@container relative w-full aspect-2/3 overflow-hidden group"
    >
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={productName}
        className="absolute inset-0 w-full h-full object-cover transition-[filter] duration-300 group-hover:brightness-110"
      />

      {/* Glass shine — sweeps across the artwork on hover, stays under the panel */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 translate-x-[-250%] bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[250%] motion-reduce:transition-none"
      />

      {/* Description Panel */}
      <div className="absolute bottom-0 left-0 right-0">
        <ProductInfoPanel
          productName={productName}
          discount={discount}
          originalPrice={originalPrice}
          salePrice={salePrice}
          currency={currency}
          launcherLogo={launcherLogo}
        />
      </div>
    </Card>
  )
}

export default ProductCard
