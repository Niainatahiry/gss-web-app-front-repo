import React from 'react'

function formatAriary(amount) {
  // Format with dot as thousands separator, no decimal places
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

function HeroGameCard({ 
  imageUrl = '/src/assets/hero.png',
  productName = 'FORZA HORIZON 6 STANDARD Edition',
  originalPrice = 150000,
  salePrice = 89000,
  currency = 'AR'
}) {
  return (
<div className="w-32 sm:w-40 md:w-48 lg:w-40 xl:w-48 2xl:w-54 shrink-0 flex flex-col items-start overflow-hidden cursor-pointer">
      {/* Game Image — Portrait */}
      <div className="relative w-full aspect-2/3 rounded-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
        <img 
          src={imageUrl} 
          alt={productName}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <div className="pt-2 sm:pt-2 xl:pt-3 flex flex-col justify-items-start gap-1">
        {/* Product Name */}
        <h3 className="font-display text-[10px] sm:text-xs xl:text-xs 2xl:text-xs font-bold text-primary-100 uppercase tracking-wide line-clamp-6">
          {productName}
        </h3>

        <span className="font-body text-base sm:text-lg xl:text-lg 2xl:text-xl font-bold text-primary-400 line-through tracking-tight">
          {formatAriary(originalPrice)} AR
        </span>

        <span className="font-body text-sm sm:text-base xl:text-base 2xl:text-lg font-bold text-green-400 tracking-tight">
          {formatAriary(salePrice)} AR
        </span>
      </div>
    </div>
  )
}

export default HeroGameCard