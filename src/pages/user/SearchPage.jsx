import { useCallback, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SearchX } from 'lucide-react'
import ProductCard from '../../components/ui/ProductCard'
import Button from '../../components/ui/Button'
import SearchFilters from '../../components/search/SearchFilters'
import SearchFiltersDrawer from '../../components/search/SearchFiltersDrawer'
import SearchToolbar from '../../components/search/SearchToolbar'
import { DISCOUNT_RANGES } from '../../components/search/searchConfig'
import { products } from '../../data/products'
import { formatAriary } from '../../utils/formatPrice'

const MAX_PRICE = Math.max(...products.map((product) => product.salePrice))

const EMPTY_FILTERS = {
  genres: [],
  launchers: [],
  platforms: [],
  discounts: [],
}

const SORT_COMPARATORS = {
  priceAsc: (a, b) => a.salePrice - b.salePrice,
  priceDesc: (a, b) => b.salePrice - a.salePrice,
  discount: (a, b) => b.discount - a.discount,
  name: (a, b) => a.productName.localeCompare(b.productName, 'fr'),
}

function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() ?? ''

  const [filters, setFilters] = useState(EMPTY_FILTERS)
  const [priceMax, setPriceMax] = useState(MAX_PRICE)
  const [sort, setSort] = useState('relevance')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const queryResults = useMemo(() => {
    const needle = query.toLowerCase()
    if (!needle) return products

    return products.filter((product) =>
      [product.productName, product.genre, product.launcher]
        .join(' ')
        .toLowerCase()
        .includes(needle)
    )
  }, [query])

  const results = useMemo(() => {
    const selectedRanges = DISCOUNT_RANGES.filter((range) =>
      filters.discounts.includes(range.id)
    )

    const filtered = queryResults.filter(
      (product) =>
        (filters.genres.length === 0 || filters.genres.includes(product.genre)) &&
        (filters.launchers.length === 0 ||
          filters.launchers.includes(product.launcher)) &&
        (filters.platforms.length === 0 ||
          product.platforms.some((platform) => filters.platforms.includes(platform))) &&
        (selectedRanges.length === 0 ||
          selectedRanges.some(
            (range) => product.discount >= range.min && product.discount <= range.max
          )) &&
        product.salePrice <= priceMax
    )

    if (sort === 'relevance') return filtered
    return [...filtered].sort(SORT_COMPARATORS[sort])
  }, [queryResults, filters, priceMax, sort])

  const activeFilters = useMemo(() => {
    const list = [
      ...(query ? [{ key: 'query', label: `« ${query} »` }] : []),
      ...filters.genres.map((genre) => ({ key: 'genres', value: genre, label: genre })),
      ...filters.launchers.map((launcher) => ({
        key: 'launchers',
        value: launcher,
        label: launcher,
      })),
      ...filters.platforms.map((platform) => ({
        key: 'platforms',
        value: platform,
        label: platform,
      })),
      ...filters.discounts.map((id) => ({
        key: 'discounts',
        value: id,
        label: DISCOUNT_RANGES.find((range) => range.id === id)?.label ?? id,
      })),
    ]

    if (priceMax < MAX_PRICE) {
      list.push({ key: 'price', label: `≤ ${formatAriary(priceMax)} Ar` })
    }

    return list
  }, [query, filters, priceMax])

  const toggleFilter = (facet, value) => {
    setFilters((previous) => ({
      ...previous,
      [facet]: previous[facet].includes(value)
        ? previous[facet].filter((item) => item !== value)
        : [...previous[facet], value],
    }))
  }

  const resetFilters = () => {
    setFilters(EMPTY_FILTERS)
    setPriceMax(MAX_PRICE)
  }

  const removeFilter = (filter) => {
    if (filter.key === 'query') {
      setSearchParams({}, { replace: true })
      return
    }

    if (filter.key === 'price') {
      setPriceMax(MAX_PRICE)
      return
    }

    toggleFilter(filter.key, filter.value)
  }

  const resetAll = () => {
    resetFilters()
    setSort('relevance')
    setSearchParams({}, { replace: true })
  }

  const closeFilters = useCallback(() => setFiltersOpen(false), [])

  return (
    <div className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 md:px-8 lg:px-10 xl:px-0">
      <nav
        aria-label="Fil d'Ariane"
        className="mb-3 flex items-center gap-2 font-body text-xs text-primary-300"
      >
        <Link to="/" className="transition-colors hover:text-white">
          Accueil
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-primary-200">Recherche</span>
      </nav>

      <header className="mb-6 md:mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl text-white/80">
          {query ? 'Résultats de recherche' : 'Tous les produits'}
        </h1>
        <p aria-live="polite" className="mt-1 font-body text-sm text-primary-200">
          {query ? (
            <>
              Pour « <span className="text-white/80">{query}</span> » ·{' '}
            </>
          ) : null}
          {results.length} produit{results.length > 1 ? 's' : ''} affiché
          {results.length > 1 ? 's' : ''}
        </p>
      </header>

      <SearchFiltersDrawer open={filtersOpen} onClose={closeFilters}>
        <SearchFilters
          products={queryResults}
          filters={filters}
          maxPrice={MAX_PRICE}
          priceMax={priceMax}
          onToggle={toggleFilter}
          onPriceChange={setPriceMax}
          onReset={resetFilters}
          onClose={closeFilters}
          className="rounded-none bg-transparent p-0 ring-0"
        />
      </SearchFiltersDrawer>

      <SearchToolbar
        count={results.length}
        sort={sort}
        onSortChange={setSort}
        activeFilters={activeFilters}
        onRemoveFilter={removeFilter}
        onReset={resetFilters}
        onToggleFilters={() => setFiltersOpen((open) => !open)}
        filtersOpen={filtersOpen}
      />

      {results.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5">
          {results.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 rounded-card bg-primary-600/30 py-20 text-center ring-1 ring-white/10">
          <SearchX size={44} className="text-white/25" />

          <div>
            <p className="font-body font-semibold text-white/80">Aucun résultat</p>
            <p className="mt-1 font-body text-sm text-primary-200">
              {query
                ? 'Essayez avec d’autres mots-clés ou retirez des filtres.'
                : 'Aucun produit ne correspond aux filtres sélectionnés.'}
            </p>
          </div>

          <Button variant="outline" onClick={resetAll}>
            Réinitialiser la recherche
          </Button>
        </div>
      )}
    </div>
  )
}

export default SearchPage
