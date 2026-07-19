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
    <div className="absolute bottom-4 left-4 right-4">
      <div className="p-5 w-full max-w-[45%]">
        {/* Logo / Badge row */}
        {(logo || badge) && (
          <div className="flex items-center gap-2 mb-3">
            {logo && (
              <img src={logo} alt="logo" className="w-5 h-5 object-contain" />
            )}
            {badge && (
              <span className="text-white/60 text-lg font-medium">{badge}</span>
            )}
          </div>
        )}

        {/* Game Logo instead of title */}
        {gameLogo ? (
          <img 
            src={gameLogo} 
            alt={title} 
            className="w-48 mb-5 object-contain text-shadow-2xs"
          />
        ) : (
          <h3 className="text-white text-xl font-bold mb-5 leading-tight">
            {title}
          </h3>
        )}

        {/* Subtitle */}
        {subtitle && (
          <h4 className="text-white/80 text-sm font-semibold mb-3">
            {subtitle}
          </h4>
        )}

        {/* Description — larger text */}
        {description && (
          <p className="text-white font-medium font-body text-shadow-2xs text-2xs mb-6 line-clamp-3">
            {description}
          </p>
        )}
        {/* Price + Buttons grouped together */}    
        <div className="flex flex-col gap-2">
            {(discount || originalPrice || salePrice) && (
            <div className="flex items-center gap-2 ">
                {discount && (
                <span className="bg-green-500 text-white text-sm font-bold px-1.5 py-0.5 rounded">
                    -{discount}%
                </span>
                )}
                {originalPrice && (
                <span className="text-white/40 text-sm line-through">
                    {originalPrice.toLocaleString()} {currency}
                </span>
                )}
                {salePrice && (
                <span className="text-white text-sm font-bold">
                    {salePrice.toLocaleString()} {currency}
                </span>
                )}
            </div>
            )}

            {/* Buttons */}
            <div className="flex items-center gap-3">
            {primaryButtonText && (
                <button
                onClick={primaryButtonAction}
                className="bg-secondary-200 hover:bg-secondary-300 font-display text-primary text-xs font-bold px-5 py-3 rounded-lg transition-colors"
                >
                {primaryButtonText}
                </button>
            )}
            {secondaryButtonText && (
                <button
                onClick={secondaryButtonAction}
                className="bg-white/10 hover:bg-white/20 text-white font-display text-xs font-medium px-5 py-3 rounded-lg transition-colors backdrop-blur-sm border border-white/10"
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