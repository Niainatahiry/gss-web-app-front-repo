import React from 'react'
import { ArrowRight } from 'lucide-react'
import ProductCard from '../ui/ProductCard'

const recommendationsData = [
  {
    id: 1,
    imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1623730/f85c38b444047c686d44eea5f649c9ae761fd06a/library_capsule_2x.jpg?t=1784190284",
    productName: "Palworld Steam Account",
    discount: 25,
    originalPrice: 280000,
    salePrice: 210000,
    currency: "AR",
    launcherLogo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg"
  },
  {
    id: 2,
    imageUrl: "https://store-images.s-microsoft.com/image/apps.29053.13885697713732469.57172206-9624-44ae-9aab-e4d08a8b3212.9e1b1273-7b5d-406a-8f28-50d2f02c571c",
    productName: "Assassin's Creed Black Flag Resynced EU PC Ubisoft Connect CD Key",
    discount: 15,
    originalPrice: 420000,
    salePrice: 357000,
    currency: "AR",
    launcherLogo: "https://cdn2.steamgriddb.com/icon/064e3a5648fb4a7f911155bd81f87fd2.ico"
  },
  {
    id: 3,
    imageUrl: "https://store-images.s-microsoft.com/image/apps.808.14492077886571533.be42f4bd-887b-4430-8ed0-622341b4d2b0.c8274c53-105e-478b-9f4b-41b8088210a3",
    productName: "Minecraft: Java & Bedrock Edition PC Windows CD Key",
    discount: 30,
    originalPrice: 500000,
    salePrice: 350000,
    currency: "AR",
    launcherLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Microsoft_Store_logo_light.svg/1280px-Microsoft_Store_logo_light.svg.png"
  },
  {
    id: 4,
    imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/227300/library_600x900_2x.jpg?t=1784269455",
    productName: "Euro Truck Simulator 2 Steam Account",
    discount: 20,
    originalPrice: 600000,
    salePrice: 480000,
    currency: "AR",
    launcherLogo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg"
  },
  {
    id: 5,
    imageUrl: "https://store-images.s-microsoft.com/image/apps.1218.13550041517005289.7f3b0841-0084-4cae-88f4-8996d95d574f.96567331-f46b-4380-96a6-ab86b5c38634?w=720",
    productName: "ARC Raiders PC Steam CD Key",
    discount: 35,
    originalPrice: 250000,
    salePrice: 162500,
    currency: "AR",
    launcherLogo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg"
  },
  {
    id: 6,
    imageUrl: "https://store-images.s-microsoft.com/image/apps.23652.14220255605673269.167b0e48-1b10-4ff3-8231-dbaf3fa1ed77.12dd221d-1bda-49fa-8602-c6fb59ebf56f",
    productName: "NBA 2K26 Standard Edition EU PC Steam CD Key",
    discount: 40,
    originalPrice: 450000,
    salePrice: 270000,
    currency: "AR",
    launcherLogo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg"
  }
]

function Recommendations() {
  return (
    <div className="max-w-7xl mx-auto py-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-primary-100">
          Recommandés pour vous
        </h2>
        <a 
          href="/recommendations" 
          className="flex items-center gap-1.5 text-primary-300 hover:text-primary-100 transition-colors group"
        >
          <span className="text-sm font-medium">Voir tout</span>
          <ArrowRight 
            size={18} 
            className="transition-transform group-hover:translate-x-1" 
          />
        </a>
      </div>

      {/* Masonry Grid */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-4">
        {recommendationsData.map((game) => (
          <div key={game.id} className="break-inside-avoid mb-4">
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

export default Recommendations