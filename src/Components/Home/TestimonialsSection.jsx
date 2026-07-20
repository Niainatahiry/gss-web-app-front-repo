import React from 'react'
import '../../styles/marquee.css'
import TestimonialCard from '../ui/TestimonialCard'

// ── JSON Data — Real Facebook Reviews (anonymized) ──
const testimonialsData = [
  {
    id: 1,
    username: "Yohan R",
    avatar: null,
    gamePurchased: "Compte Steam Assassin's Creed IV: Black Flag Resynced",
    rating: 5,
    testimonial: "Je recommande, mahay mandray olona sady milamina tsara ny achat.",
    gameName: "Assassin's Creed IV: Black Flag",
    genre: ["Action", "Aventure", "Open World"],
    platform: "PC",
    launcher: "Steam"
  },
  {
    id: 2,
    username: "Xavier E",
    avatar: null,
    gamePurchased: "Compte Steam EA SPORTS FC 26",
    rating: 5,
    testimonial: "Je recommande vivement, c'est super fiable.",
    gameName: "EA SPORTS FC 26",
    genre: ["Sport", "Simulation", "Multiplayer"],
    platform: "PC",
    launcher: "Steam"
  },
  {
    id: 3,
    username: "Nambinintsoa R",
    avatar: null,
    gamePurchased: "Compte Steam EA SPORTS FC 26",
    rating: 5,
    testimonial: "Merci fa milamina tsara ilay FC 26 azo antoka tsara ny achat à distance.",
    gameName: "EA SPORTS FC 26",
    genre: ["Sport", "Simulation", "Multiplayer"],
    platform: "PC",
    launcher: "Steam"
  },
  {
    id: 4,
    username: "Anthony S",
    avatar: null,
    gamePurchased: "Compte Steam EA SPORTS FC 26",
    rating: 5,
    testimonial: "Un grand merci pour le jeu ! Super fiable, rapide et sans aucune prise de tête. Je recommande les yeux fermés !",
    gameName: "EA SPORTS FC 26",
    genre: ["Sport", "Simulation", "Multiplayer"],
    platform: "PC",
    launcher: "Steam"
  },
  { 
    id: 5,
    username: "TestUser",
    avatar: null,
    gamePurchased: "Compte Steam The Witcher 3: Wild Hunt",
    rating: 5,
    testimonial: "Test avis avec beaucoup de tags pour vérifier le design quand les genres dépassent la limite.",
    gameName: "The Witcher 3: Wild Hunt",
    genre: ["RPG", "Action", "Aventure", "Open World", "Fantasy", "Narratif"],
    platform: "PC",
    launcher: "Steam"
  }
]

// ── Marquee Section ──
function TestimonialsSection() {
  // Duplicate data for seamless infinite loop
  const duplicatedData = [...testimonialsData, ...testimonialsData, ...testimonialsData]

  return (
    <section className="w-full py-16 bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">

        {/* Section Header */}
        <div className="text-center">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-primary-100 mb-3">
            Que Disent nos <span className="text-secondary-100 font-display">Clients</span>
          </h2>
          <p className="text-primary-300 text-sm sm:text-base max-w-2xl mx-auto">
            Des avis authentiques de vrais joueurs. Découvrez pourquoi ils nous font confiance pour leur prochaine aventure.
          </p>
        </div>

      </div>

      {/* Marquee Track */}
      <div className="relative group">

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--color-primary)] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--color-primary)] to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">
          {duplicatedData.map((testimonial, index) => (
            <TestimonialCard
              key={`${testimonial.id}-${index}`}
              data={testimonial}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default TestimonialsSection