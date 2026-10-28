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
  /* Sizes are container-driven: the spotlight narrows these cards to ~195px on
     lg, while mobile renders the very same markup at full width. */
  return (
    <Card interactive radius="md" className="@container group relative overflow-hidden bg-tertiary-400">
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
      <div className="flex flex-col min-w-0 px-2 py-2 gap-2 @min-[220px]:px-3 @min-[220px]:py-3 @min-[220px]:gap-4">
        {productType && (
          <div className="flex justify-center items-center w-fit rounded-sm bg-tertiary-550 text-white uppercase tracking-wide font-bold px-2 py-1 text-[10px] @min-[220px]:px-3 @min-[220px]:py-2 @min-[220px]:text-[11px] @min-[300px]:px-4 @min-[300px]:py-3 @min-[300px]:text-xs">
            {productType}
          </div>
        )}
        <h3 className="font-body font-semibold text-white leading-tight truncate text-sm @min-[220px]:text-[13px] @min-[300px]:text-base @min-[340px]:text-lg">
          {productName}{edition && ` ${edition}`}
        </h3>
      </div>
      {/* Footer — Discount + Prices */}
      <div className="flex items-center border-t border-tertiary-600/20 px-1.5 pt-1.5 pb-1.5 @min-[220px]:px-2 @min-[220px]:pt-2 @min-[220px]:pb-2 @min-[300px]:px-3 @min-[300px]:pt-3 @min-[300px]:pb-3">
        <div className="inline-flex w-full justify-between items-center gap-1">
          <span className="shrink-0 inline-flex items-center justify-center rounded-sm bg-secondary text-secondary-700 font-bold px-1.5 py-1 text-[10px] @min-[220px]:px-2.5 @min-[220px]:py-2 @min-[220px]:text-xs @min-[300px]:px-3 @min-[300px]:py-2.5 @min-[300px]:text-base">
            -{discount}%
          </span>
          <div className="flex items-baseline gap-1 px-1 @min-[220px]:gap-2 @min-[220px]:px-2 @min-[300px]:px-4">
            <span className="text-white/50 line-through whitespace-nowrap text-[10px] @min-[220px]:text-xs @min-[300px]:text-lg @min-[340px]:text-xl">
              {originalPrice.toLocaleString()}
            </span>
            <span className="font-body text-white font-bold whitespace-nowrap text-xs @min-[220px]:text-base @min-[300px]:text-xl @min-[340px]:text-2xl">
              {salePrice.toLocaleString()} {currency}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default GameCardThirdType
