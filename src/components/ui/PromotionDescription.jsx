import { SendHorizontal } from 'lucide-react'
import Button from './Button'

function PromotionDescription({ 
  endDate = "15 Juillet 2026",
  discount = "44",
  maxSavings = "44",
  gameName = "FORZA HORIZON 6",
  description = "la meilleure licence automobile du moment. Achetez un compte Steam neuf avec le jeu à un prix imbattable."
}) {
  return (
    <div className="flex w-full flex-col md:max-w-2xl xl:max-w-sm">

      <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-8 xl:flex-col xl:gap-3">

        {/* Date + Badge — inline on stacked layouts, stacked from md.
            Keeps the mobile promo short instead of a 80px badge on its own row. */}
        <div className="flex w-fit flex-wrap items-center gap-3 md:shrink-0 md:flex-col md:items-start md:gap-1.5">
          <div className="font-body text-xs text-primary-100/80 uppercase tracking-wider whitespace-nowrap xl:text-sm">
            Jusqu'au <span className="text-secondary">{endDate}</span><span className="hidden sm:inline"> profitez de</span> :
          </div>

          <div className="bg-secondary flex h-16 items-center justify-center rounded-sm px-4 py-2 sm:h-20 md:h-30 md:w-full md:px-6 md:py-5 xl:h-32 xl:px-8 xl:py-6 2xl:h-36 2xl:px-10 2xl:py-8">
            <span className="font-display text-3xl font-black text-black/90 sm:text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl">
              -{discount}%
            </span>
          </div>
        </div>

        {/* Description + CTA */}
        <div className="flex min-w-0 flex-col items-start gap-2 md:max-w-sm md:flex-1 xl:flex-none">
          <p className="font-body text-left text-sm leading-relaxed text-primary-100 line-clamp-2 md:line-clamp-none xl:text-base">
            Économisez jusqu'à <span className="font-bold text-secondary">-{maxSavings}%</span> sur <span className="font-bold text-primary-100">{gameName}</span> {description}
          </p>

          <Button className="mt-1 h-auto w-fit gap-2 px-6 py-3 text-xs uppercase tracking-wide md:mt-2 xl:gap-3 xl:px-6 xl:py-2.5 xl:text-sm 2xl:gap-4 2xl:px-8 2xl:py-3">
            Voir l'offre 
            <span className="inline-block h-[18px] w-[18px] xl:h-5 xl:w-5 2xl:h-6 2xl:w-6">
              <SendHorizontal className="h-full w-full" />
            </span>
          </Button>
        </div>

      </div>
    </div>
  )
}

export default PromotionDescription
