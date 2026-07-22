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
    <div className="flex flex-col max-w-sm">
      
      <div className="flex flex-col gap-1.5">
        {/* Date limit */}
        <div className="font-body text-sm text-primary-100/80 uppercase tracking-wider">
          Jusqu'au <span className="text-secondary">{endDate}</span>, profitez de :
        </div>

        {/* Big discount badge */}
        <div className="bg-green-500 justify-center items-center rounded-sm px-10 py-8 inline-flex w-fit">
          <span className="font-display text-7xl font-black text-primary-100">
            -{discount}%
          </span>
        </div>

        {/* Description */}
        <p className="font-body text-base text-primary-100 leading-relaxed mt-4">
          Économisez jusqu'à <span className="font-bold text-secondary">-{maxSavings}%</span> sur <span className="font-bold text-primary-100">{gameName}</span> {description}
        </p>
      </div>

      {/* CTA Button — pushed to bottom by justify-between */}
      <button className="bg-secondary hover:bg-secondary-300 text-secondary-700 font-display font-bold text-sm uppercase tracking-wide rounded-lg px-8 py-3 transition-colors cursor-pointer w-fit mt-3.5 flex items-center gap-4">
        Voir l'offre <SendHorizontal size={24}/>
      </button>
    </div>
  )
}

export default PromotionDescription