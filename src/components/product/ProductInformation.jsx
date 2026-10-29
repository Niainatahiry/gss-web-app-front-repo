import { ShoppingCartPlus, Heart, Star } from 'lucide-react'
import Button from '../ui/Button'
import IconButton from '../ui/IconButton'

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
          bg-secondary
          text-tertiary-500
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
        <Button variant="primary" size="lg" className="flex-1">
          Acheter
        </Button>


        {/* Add to cart — the teal `surface` material, like the Filtres button
            and the select trigger, so secondary actions share one treatment. */}
        <IconButton
          variant="surface"
          aria-label="Ajouter au panier"
          className="h-13 w-13 shrink-0"
        >
          <ShoppingCartPlus size={19} />
        </IconButton>

      </div>


      {/* =========================
          WISHLIST
      ========================== */}
      <Button variant="surface" size="lg" className="mt-3 w-full">
        <Heart size={18} />

        Wishlist
      </Button>

    </div>
  )
}

export default ProductInformation