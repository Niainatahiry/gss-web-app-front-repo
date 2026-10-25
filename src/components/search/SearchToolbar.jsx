import { SlidersHorizontal, X } from 'lucide-react'
import Button from '../ui/Button'
import Select from '../ui/Select'
import { SORT_OPTIONS } from './searchConfig'

function SearchToolbar({
  count,
  sort,
  onSortChange,
  activeFilters,
  onRemoveFilter,
  onReset,
  onToggleFilters,
  filtersOpen,
}) {
  return (
    <div className="mb-4 sm:mb-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="surface"
            size="sm"
            className="text-sm"
            onClick={onToggleFilters}
            aria-expanded={filtersOpen}
            aria-controls="search-filters"
          >
            <SlidersHorizontal size={15} />
            Filtres
            {activeFilters.length > 0 && (
              <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[11px] font-bold text-white">
                {activeFilters.length}
              </span>
            )}
          </Button>

          <p className="font-body text-sm text-white/50">
            <span className="font-semibold text-white/80">{count}</span>{' '}
            résultat{count > 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex items-center gap-2 font-body text-sm text-white/50">
          <span className="hidden sm:inline">Trier par</span>
          <Select
            aria-label="Trier par"
            value={sort}
            onValueChange={onSortChange}
            options={SORT_OPTIONS}
            size="sm"
            className="min-w-48"
          />
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {activeFilters.map((filter) => (
            <button
              key={`${filter.key}-${filter.value ?? 'all'}`}
              type="button"
              onClick={() => onRemoveFilter(filter)}
              className="group inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 bg-white/5 py-1 pl-2.5 pr-2 font-body text-xs text-white/70 transition-colors hover:border-white/20 hover:bg-white/10"
            >
              {filter.label}
              <X
                size={12}
                className="text-white/40 transition-colors group-hover:text-white"
              />
            </button>
          ))}
          <button
            type="button"
            onClick={onReset}
            className="cursor-pointer font-body text-xs text-white/50 underline underline-offset-4 transition-colors hover:text-white"
          >
            Tout effacer
          </button>
        </div>
      )}
    </div>
  )
}

export default SearchToolbar
