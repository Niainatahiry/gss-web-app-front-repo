import { formatAriary } from '../../utils/formatPrice'

function ProductInfoPanel({
  productName,
  discount,
  originalPrice,
  salePrice,
  currency = 'AR',
  launcherLogo,
  className = ''
}) {
  return (
    <div className={`bg-tertiary-400 p-2 shadow-lg @min-[190px]:p-3 ${className}`}>

      {/* Product Name — fixed height for 3 lines max */}
      <h3
        className="text-white font-semibold text-xs leading-[1.4] line-clamp-3 mb-3 @min-[190px]:text-base"
        style={{ height: 'calc(1.4em * 3)' }}
      >
        {productName}
      </h3>

      {/* Price Row: Discount → Price → Logo */}
      <div className="flex items-stretch justify-between gap-2">

        {/* Left: Discount + Price */}
        <div className="flex items-center gap-2">
          {/* Discount Badge */}
          <span className="bg-secondary-100 flex items-center h-full text-secondary-700 text-xs font-bold px-2.5 py-0.5 rounded shrink-0">
            -{discount}%
          </span>

          {/* Prices */}
          <div className="flex flex-col">
            <span className="text-white/50 text-xs line-through whitespace-nowrap @min-[190px]:text-sm">
              {formatAriary(originalPrice)}
            </span>
            <span className="text-white font-bold text-sm whitespace-nowrap @min-[190px]:text-sm">
              {formatAriary(salePrice)}&nbsp;{currency}
            </span>
          </div>
        </div>

        {/* Right: Launcher Logo — bottom-end corner of the price row. */}
        {launcherLogo && (
          <div className="flex items-end">
            <img
              src={launcherLogo}
              alt="launcher"
              className="w-5 h-5 object-contain shrink-0"
            />
          </div>
        )}

      </div>

    </div>
  )
}

export default ProductInfoPanel
