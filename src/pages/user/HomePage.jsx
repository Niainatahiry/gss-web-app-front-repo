import React from 'react'
import Hero from '../../components/home/Hero'
import ProductCard from '../../components/ui/ProductCard'
import BestSellers from '../../components/home/BestSellers'
import Recommendations from '../../components/home/Recommendations'
import PopularGames from '../../components/home/PopularGames'
import TestimonialsSection from '../../components/home/TestimonialsSection'

function HomePage() {
  return (
    <div>
      <Hero />
      <section className="pt-64 pb-12">
        <PopularGames />
      </section>
      {/* Section suivante — pt-64 laisse la place aux cards qui débordent */}
      <section className="pb-12">
        <BestSellers />
      </section>
      {/* Section suivante — pt-64 laisse la place aux cards qui débordent */}
      <section className="pb-12">
        <Recommendations />
      </section>
      <section className="pb-12">
        <TestimonialsSection />
      </section>

    </div>
  )
}

export default HomePage