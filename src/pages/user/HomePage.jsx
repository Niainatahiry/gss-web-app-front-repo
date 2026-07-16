import React from 'react'
import Hero from '../../components/home/Hero'

function HomePage() {
  return (
    <div>
      <Hero />
      
      {/* Section suivante — pt-64 laisse la place aux cards qui débordent */}
      <section className="bg-primary pt-64 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-primary-100">
            Autres jeux
          </h2>
        </div>
      </section>
    </div>
  )
}

export default Hero