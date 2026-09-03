// src/components/ui/BrowseDropdown.jsx
import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Monitor } from 'lucide-react'
import PlaystationLogo from '../../assets/logos/consoleLogos/playstation.svg?react'
import XboxLogo from '../../assets/logos/consoleLogos/Xbox_Logo.svg?react'
import NintendoLogo from '../../assets/logos/consoleLogos/Nintendo_Switch_Logo.svg?react'

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
    { name: 'PC', Icon: Monitor },
    { name: 'PlayStation 5', Icon: PlaystationLogo },
    { name: 'Xbox Series X|S', Icon: XboxLogo },
    { name: 'Nintendo Switch', Icon: NintendoLogo },
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
          className="fixed left-0 right-0 top-22 bg-primary-700 border-b border-primary-100/10 shadow-2xl z-40"
          onMouseEnter={() => setIsOpen(true)}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8">
              
              {/* Section 1: Plateformes (rank 1) */}
              {/* Section 1: Plateformes */}
<div className="col-span-2 py-12">
  <h3 className="text-xs font-semibold text-secondary uppercase tracking-wider px-3 mb-5 font-display">
    Plateformes
  </h3>
  <ul className="space-y-1.5">
  {platforms.map((platform) => (
    <li key={platform.name}>
      <a
        href="#"
        className="
          group
          flex items-center gap-3
          px-3 py-2
          rounded-lg
          text-sm
          text-primary-100/70
          hover:text-white
          hover:bg-white/5
          transition-all
        "
      >
        <platform.Icon
          className="w-5 h-5 opacity-50 group-hover:opacity-100 transition-opacity"
          strokeWidth={2.5}
        />

        {platform.name}
      </a>
    </li>
  ))}
  </ul>
</div>

              {/* Section 2: En Vedette — Game Cards (rank 2) */}
              <div className="col-span-6 py-12">
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
                <a
                  href="#"
                  className="group relative block w-full h-full overflow-hidden"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe8idNUp0SBN94Pb3bUp8UXka0OXdls9qk07YR2zcE-Zc53TtmU9GgLv4&s=10"
                    alt="Promotion"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-block bg-secondary text-primary-900 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded mb-2">
                      Offre limitée
                    </span>
                    <h4 className="text-white text-lg font-bold leading-tight mb-1">
                      Summer Sale 2026
                    </h4>
                    <p className="text-white/70 text-sm">
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