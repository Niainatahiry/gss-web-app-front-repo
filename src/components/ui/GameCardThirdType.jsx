import Card from './Card'

function GameCardThirdType({
  productType,     
  productName,
  edition,
  imageUrl,
  discount,
  originalPrice,
  salePrice,
  currency = 'AR'
}) {
  return (
    <Card interactive radius="md" className="group relative overflow-hidden bg-tertiary-400">
      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden">
        <img 
          src={imageUrl} 
          alt={productName} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:brightness-110"
        />
        <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-primary-600/80 to-transparent" />
                {/* Glass shine — sweeps across the artwork on hover, cover only */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 -translate-x-[250%] bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[250%] motion-reduce:transition-none"
        />
      </div>

      {/* Header — Type + Nom + Édition */}
      <div className="flex flex-col px-3 py-3 gap-4 min-w-0">
        {productType && (
          <div className="flex justify-center items-center w-fit px-4 py-3 text-xs font-bold bg-tertiary-550 rounded-sm text-white uppercase tracking-wide ">
            {productType}
          </div>
        )}
        <h3 className="font-body font-semibold text-lg text-white leading-tight truncate">
          {productName}{edition && ` ${edition}`}
        </h3>
      </div>
      {/* Footer — Discount + Prices */}
      <div className="flex items-center border-t border-tertiary-600/20 px-3 pt-3 pb-3">
        <div className="inline-flex w-full justify-between items-center">
          <span className="shrink-0 inline-flex px-3 py-2.5 items-center justify-center bg-secondary rounded-sm text-secondary-700 text-base font-bold">
            -{discount}%
          </span>
          <div className="flex items-baseline gap-2 px-4">
            <span className="text-xl text-white/50 line-through">
              {originalPrice.toLocaleString()}
            </span>
            <span className="font-body text-2xl text-white font-bold">
              {salePrice.toLocaleString()} {currency}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default GameCardThirdType