import React, { useEffect, useState, useRef, useCallback } from 'react'
import { ArrowRight } from 'lucide-react'
import CompactGameCard from '../ui/CompactGameCard'
import FeaturedInfoCard from '../ui/FeaturedInfoCard'

const popularGamesData = [
  {
    id: 1,
    landscapeImage: "https://image.api.playstation.com/vulcan/ap/rnd/202606/0316/697cde4e3d17194fd27bf445967b3babdf59beeb04b01e8e.png",
    portraitImage: "https://cdn2.unrealengine.com/egs-easportsfc26theworldsgameedition-eacanada-editions-s2-1200x1600-af634889da1e.jpg",
    gameLogo:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/EAFC26_SEASONAL_SOLID_CHALK_WHITE_HORIZONTAL_RGB.svg/960px-EAFC26_SEASONAL_SOLID_CHALK_WHITE_HORIZONTAL_RGB.svg.png?_=20250718232345",
    productName: "FC26 World's Game Edition ",
    discount: 25,
    originalPrice: 280000,
    salePrice: 210000,
    currency: "AR",
    launcherLogo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg",
    description: "Vivez The World's Game comme jamais auparavant dans EA SPORTS FC™ 26. Visez la gloire dans un mode tournoi international à 48 équipes, relevez des défis Manager Live thématiques et lancez-vous dans Carrière de pro avec de nouvelles ICÔNES et de nouveaux Héros internationaux. "
  },
  {
    id: 2,
    landscapeImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3751950/09d7b766ce8a26bce32887ec7eaf00fc36552025/library_hero_2x.jpg",
    portraitImage: "https://store-images.s-microsoft.com/image/apps.29053.13885697713732469.57172206-9624-44ae-9aab-e4d08a8b3212.9e1b1273-7b5d-406a-8f28-50d2f02c571c",
    gameLogo: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3751950/9928560f0155a0378d1cc915c165a1a09ba5d108/logo.png",
    productName: "Assassin's Creed Black Flag Resynced",
    discount: 15,
    originalPrice: 420000,
    salePrice: 357000,
    currency: "AR",
    launcherLogo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg",
    description: "Une aventure en mode survie où vous devez survivre pendant 3 jours dans un monde qui change chaque nuit."
  },
  {
    id: 3,
    landscapeImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3768760/136e92ac58ef98f53885421391c0f1c08c899cdf/library_hero_2x.jpg",
    portraitImage: "https://store-images.s-microsoft.com/image/apps.8071.14287567326939893.1fdb2217-3463-49e6-b44c-c16587b03bc8.d8033845-8141-4dc4-b49e-2a8e6749235d",
    gameLogo: "https://cdn2.steamgriddb.com/logo_thumb/693454172fb6059e2a7a9aee8fd2bdfb.png",
    productName: "007 First Light",
    discount: 20,
    originalPrice: 600000,
    salePrice: 480000,
    currency: "AR",
    launcherLogo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg",
    description: "L'action cinématique revient avec la campagne la plus ambitieuse de la série."
  },
  {
    id: 4,
    landscapeImage: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/3472040/70b51b8393d7c948891d09471b2ce6e68b7b374e/library_hero_2x.jpg?t=1782486648",
    portraitImage: "https://store-images.s-microsoft.com/image/apps.23652.14220255605673269.167b0e48-1b10-4ff3-8231-dbaf3fa1ed77.12dd221d-1bda-49fa-8602-c6fb59ebf56f",
    gameLogo: "https://cdn2.steamgriddb.com/logo_thumb/c59c4da559d8dae958242f8a57f409cc.png",
    productName: "NBA 2K26",
    discount: 35,
    originalPrice: 250000,
    salePrice: 162500,
    currency: "AR",
    launcherLogo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg",
    description: "Rejoignez les Helldivers et combattez pour la liberté dans ce shooter coopératif intense."
  },
  {
    id: 5,
    landscapeImage: "https://store-images.s-microsoft.com/image/apps.54359.13654268679289325.ececb946-5639-4e77-b347-9d188d4e7e02.58b7fb42-a33a-48ea-a6c9-c990b4653b2f",
    portraitImage: "https://store-images.s-microsoft.com/image/apps.49778.13654268679289325.ececb946-5639-4e77-b347-9d188d4e7e02.9102215b-349a-4f6d-b9a3-2c14908481f1",
    gameLogo: "https://cdn2.steamgriddb.com/logo/4b097c4acf20a16a88d18dd1aa5c8a69.png",
    productName: "Palworld",
    discount: 40,
    originalPrice: 450000,
    salePrice: 270000,
    currency: "AR",
    launcherLogo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg",
    description: "Un RPG de légende avec une liberté de choix inégalée et des combats tactiques."
  }
]

const TIMER_DURATION = 5000

function PopularGames() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [timerProgress, setTimerProgress] = useState(0)
  const [userInitiated, setUserInitiated] = useState(false)
  const scrollContainerRef = useRef(null)
  const cardRefs = useRef([])
  
  const activeGame = popularGamesData[activeIndex]

  // Desktop auto-rotation timer — ONLY on md+
  useEffect(() => {
    const isDesktop = window.innerWidth >= 768
    if (!isDesktop) return

    const startTime = Date.now()
    
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min((elapsed / TIMER_DURATION) * 100, 100)
      setTimerProgress(progress)
    }, 16)

    const switchTimeout = setTimeout(() => {
      setUserInitiated(false)
      setActiveIndex(prev => (prev + 1) % popularGamesData.length)
      setTimerProgress(0)
    }, TIMER_DURATION)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(switchTimeout)
    }
  }, [activeIndex])

  // Auto-scroll ONLY when user clicked (not timer)
  useEffect(() => {
    if (!userInitiated) return
    
    const card = cardRefs.current[activeIndex]
    const container = scrollContainerRef.current
    if (!card || !container) return

    const isMobile = window.innerWidth < 768
    if (!isMobile) return

    card.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }, [activeIndex, userInitiated])

  // Mobile scroll tracking — IntersectionObserver
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index)
            setUserInitiated(false)
            setActiveIndex(index)
            setTimerProgress(0)
          }
        })
      },
      {
        root: container,
        threshold: 0.6,
      }
    )

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  const handleGameClick = useCallback((index) => {
    setUserInitiated(true)
    setActiveIndex(index)
    setTimerProgress(0)
  }, [])

  const itemCount = popularGamesData.length

  return (
    <div className="max-w-7xl mx-auto pb-4 pt-8 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-0">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
        <h2 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-primary-100">
          Populaires en ce moment
        </h2>
        <a 
          href="/popular" 
          className="flex items-center gap-1 sm:gap-1.5 text-primary-300 hover:text-primary-100 transition-colors group"
        >
          <span className="text-xs sm:text-sm font-medium">Voir tout</span>
          <ArrowRight size={14} className="sm:w-[18px] sm:h-[18px] transition-transform group-hover:translate-x-1" />
        </a>
      </div>

      {/* md+ : Two-column grid with Featured + Sidebar */}
      <div className="hidden md:grid md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_340px] gap-4">
        
        {/* Left: Featured — h-full to match sidebar height */}
        <div className="relative rounded-xl overflow-hidden group h-full">
          <img
            src={activeGame.landscapeImage}
            alt={activeGame.productName}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
          
          <FeaturedInfoCard
            gameLogo={activeGame.gameLogo}
            title={activeGame.productName}
            description={activeGame.description}
            discount={activeGame.discount}
            originalPrice={activeGame.originalPrice}
            salePrice={activeGame.salePrice}
            currency={activeGame.currency}
            primaryButtonText="Acheter maintenant"
            primaryButtonAction={() => console.log('Buy', activeGame.productName)}
            secondaryButtonText="Détails"
            secondaryButtonAction={() => console.log('Details', activeGame.productName)}
          />
        </div>

        {/* Right: Sidebar — height drives the grid */}
        <div className="grid gap-1" style={{ gridTemplateRows: `repeat(${itemCount}, 1fr)` }}>
          {popularGamesData.map((game, index) => (
            <CompactGameCard
              key={game.id}
              portraitImage={game.portraitImage}
              productName={game.productName}
              discount={game.discount}
              originalPrice={game.originalPrice}
              salePrice={game.salePrice}
              currency={game.currency}
              isActive={index === activeIndex}
              onClick={() => handleGameClick(index)}
              timerProgress={index === activeIndex ? timerProgress : 100}
            />
          ))}
        </div>
      </div>

      {/* < md : Horizontal scrollable portrait cards */}
      <div 
        ref={scrollContainerRef}
        className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`
          .md\\:hidden::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        <div className="flex gap-3 w-max">
          {popularGamesData.map((game, index) => (
            <div
              key={game.id}
              ref={(el) => { cardRefs.current[index] = el }}
              data-index={index}
              onClick={() => handleGameClick(index)}
              className={`relative flex-shrink-0 w-[75vw] rounded-2xl overflow-hidden snap-center cursor-pointer transition-all duration-300 ${
                index === activeIndex 
                  ? 'scale-100 opacity-100' 
                  : 'scale-95 opacity-60'
              }`}
              style={{ aspectRatio: '562/750' }}
            >
              <img
                src={game.portraitImage}
                alt={game.productName}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />
              
              {/* Content overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                {game.gameLogo ? (
                  <img 
                    src={game.gameLogo} 
                    alt={game.productName} 
                    className="w-32 sm:w-40 mb-3 object-contain"
                  />
                ) : (
                  <h3 className="text-white text-lg font-bold mb-2 leading-tight">
                    {game.productName}
                  </h3>
                )}
                
                <p className="text-white/80 text-xs sm:text-sm mb-3 line-clamp-2">
                  {game.description}
                </p>
                
                <div className="flex items-center gap-2">
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{game.discount}%
                  </span>
                  <span className="text-white/50 text-xs line-through">
                    {game.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-white text-sm font-bold">
                    {game.salePrice.toLocaleString()} {game.currency}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Mobile dots indicator — clickable */}
      <div className="md:hidden flex justify-center gap-2 mt-4">
        {popularGamesData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleGameClick(index)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              index === activeIndex ? 'bg-white w-6' : 'bg-white/30 w-2 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

export default PopularGames