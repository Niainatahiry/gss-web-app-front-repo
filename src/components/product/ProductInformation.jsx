import React from 'react'
import { ShoppingCart, Heart, Star } from 'lucide-react'

function ProductInformation() {

  // Temporary static product data.
  // Later, this can be replaced with data coming from the API.
  const product = {
    name: 'Forza Horizon 6 Xbox Series X|S / PC CD Key',

    rating: 4,
    reviewCount: 15,

    releaseDate: '19 mai 2026',
    developers: 'Playground Games',
    publishers: 'Xbox Games Studio',
    genres: 'Course automobile, Simulation, Sport',

    originalPrice: '195.000 AR',
    price: '195.000 AR',
    discount: '-37%',
  }

  return (
    <div className="lg:col-span-3 flex flex-col">

      {/* =========================
          PRODUCT TITLE
      ========================== */}
      <h1 className="
        font-display
        text-xl
        md:text-2xl
        font-bold
        text-white
        leading-tight
      ">
        {product.name}
      </h1>


      {/* =========================
          RATING
      ========================== */}
      <div className="flex items-center gap-3 mt-4">

        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={17}
              className={
                star <= product.rating
                  ? 'fill-secondary text-secondary'
                  : 'text-primary-300/20'
              }
            />
          ))}
        </div>

        <span className="text-xs text-primary-100/50 font-body">
          ({product.reviewCount} évaluations)
        </span>

      </div>


      {/* =========================
          PRODUCT METADATA
      ========================== */}
      <div className="
        mt-7
        pt-6
      ">

        <div className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-3">

          <span className="text-sm text-primary-100/40">
            Date de sortie
          </span>

          <span className="text-sm text-white text-right">
            {product.releaseDate}
          </span>


          <span className="text-sm text-primary-100/40">
            Développeurs
          </span>

          <span className="text-sm text-white text-right">
            {product.developers}
          </span>


          <span className="text-sm text-primary-100/40">
            Éditeurs
          </span>

          <span className="text-sm text-white text-right">
            {product.publishers}
          </span>


          <span className="text-sm text-primary-100/40">
            Genres
          </span>

          <span className="text-sm text-white text-right">
            {product.genres}
          </span>

        </div>

      </div>


      {/* =========================
          PRICING
      ========================== */}
      <div className="flex items-end gap-4 mt-8 justify-between">

        {/* Discount */}
        <span className="
          shrink-0
          px-6
          py-3
          rounded-sm
          bg-green-500
          text-white
          text-xl
          font-bold
        ">
          {product.discount}
        </span>


        {/* Prices */}
        <div className="flex flex-col">

          <span className="
            text-sm
            text-primary-100/40
            line-through
          ">
            {product.originalPrice}
          </span>

          <span className="
            text-3xl
            font-bold
            text-white
            leading-none
            mt-1
          ">
            {product.price}
          </span>

        </div>

      </div>


      {/* =========================
          BUY / CART
      ========================== */}
      <div className="flex gap-2 mt-3">

        {/* Buy */}
        <button
          type="button"
          className="
            flex-1
            h-12
            rounded-sm
            bg-secondary/80
            hover:bg-secondary
            text-secondary-700
            font-semibold
            font-body
            flex
            items-center
            justify-center
            hover:brightness-110
            transition-all
            cursor-pointer
          "
        >
          Acheter
        </button>


        {/* Add to cart */}
        <button
          type="button"
          aria-label="Ajouter au panier"
          className="
            w-12
            h-12
            shrink-0
            rounded-sm
            bg-primary-600/40
            text-white/60

            flex
            items-center
            justify-center
          hover:bg-primary-500/40

            transition-colors
            cursor-pointer
          "
        >
          <ShoppingCart size={19} />
        </button>

      </div>


      {/* =========================
          WISHLIST
      ========================== */}
      <button
        type="button"
        className="
          w-full
          h-12
          mt-3
          rounded-sm
        bg-primary-600/40

          text-white/60
          flex
          items-center
          justify-center
          gap-2
          hover:bg-primary-500/40
          transition-colors
          cursor-pointer
        "
      >
        <Heart size={18} />

        Wishlist
      </button>

    </div>
  )
}

export default ProductInformation