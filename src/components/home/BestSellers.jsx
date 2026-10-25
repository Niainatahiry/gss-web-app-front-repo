import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import ProductCard from '../ui/ProductCard'
import { bestSellers as bestSellersData } from '../../data/products'

function BestSellers() {
  return (
    <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0">
      {/* Section Header */}
      <div className="mb-4 sm:mb-5 md:mb-6">
        <h2 className="font-heading text-3xl sm:text-3xl md:text-5xl text-white/80">
          <a
            href="/popular"
            aria-label="Voir toutes les meilleures ventes"
            className="group inline-block"
          >
            Meilleures ventes
            <span className="ml-2 md:ml-3 inline-flex align-middle p-1.5 text-white/50 group-hover:text-white group-focus-visible:text-white transition-colors">
              <FontAwesomeIcon
                icon={faAngleRight}
                className="text-xl sm:text-2xl md:text-4xl transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1"
              />
            </span>
          </a>
        </h2>
      </div>

      {/* Scrollable on < xl — Grid of 5 on xl+ */}
      <div 
        className="flex xl:grid xl:grid-cols-5 gap-4 overflow-x-auto xl:overflow-visible pb-2 xl:pb-0 -mx-4 px-4 xl:mx-0 xl:px-0"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          .flex.overflow-x-auto::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {bestSellersData.map((game) => (
          <div key={game.id} className="shrink-0 w-[45%] sm:w-[30%] md:w-[23%] lg:w-[18%] xl:w-auto">
            <ProductCard
              imageUrl={game.imageUrl}
              productName={game.productName}
              discount={game.discount}
              originalPrice={game.originalPrice}
              salePrice={game.salePrice}
              currency={game.currency}
              launcherLogo={game.launcherLogo}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BestSellers