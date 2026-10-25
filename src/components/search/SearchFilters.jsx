import { useMemo, useState } from 'react'
import { ChevronDown, X } from 'lucide-react'
import { cn } from '../../lib/cn'
import { formatAriary } from '../../utils/formatPrice'
import { DISCOUNT_RANGES } from './searchConfig'

function countBy(items, getKey) {
  return items.reduce((counts, item) => {
    const key = getKey(item)
    counts[key] = (counts[key] ?? 0) + 1
    return counts
  }, {})
}

function sortEntries(counts) {
  return Object.entries(counts).sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'fr')
  )
}

function FilterSection({ title, children }) {
  const [open, setOpen] = useState(true)

  return (
    <section className="border-t border-white/10 py-5 first:border-t-0 first:pt-0">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="group flex w-full cursor-pointer items-center justify-between gap-3 text-left"
      >
        <span className="font-body text-2xl font-semibold text-white">{title}</span>
        <ChevronDown
          size={18}
          className={cn(
            'shrink-0 text-white/40 transition-transform duration-200 group-hover:text-white/70',
            open && 'rotate-180'
          )}
        />
      </button>

      {open && <div className="mt-2 space-y-0.5">{children}</div>}
    </section>
  )
}

function CheckboxRow({ label, count, checked, onChange }) {
  return (
    <label className="-mx-2 flex cursor-pointer items-center gap-3 rounded-control px-2 py-2.5 font-body text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 cursor-pointer accent-secondary"
      />
      <span className="flex-1 leading-snug">{label}</span>
      <span className="text-xs tabular-nums text-white/40">{count}</span>
    </label>
  )
}

function SearchFilters({
  products,
  filters,
  maxPrice,
  priceMax,
  onToggle,
  onPriceChange,
  onReset,
  onClose,
  className,
}) {
  const genres = useMemo(
    () => sortEntries(countBy(products, (product) => product.genre)),
    [products]
  )
  const launchers = useMemo(
    () => sortEntries(countBy(products, (product) => product.launcher)),
    [products]
  )
  const platforms = useMemo(
    () =>
      sortEntries(
        countBy(products.flatMap((product) => product.platforms), (platform) => platform)
      ),
    [products]
  )

  return (
    <div className={cn('rounded-card bg-primary-600/40 p-4 ring-1 ring-white/10', className)}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="font-body text-lg font-semibold uppercase tracking-wide text-white/90">
          Filtres
        </h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="cursor-pointer font-body text-xs text-white/50 transition-colors hover:text-white"
          >
            Réinitialiser
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer les filtres"
              className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-control text-white/40 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <FilterSection title="Prix">
        <div className="mb-2 flex items-center justify-between font-body text-xs text-white/40">
          <span>0 Ar</span>
          <span className="font-semibold text-white/80">{formatAriary(priceMax)} Ar</span>
        </div>
        <input
          type="range"
          min={0}
          max={maxPrice}
          step={10000}
          value={priceMax}
          onChange={(event) => onPriceChange(Number(event.target.value))}
          aria-label="Prix maximum"
          className="w-full cursor-pointer accent-secondary"
        />
      </FilterSection>

      <FilterSection title="Réduction">
        {DISCOUNT_RANGES.map((range) => (
          <CheckboxRow
            key={range.id}
            label={range.label}
            count={
              products.filter(
                (product) => product.discount >= range.min && product.discount <= range.max
              ).length
            }
            checked={filters.discounts.includes(range.id)}
            onChange={() => onToggle('discounts', range.id)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Genre">
        {genres.map(([genre, count]) => (
          <CheckboxRow
            key={genre}
            label={genre}
            count={count}
            checked={filters.genres.includes(genre)}
            onChange={() => onToggle('genres', genre)}
          />
        ))}
    </FilterSection>

      <FilterSection title="Boutique">
        {launchers.map(([launcher, count]) => (
          <CheckboxRow
            key={launcher}
            label={launcher}
            count={count}
            checked={filters.launchers.includes(launcher)}
            onChange={() => onToggle('launchers', launcher)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Plateforme">
        {platforms.map(([platform, count]) => (
          <CheckboxRow
            key={platform}
            label={platform}
            count={count}
            checked={filters.platforms.includes(platform)}
            onChange={() => onToggle('platforms', platform)}
          />
        ))}
      </FilterSection>
    </div>
  )
}

export default SearchFilters
