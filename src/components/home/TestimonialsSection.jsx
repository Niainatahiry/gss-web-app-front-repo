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
    gameName: "Assassin's Creed IV: Black Flag Resynced",
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
]

function TestimonialsSection() {
  return (
    <section className="w-full py-10 sm:py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-10 text-center md:mb-12">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-primary-100 mb-3">
            Que Disent nos <span className="text-secondary-100 font-display">Clients</span>
          </h2>
          <p className="text-primary-300 text-sm sm:text-base max-w-2xl mx-auto">
            Des avis authentiques de vrais joueurs. Découvrez pourquoi ils nous font confiance pour leur prochaine aventure.
          </p>
        </div>

        {/* Simple grid — no marquee, no continuous animation */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
          {testimonialsData.map((testimonial) => (
            <TestimonialCard key={testimonial.id} data={testimonial} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default TestimonialsSection
