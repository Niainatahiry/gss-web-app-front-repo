import React from 'react'
import { ArrowRight } from 'lucide-react'
import ProductCard from '../ui/ProductCard'

const bestSellersData = [
  {
    id: 1,
    imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2483190/711e39803402def82a90e1f31578c64744f952f3/library_capsule_2x.jpg",
    productName: "Forza Horizon 6 Xbox Series X|S / PC CD Key",
    discount: 35,
    originalPrice: 300000,
    salePrice: 195000,
    currency: "AR",
    launcherLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Microsoft_Store_logo_light.svg/1280px-Microsoft_Store_logo_light.svg.png"
  },
  {
    id: 2,
    imageUrl: "https://store-images.s-microsoft.com/image/apps.19413.14509973624768376.8012321a-394e-42b7-ba2b-040f89ebe965.a1419550-a86b-4ca1-9063-0b92a45c0604",
    productName: "ELDEN RING: Shadow of the Erdtree Edition EU PC Steam CD Key",
    discount: 40,
    originalPrice: 350000,
    salePrice: 210000,
    currency: "AR",
    launcherLogo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg"
  },
  {
    id: 3,
    imageUrl: "https://store-images.s-microsoft.com/image/apps.36537.14143814686075364.7e443c56-2382-4bea-8ceb-35638e527cd6.475937df-e65f-4850-b2f0-471c2966f074",
    productName: "Cyberpunk 2077 Ultimate Edition EU PC GOG CD Key",
    discount: 50,
    originalPrice: 400000,
    salePrice: 200000,
    currency: "AR",
    launcherLogo: "https://www.gog.com/year/2025/assets/media/goglogo.png"
  },
  {
    id: 4,
    imageUrl: "https://store-images.s-microsoft.com/image/apps.53664.14244061853036130.7c2802a8-1b30-475c-bf05-1f4138de9fd0.cb62b39f-2a00-466e-9b2f-58b8865ebd27",
    productName: "Red Dead Redemption 2 Ultimate Edition PC Rockstar Digital Download CD Key",
    discount: 60,
    originalPrice: 500000,
    salePrice: 200000,
    currency: "AR",
    launcherLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Rockstar_Games_Logo.svg/250px-Rockstar_Games_Logo.svg.png"
  },
  {
    id: 5,
    imageUrl: "https://cdn.gameboost.com/igdb/covers/112875/co5s5v.jpg",
    productName: "God Of War Ragnarök PC Steam CD Key",
    discount: 30,
    originalPrice: 450000,
    salePrice: 315000,
    currency: "AR",
    launcherLogo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg"
  },
  {
    id: 6,
    imageUrl: "https://store-images.s-microsoft.com/image/apps.64128.13853283465555502.df9a42b7-95ee-4088-89b3-08a50204f8ef.da71d8cf-7bb7-4f0d-a0e0-9df90aba8b88",
    productName: "Hogwarts Legacy Deluxe Edition PC Steam CD Key",
    discount: 45,
    originalPrice: 380000,
    salePrice: 209000,
    currency: "AR",
    launcherLogo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg"
  }
]

function BestSellers() {
  return (
    <div className="max-w-7xl mx-auto md:px-6 lg:px-0">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-primary-100">
          Meilleures ventes
        </h2>
        <a 
          href="/best-sellers" 
          className="flex items-center gap-1.5 text-primary-300 hover:text-primary-100 transition-colors group"
        >
          <span className="text-sm font-medium">Voir tout</span>
          <ArrowRight 
            size={18} 
            className="transition-transform group-hover:translate-x-1" 
          />
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {bestSellersData.map((game) => (
          <ProductCard
            key={game.id}
            imageUrl={game.imageUrl}
            productName={game.productName}
            discount={game.discount}
            originalPrice={game.originalPrice}
            salePrice={game.salePrice}
            currency={game.currency}
            launcherLogo={game.launcherLogo}
          />
        ))}
      </div>
    </div>
  )
}

export default BestSellers