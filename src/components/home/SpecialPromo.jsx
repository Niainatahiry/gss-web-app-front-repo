  import React from 'react'
  import { ArrowRight } from 'lucide-react'
  import GameCardThirdType from '../ui/GameCardThirdType'
  import promoBanner from '../../assets/images/promo-banner.jpg'

  const promoData = {
    id: 'fc27-launch',
    bannerImage: promoBanner,
    bannerAlt: 'EA SPORTS FC 27 — Promotion de lancement',
    bannerLink: '/promotions/fc27',
    editions: [
      {
        id: 1,
        productType:"Compte Steam",
        productName: 'EA SPORTS FC 27',
        edition: 'Standard Edition',
        imageUrl: 'https://athlonsports.com/.image/MjY6MDAwMDAwMDAxNDIwMzkz/ea-fc-27.png?profile=w2560&ar=16-9',
        discount: 25,
        originalPrice: 280000,
        salePrice: 210000,
      },
      {
        id: 2,
        productType:"Compte Steam",
        productName: 'EA SPORTS FC 27',
        edition: 'Deluxe Edition',
        imageUrl: 'https://pbs.twimg.com/media/HQuu88AWUAAPQCg.jpg',
        discount: 30,
        originalPrice: 350000,
        salePrice: 245000,
      },
      {
        id: 3,
        productType:"Compte Steam",
        productName: 'EA SPORTS FC 27',
        edition: 'Ultimate Edition',
        imageUrl: 'https://storage.ghost.io/c/50/c6/50c61f91-0165-4605-93bc-f8598149e466/content/images/2026/07/FC-27-News-header-1.jpeg',
        discount: 35,
        originalPrice: 450000,
        salePrice: 292500,
      },
    ]
  }

  function SpecialPromo() {
    return (
      <div className="max-w-7xl mx-auto pb-4 pt-8 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0">
        {/* Banner */}
        <a 
          href={promoData.bannerLink} 
          className="group block w-full rounded-sm overflow-hidden cursor-pointer"
        >
          <img 
            src={promoData.bannerImage} 
            alt={promoData.bannerAlt} 
            className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </a>

        {/* Editions Section */}
        <div className="mt-2">
          {/* Scrollable on < lg — Grid of 3 on lg+ */}
          <div 
            className="flex lg:grid lg:grid-cols-3 gap-4 overflow-x-auto lg:overflow-visible py-8 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <style>{`
              .flex.overflow-x-auto::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {promoData.editions.map((edition) => (
              <div 
                key={edition.id} 
                className="shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-auto"
              >
                <GameCardThirdType
                  productType={edition.productType}
                  productName={edition.productName}
                  edition={edition.edition}
                  imageUrl={edition.imageUrl}
                  discount={edition.discount}
                  originalPrice={edition.originalPrice}
                  salePrice={edition.salePrice}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  export default SpecialPromo