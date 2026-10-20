import React from 'react'
import ProductMediaGallery from './ProductMediaGallery'
import ProductInformation from './ProductInformation'
  import promoBanner from '../../assets/images/promo-forza-banner.png'


function ProductHero() {
    
  return (
    <>
    
        <section className="special-promo-banner pb-8">
            <a 
            href=""
            className="group block w-full rounded-sm overflow-hidden cursor-pointer"
            >
                <img 
                    src={promoBanner} 
                    alt="promo-forza-banner"
                    className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                />
            </a>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <ProductMediaGallery />
            <ProductInformation />
        </section>  
    </>
  )
}

export default ProductHero
