import React from 'react'
import { ChevronRight } from 'lucide-react'

function CompactGameCard({ 
  portraitImage,
  productName,
  discount,
  originalPrice,
  salePrice,
  currency,
  isActive, 
  onClick,
  timerProgress
}) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-[0.6vw] p-[0.5vw] rounded-lg transition-all duration-200 text-left w-full h-full overflow-hidden ${
        isActive 
          ? 'bg-white/10 border border-white/20' 
          : 'hover:bg-white/5 border border-transparent'
      }`}
    >
      {/* Thumbnail — scales with viewport width, capped at 2xl */}
      <div 
        className="rounded overflow-hidden shrink-0 max-w-12" 
        style={{ 
          width: '3.8vw', 
          aspectRatio: '2/3' 
        }}
      >
        <img
          src={portraitImage}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h4 className={`text-[10px] sm:text-xs md:text-sm lg:text-sm xl:text-sm font-medium truncate leading-snug ${isActive ? 'text-white' : 'text-white/70'}`}>
          {productName}
        </h4>
        <div className="flex items-center gap-[0.35vw] mt-[0.2vw]">
          <span className="bg-green-500/80 text-white text-[8px] sm:text-[9px] md:text-[10px] lg:text-[10px] xl:text-[10px] font-bold px-[0.3vw] py-[0.1vw] rounded">
            -{discount}%
          </span>
          <span className="text-white/50 text-[8px] sm:text-[9px] md:text-[10px] lg:text-[10px] xl:text-[10px] line-through">
            {originalPrice.toLocaleString()}
          </span>
          <span className="text-white text-[8px] sm:text-[9px] md:text-[10px] lg:text-[10px] xl:text-[10px] font-bold">
            {salePrice.toLocaleString()} {currency}
          </span>
        </div>
      </div>
      
      {/* Arrow indicator */}
      <ChevronRight 
        size={16}
        className={`shrink-0 transition-all ${isActive ? 'text-white opacity-100' : 'text-white/30 opacity-0'}`} 
      />

      {/* Timer progress bar */}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-[0.12vw] bg-white/10">
          <div
            className="h-full bg-secondary-100 rounded-b"
            style={{ 
              width: `${timerProgress}%`,
              transition: 'width 50ms linear'
            }}
          />
        </div>
      )}
    </button>
  )
}

export default CompactGameCard