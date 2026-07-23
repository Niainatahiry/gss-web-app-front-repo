import { SendHorizontal } from 'lucide-react'
import React from 'react'

function PromotionDescription({ 
  endDate = "15 Juillet 2026",
  discount = "44",
  maxSavings = "44",
  gameName = "FORZA HORIZON 6",
  description = "la meilleure licence automobile du moment. Achetez un compte Steam neuf avec le jeu à un prix imbattable."
}) {
  return (
    <div className="flex flex-col w-full lg:max-w-sm  xl:max-w-sm 2xl:max-w-sm">
      
      {/* 
        md: horizontal avec wrap si pas assez de place
        xl & 2xl: vertical (colonne)
      */}
      <div className="md:mx-auto flex flex-col xl:flex-col gap-3 md:gap-6 md:flex-row md:flex-no-wrap lg:flex-col xl:flex-nowrap 2xl:flex-col 2xl:flex-nowrap xl:gap-1.5 2xl:gap-1.5">
        
        {/* TOP / LEFT — Date + Badge */}
        <div className="flex flex-col gap-1 xl:gap-1.5 2xl:gap-1.5 flex-shrink-0 w-fit">
          {/* Date — width matches its content */}
          <div className="font-body text-xs xl:text-sm 2xl:text-sm text-primary-100/80 uppercase tracking-wider whitespace-nowrap">
            Jusqu'au <span className="text-secondary">{endDate}</span>, profitez de :
          </div>

          {/* Badge — same width as date text, centered content */}
          <div className="bg-green-500 h-full justify-center items-center rounded-sm px-6 py-5 xl:px-8 xl:py-6 2xl:px-10 2xl:py-8 flex">
            <span className="font-display text-5xl xl:text-6xl 2xl:text-7xl font-black text-primary-100 ">
              -{discount}%
            </span>
          </div>
        </div>
        {/* BOTTOM / RIGHT — Description + CTA */}
        <div className="flex flex-col gap-1 md:max-w-sm lg:max-w-xs xl:max-w-sm 2xl:max-w-sm xl:gap-1.5 2xl:gap-1.5 ">
          <p className="font-body text-sm xl:text-base 2xl:text-base text-primary-100 leading-relaxed mt-2 md:mt-0 xl:mt-0 2xl:mt-4">
            Économisez jusqu'à <span className="font-bold text-secondary">-{maxSavings}%</span> sur <span className="font-bold text-primary-100">{gameName}</span> {description}
          </p>

          <button className="bg-secondary hover:bg-secondary-300 text-secondary-700 font-display font-bold text-xs xl:text-sm 2xl:text-sm uppercase tracking-wide rounded-lg px-5 py-2 xl:px-6 xl:py-2.5 2xl:px-8 2xl:py-3 transition-colors cursor-pointer w-fit mt-2 xl:mt-3 2xl:mt-3.5 flex items-center gap-2 xl:gap-3 2xl:gap-4">
            Voir l'offre 
            <div className="inline-block w-[18px] h-[18px] xl:w-5 xl:h-5 2xl:w-6 2xl:h-6">
              <SendHorizontal className="w-full h-full" />
            </div>
          </button>
        </div>

      </div>
    </div>
  )
}

export default PromotionDescription