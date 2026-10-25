function MiniGameCard({
  imageUrl, 
  productName, 
  discount, 
  originalPrice,
  salePrice, 
  currency, 
  launcherLogo 
}) {
  return (
      <div className="group relative w-full aspect-2/3 rounded-sm overflow-hidden cursor-pointer shadow-e1">
      {/* Background Image */}
      <img
        src={imageUrl}
        alt={productName}
        className="absolute inset-0 w-full h-full object-cover duration-300"
      />
            {/* Glass shine — sweeps across the artwork on hover, stays under the panel */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/2 -skew-x-12 translate-x-[-250%] bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[250%] motion-reduce:transition-none"
      />
      {/* Discount Ticket */}
      <div className="absolute top-0 left-3 z-10">
        <div className="bg-secondary text-black text-xs font-bold px-2.5 py-1 rounded-b-sm shadow-e1">
          -{discount}%
        </div>
      </div>

      {/* Dark gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

      {/* Glassmorphism Description Panel */}
      <div className="absolute bottom-0 left-0 right-0">

  <div className="
    relative
    rounded-b-sm
    bg-tertiary-400
    border border-white/20
    p-3
    shadow-e3
  ">

    {/* Product Name */}
    <div className="
      grid
      grid-rows-[0fr]
      group-hover:grid-rows-[1fr]
      transition-[grid-template-rows]
      duration-300
    ">
      <div className="overflow-hidden">
        <h3 className="
          text-white
          font-semibold
          text-xs
          leading-[1.4]
          line-clamp-3
          mb-3
        ">
          {productName}
        </h3>
      </div>
    </div>

    {/* Price Row */}
    <div className="flex items-center justify-between gap-2">

      {/* Price */}
      <div className="flex flex-col">
        <span className="text-white/50 text-xs line-through whitespace-nowrap">
          {originalPrice.toLocaleString()}
        </span>

        <span className="text-white font-bold text-xs whitespace-nowrap">
          {salePrice.toLocaleString()}&nbsp;{currency}
        </span>
      </div>

      {/* Launcher */}
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

export default MiniGameCard