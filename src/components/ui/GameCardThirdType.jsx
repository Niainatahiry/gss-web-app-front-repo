import React from 'react'

function GameCardThirdType({
  productName,
  edition,
  imageUrl,
  discount,
  originalPrice,
  salePrice,
  currency = 'AR'
}) {
  return (
    <div className="group relative  overflow-hidden cursor-pointer transition-all duration-20 active:scale-[0.98]">
      {/* Header — Nom + Édition */}
        <div className="pt-3 pb-2 min-w-0">
            <h3 className="font-display text-sm text-primary-100 leading-tight truncate">
                {productName}{edition && ` ${edition}`}
            </h3>
        </div>

      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden">
        <img 
          src={imageUrl} 
          alt={productName} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle gradient overlay at bottom for price readability */}
        <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-primary-600/80 to-transparent" />
      </div>

      {/* Footer — Discount + Prices */}
      <div className="flex justify-end items-center">

        <div className="inline-flex items-center bg-primary-600">

            {/* Discount badge */}
            <span className="shrink-0 inline-flex px-3 py-2.5 items-center justify-center bg-green-500 text-white text-xs font-bold">
            -{discount}%
            </span>

            {/* Prices */}
            <div className="flex items-baseline gap-1.5 px-4">
                <span className="text-xs text-white/50 line-through">
                    {originalPrice.toLocaleString()}
                </span>
                <span className="font-mono text-sm text-white font-bold">
                    {salePrice.toLocaleString()} {currency}
                </span>
            </div>
        </div>
                
      </div>
    </div>
  )
}

export default GameCardThirdType