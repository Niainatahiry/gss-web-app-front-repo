import React from 'react'
import { ArrowRight } from 'lucide-react'
import GameCardThirdType from '../ui/GameCardThirdType'
import promoImageSrc from '../../assets/images/promo-banner.jpg'

const editionsData = [
  {
    id: 1,
    productName: 'EA SPORTS FC 27',
    edition: 'Standard Edition',
    imageUrl: 'https://athlonsports.com/.image/MjY6MDAwMDAwMDAxNDIwMzkz/ea-fc-27.png?profile=w2560&ar=16-9',
    discount: 25,
    originalPrice: 280000,
    salePrice: 210000,
  },
  {
    id: 2,
    productName: 'EA SPORTS FC 27',
    edition: 'Ultimate Edition',
    imageUrl: 'https://pbs.twimg.com/media/HQuu88AWUAAPQCg.jpg',
    discount: 30,
    originalPrice: 350000,
    salePrice: 245000,
  },
  {
    id: 3,
    productName: 'EA SPORTS FC 27',
    edition: 'Ultimate Edition',
    imageUrl: 'https://storage.ghost.io/c/50/c6/50c61f91-0165-4605-93bc-f8598149e466/content/images/2026/07/FC-27-News-header-1.jpeg',
    discount: 35,
    originalPrice: 450000,
    salePrice: 292500,
  },
]

function SpecialPromo() {
  return (
    <div className="max-w-7xl mx-auto pb-4 pt-8 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0">
      {/* Banner */}
      <a 
        href="/promotions" 
        className="group block w-full rounded-sm overflow-hidden cursor-pointer"
      >
        <img 
          src={promoImageSrc} 
          alt="Promotion spéciale" 
          className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </a>

      {/* Editions Section */}
      <div className="mt-8">

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
          {editionsData.map((edition) => (
            <div 
              key={edition.id} 
              className="shrink-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-auto"
            >
              <GameCardThirdType
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