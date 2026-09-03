// src/components/ui/BrowseDropdown.jsx
import React, { useState, useRef, useEffect } from 'react'
import { ChevronDown, Monitor } from 'lucide-react'
import PlaystationLogo from '../../assets/logos/consoleLogos/playstation.svg?react'
import XboxLogo from '../../assets/logos/consoleLogos/Xbox_Logo.svg?react'
import NintendoLogo from '../../assets/logos/consoleLogos/Nintendo_Switch_Logo.svg?react'
import MiniGameCard from './MiniGameCard'


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
 {
    id: 1,
    imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1623730/f85c38b444047c686d44eea5f649c9ae761fd06a/library_capsule_2x.jpg?t=1784190284",
    productName: "Palworld Steam Account",
    discount: 25,
    originalPrice: 280000,
    salePrice: 210000,
    currency: "AR",
    launcherLogo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg"
  },
  {
    id: 2,
    imageUrl: "https://store-images.s-microsoft.com/image/apps.29053.13885697713732469.57172206-9624-44ae-9aab-e4d08a8b3212.9e1b1273-7b5d-406a-8f28-50d2f02c571c",
    productName: "Assassin's Creed Black Flag Resynced EU PC Ubisoft Connect CD Key",
    discount: 15,
    originalPrice: 420000,
    salePrice: 357000,
    currency: "AR",
    launcherLogo: "https://cdn2.steamgriddb.com/icon/064e3a5648fb4a7f911155bd81f87fd2.ico"
  },
  {
    id: 3,
    imageUrl: "https://store-images.s-microsoft.com/image/apps.808.14492077886571533.be42f4bd-887b-4430-8ed0-622341b4d2b0.c8274c53-105e-478b-9f4b-41b8088210a3",
    productName: "Minecraft: Java & Bedrock Edition PC Windows CD Key",
    discount: 30,
    originalPrice: 500000,
    salePrice: 350000,
    currency: "AR",
    launcherLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Microsoft_Store_logo_light.svg/1280px-Microsoft_Store_logo_light.svg.png"
  },
  {
    id: 4,
    imageUrl: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/227300/library_600x900_2x.jpg?t=1784269455",
    productName: "Euro Truck Simulator 2 Steam Account",
    discount: 20,
    originalPrice: 600000,
    salePrice: 480000,
    currency: "AR",
    launcherLogo: "https://upload.wikimedia.org/wikipedia/commons/8/83/Steam_icon_logo.svg"
  },
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
          isOpen ? '' : ''
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
          className="fixed left-0 right-0 top-32 bg-[#201e3c] border-b border-primary-100/10 shadow-2xl z-40"
          onMouseEnter={() => setIsOpen(true)}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8">
              
              {/* Section 1: Plateformes (rank 1) */}
              {/* Section 1: Plateformes */}
<div className="col-span-2 py-12">
  <h3 className="text-sm font-semibold text-white uppercase tracking-wider px-3 mb-5 font-display">
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
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5 font-display">
                  En Vedette
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {featuredGames.map((game) => (
                    <MiniGameCard
                      key={game.id}
                      imageUrl={game.imageUrl}
                      productName={game.productName}
                      discount={game.discount}
                      originalPrice={game.originalPrice}
                      salePrice={game.salePrice}
                      currency={game.currency}
                      launcherLogo={game.launcherLogo}
                    />
                  ))}
                </div>
              </div>

              {/* Section 3: Promo Banner (rank 3) */}
                <div className="col-span-4 flex items-center">
                  <a
                    href="#"
                    className="group relative block w-full aspect-[3/2] overflow-hidden rounded-lg"
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