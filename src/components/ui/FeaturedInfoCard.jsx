import React from 'react'

function FeaturedInfoCard({
  title,
  subtitle,
  description,
  discount,
  originalPrice,
  salePrice,
  currency,
  logo,
  gameLogo,
  badge,
  primaryButtonText,
  primaryButtonAction,
  secondaryButtonText,
  secondaryButtonAction,
  children
}) {
  return (
    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
      <div className="p-3 sm:p-4 md:p-5 w-full max-w-[85%]">
        {/* Logo / Badge row */}
        {(logo || badge) && (
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            {logo && (
              <img src={logo} alt="logo" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
            )}
            {badge && (
              <span className="text-white/60 text-base sm:text-lg font-medium">{badge}</span>
            )}
          </div>
        )}

        {/* Game Logo instead of title */}
        {gameLogo ? (
          <img 
            src={gameLogo} 
            alt={title} 
            className="w-28 sm:w-32 md:w-28 lg:w-44 xl:w-48 mb-3 sm:mb-4 md:mb-5 object-contain"
          />
        ) : (
          <h3 className="text-white text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 md:mb-5 leading-tight">
            {title}
          </h3>
        )}

        {/* Subtitle */}
        {subtitle && (
          <h4 className="text-white/80 text-xs sm:text-sm font-semibold mb-2 sm:mb-3">
            {subtitle}
          </h4>
        )}

        {/* Description */}
        {description && (
          <p className="text-white font-medium font-body text-shadow-2xs text-[11px] sm:text-xs md:text-sm mb-4 sm:mb-5 md:mb-6 line-clamp-2 sm:line-clamp-3  sm:max-w-[65%] md:max-w-[45vw] lg:max-w-[45%]">
            {description}
          </p>
        )}

        {/* Price + Buttons grouped together */}    
        <div className="flex flex-col gap-2 sm:gap-2">
          {(discount || originalPrice || salePrice) && (
            <div className="flex items-center gap-1.5 sm:gap-2">
              {discount && (
                <span className="bg-green-500 text-white text-[10px] sm:text-xs md:text-sm font-bold px-1 sm:px-1.5 py-0.5 rounded">
                  -{discount}%
                </span>
              )}
              {originalPrice && (
                <span className="text-white/40 text-[10px] sm:text-xs md:text-sm line-through">
                  {originalPrice.toLocaleString()} {currency}
                </span>
              )}
              {salePrice && (
                <span className="text-white text-[10px] sm:text-xs md:text-sm font-bold">
                  {salePrice.toLocaleString()} {currency}
                </span>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {primaryButtonText && (
              <button
                onClick={primaryButtonAction}
                className="bg-secondary-200 hover:bg-secondary-300 font-display text-primary text-[10px] sm:text-xs md:text-sm font-bold px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-lg transition-colors"
              >
                {primaryButtonText}
              </button>
            )}
            {secondaryButtonText && (
              <button
                onClick={secondaryButtonAction}
                className="bg-white/10 hover:bg-white/20 text-white font-display text-[10px] sm:text-xs md:text-sm font-medium px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-lg transition-colors backdrop-blur-sm border border-white/10"
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </div>

        {/* Extra content slot */}
        {children}
      </div>
    </div>
  )
}

export default FeaturedInfoCard