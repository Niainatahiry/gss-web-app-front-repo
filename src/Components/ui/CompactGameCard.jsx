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
      className={`relative flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-left w-full h-full overflow-hidden ${
        isActive 
          ? 'bg-white/10 border border-white/20' 
          : 'hover:bg-white/5 border border-transparent'
      }`}
    >
      {/* Thumbnail */}
      <div className="h-full max-h-[72px] rounded overflow-hidden flex-shrink-0" style={{ aspectRatio: '2/3' }}>
        <img
          src={portraitImage}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        <h4 className={`text-sm font-medium truncate ${isActive ? 'text-white' : 'text-white/70'}`}>
          {productName}
        </h4>
        <div className="flex items-center gap-2 mt-1">
          <span className="bg-green-500/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            -{discount}%
          </span>
          <span className="text-white/50 text-xs line-through">
            {originalPrice.toLocaleString()}
          </span>
          <span className="text-white text-xs font-bold">
            {salePrice.toLocaleString()} {currency}
          </span>
        </div>
      </div>
      
      {/* Arrow indicator */}
      <ChevronRight 
        size={16} 
        className={`flex-shrink-0 transition-all ${isActive ? 'text-white opacity-100' : 'text-white/30 opacity-0'}`} 
      />

      {/* Timer progress bar — grows left to right */}
      {isActive && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10">
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