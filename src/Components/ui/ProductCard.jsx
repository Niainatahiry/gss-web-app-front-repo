import React from 'react'

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
    <div className="relative w-full aspect-2/3 rounded-sm overflow-hidden group cursor-pointer">
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={productName}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Dark gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      {/* Glassmorphism Description Panel */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="backdrop-blur-md rounded-sm bg-white/10 border border-white/20 p-3 shadow-lg">
          
          {/* Product Name — fixed height for 3 lines max */}
          <h3 
            className="text-white font-semibold text-xs leading-[1.4] line-clamp-3 mb-3"
            style={{ height: 'calc(1.4em * 3)' }}  /* 3 lines × line-height */
          >
            {productName}
          </h3>

          {/* Price Row: Discount → Price → Logo */}
          <div className="flex items-center justify-between gap-2">
            
            {/* Left: Discount + Price */}
            <div className="flex items-center gap-2">
              {/* Discount Badge */}
              <span className="bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shrink-0">
                -{discount}%
              </span>

              {/* Prices */}
              <div className="flex flex-col">
                <span className="text-white/50 text-[10px] line-through whitespace-nowrap">
                  {originalPrice.toLocaleString()}
                </span>
                <span className="text-white font-bold text-xs whitespace-nowrap">
                  {salePrice.toLocaleString()}&nbsp;{currency}
                </span>
              </div>
            </div>

            {/* Right: Launcher Logo */}
            {launcherLogo ? (
              <img 
                src={launcherLogo} 
                alt="launcher" 
                className="w-5 h-5 object-contain shrink-0"
              />
            ) : (
              <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center shrink-0">
                <span className="text-[9px] text-white/60">LOGO</span>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  )
}

export default ProductCard