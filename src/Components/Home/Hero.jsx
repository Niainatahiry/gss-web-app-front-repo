import React from 'react'
import heroImage from '../../assets/images/hero-image.jpg'

function Hero() {

  return (
    <section className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]">
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Hero Content */}
      <div className="relative z-0 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
          Welcome to GSS
        </h1>
        <p className="font-body text-lg md:text-xl mt-4 drop-shadow-md max-w-2xl">
          Your ultimate gaming destination
        </p>
      </div>

      
    </section>
  )
}

export default Hero