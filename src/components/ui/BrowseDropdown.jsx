// src/components/ui/BrowseDropdown.jsx
import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Monitor } from 'lucide-react'

function BrowseDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleOpen = () => setIsOpen(prev => !prev)

  const platforms = [
    { name: 'PC', Icon: Monitor, isLucideIcon: true },
    { name: 'PlayStation 5', logo: '/src/assets/logos/consoleLogos/playstation.svg' },
    { name: 'Xbox Series X|S', logo: '/src/assets/logos/consoleLogos/Xbox_Logo.svg' },
    { name: 'Nintendo Switch', logo: '/src/assets/logos/consoleLogos/Nintendo_Switch_Logo.svg' },
  ]

  const featuredGames = [
    { title: 'Elden Ring', price: '59.99 €', image: '/src/assets/images/hero-image.jpg' },
    { title: 'Forza Horizon 6', price: '69.99 €', image: '/src/assets/images/Forza Horizon 6.jpg' },
    { title: 'Zelda: TOTK', price: '59.99 €', image: '/src/assets/images/promo-banner.jpg' },
    { title: 'Spider-Man 2', price: '69.99 €', image: '/src/assets/images/hero-image.jpg' },
  ]

  return (
    <div 
      ref={containerRef}
      className="relative flex items-center h-22"
      onMouseLeave={() => setIsOpen(false)}
    >
      <button 
        onClick={toggleOpen}
        onMouseEnter={() => setIsOpen(true)}
        className={`flex items-center gap-1 text-base font-medium text-primary-100 px-4 py-2 transition-colors rounded-lg cursor-pointer ${
          isOpen ? 'bg-primary-600/70' : ''
        }`}
      >
        Parcourir
        <ChevronDown 
          size={16} 
          strokeWidth={2}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {isOpen && (
        <div 
          className="fixed left-0 right-0 top-[88px] bg-primary-700/95 backdrop-blur-xl border-b border-primary-100/10 shadow-2xl z-40"
          onMouseEnter={() => setIsOpen(true)}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-12 gap-8">
              
              {/* Section 1: Plateformes (rank 1) */}
              <div className="col-span-2">
                <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-5 font-display">
                  Plateformes
                </h3>
                <ul className="space-y-3">
                  {platforms.map((platform) => (
                    <li key={platform.name}>
                      <a 
                        href="#" 
                        className="flex items-center gap-3 text-sm text-primary-100/80 hover:text-secondary transition-colors group"
                      >
                        {platform.isLucideIcon ? (
                          <platform.Icon 
                            size={18}
                            className="opacity-60 group-hover:opacity-100 transition-opacity"
                          />
                        ) : (
                          <img 
                            src={platform.logo}
                            alt={platform.name}
                            className="h-5 w-5 opacity-60 group-hover:opacity-100 transition-all"
                            style={{
                              filter: 'brightness(0.8)',
                            }}
                            onMouseEnter={(e) => e.target.style.filter = 'brightness(0) saturate(100%) invert(79%) sepia(51%) saturate(497%) hue-rotate(2deg) brightness(104%)'}
                            onMouseLeave={(e) => e.target.style.filter = 'brightness(0.8)'}
                          />
                        )}
                        {platform.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Section 2: En Vedette — Game Cards (rank 2) */}
              <div className="col-span-6">
                <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-5 font-display">
                  En Vedette
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {featuredGames.map((game) => (
                    <a 
                      key={game.title}
                      href="#"
                      className="group block rounded-lg overflow-hidden bg-primary-600/30 hover:bg-primary-600/50 transition-all"
                    >
                      <div className="aspect-[3/4] overflow-hidden">
                        <img 
                          src={game.image} 
                          alt={game.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium text-primary-100 truncate">{game.title}</p>
                        <p className="text-xs text-secondary mt-1">{game.price}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Section 3: Promo Banner (rank 3) */}
              <div className="col-span-4">
                <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider mb-5 font-display">
                  Promotion
                </h3>
                <a 
                  href="#"
                  className="group block relative rounded-xl overflow-hidden h-full min-h-[280px]"
                >
                  <img 
                    src="/src/assets/images/promo-banner.jpg" 
                    alt="Promo"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-700/90 via-primary-700/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="inline-block px-3 py-1 bg-secondary text-primary-700 text-xs font-bold rounded-full mb-3">
                      -50%
                    </span>
                    <h4 className="text-xl font-bold text-primary-100 font-display mb-1">
                      Soldes d'Été
                    </h4>
                    <p className="text-sm text-primary-100/70">
                      Jusqu'à -70% sur une sélection de jeux
                    </p>
                  </div>
                </a>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BrowseDropdown