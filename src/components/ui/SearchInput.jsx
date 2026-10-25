import { Search } from 'lucide-react'
import Button from './Button'
import { cn } from '../../lib/cn'

/**
 * Search field used outside the desktop header pill — mobile header row and
 * the in-page field on /search.
 *
 * Renders its own <form> (do not nest it inside another form) and spreads
 * the remaining props onto the <input>, so it works controlled (`value` +
 * `onChange`) or uncontrolled (`defaultValue`, optionally with a `key` to
 * reset it when the URL changes — no state-syncing effect needed).
 *
 * The input is named "q", so `new FormData(form).get('q')` works on submit.
 */

const sizes = {
  sm: 'h-9',
  md: 'h-11',
}

function SearchInput({
  onSubmit,
  size = 'md',
  placeholder = 'Rechercher un jeu…',
  label = 'Rechercher un jeu',
  className,
  inputClassName,
  ...inputProps
}) {
  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={cn('flex items-center gap-2', className)}
    >
      <input
        name="q"
        type="text"
        placeholder={placeholder}
        aria-label={label}
        autoComplete="off"
        enterKeyHint="search"
        className={cn(
          'min-w-0 flex-1 rounded-control bg-primary-600/40 px-4 text-sm text-white shadow-e1',
          'outline-none transition-all duration-200 ease-material',
          'placeholder:text-white/40 focus:bg-primary-500/40 focus:shadow-e3',
          sizes[size],
          inputClassName
        )}
        {...inputProps}
      />
      <Button type="submit" variant="primary" icon aria-label={label} className="shrink-0">
        <Search size={18} strokeWidth={2} />
      </Button>
    </form>
  )
}

export default SearchInput
