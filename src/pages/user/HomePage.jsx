import React from 'react'
import Hero from '../../components/home/Hero'
import ProductCard from '../../components/ui/ProductCard'
import BestSellers from '../../components/home/BestSellers'
import Recommendations from '../../components/home/Recommendations'
import PopularGames from '../../components/home/PopularGames'
import TestimonialsSection from '../../components/home/TestimonialsSection'
import SpecialPromo from '../../components/home/SpecialPromo'
import SelectPlatformsSection from '../../components/home/SelectPlatformsSection'

function HomePage() {
  return (
    <div >
      <section className="pb-128 sm:pb-88 md:pb-106 lg:pb-24 xl:pb-72">
        <Hero />
      </section>

      <section className="pb-12">
        <PopularGames />

      </section>
      <section className="pb-12">
        <BestSellers />
      </section>
      <section className="pb-12">
        <Recommendations />
      </section>
              <section className="pb-12">
          <SpecialPromo />
        </section>
      <section className="pb-12">
        <TestimonialsSection />
      </section>

        <section className="pb-12">
          <SelectPlatformsSection  />
        </section>

    </div>
  )
}

export default HomePage