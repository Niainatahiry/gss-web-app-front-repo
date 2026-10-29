import { Search } from 'lucide-react'
import Button from './Button'
import { cn } from '../../lib/cn'

/**
 * Search bar — the single implementation behind every search entry point:
 * the desktop header, the mobile header panel and the in-page field on
 * /search. Editing this file changes all three.
 *
 *   <SearchBar
 *     size="lg"                        // sm | md | lg
 *     tone="light"                     // light | surface
 *     value={query}
 *     onChange={(event) => setQuery(event.target.value)}
 *     onSubmit={handleSearch}          // native form submit, (event) => …
 *   />
 *
 * Layout: the field and the button are *siblings* separated by a gap — no
 * joined pill, so there is no seam to hide (the old header bar needed a
 * gradient overlay plus ring/shadow/scale resets just to look attached).
 *
 * Tone
 *  - light    cream face, the header's signature: the only light surface of
 *             the app, which is what makes the bar read as the entry point.
 *  - surface  the teal card material (see surfaces.js), for in-page fields.
 *
 * Form semantics: renders its own <form role="search"> and names the input
 * "q" by default, so `new FormData(event.currentTarget).get('q')` works in
 * the submit handler — callers never need local state to read the query.
 * Works controlled (`value` + `onChange`) or uncontrolled (`defaultValue`,
 * optionally keyed on the URL to resync).
 */

/* The button carries a hard-shadow slab that paints BELOW its box — it adds
   no layout height, but it adds visual height (--slab + 1px, so 3 / 4 / 5px).
   A field sized to the button's *box* therefore reads as smaller than the
   button. Each `field` below is the face height PLUS that ledge, and the row
   is top-aligned (see the form's items-start) so the two bottom edges land on
   the same line:

     sm: 36 + 3 = 39   md: 44 + 4 = 48   lg: 48 + 5 = 53

   If --slab changes in index.css, these three numbers must follow. */
const sizes = {
  sm: {
    // The bottom padding keeps the text centred on the button FACE (which is
    // the ledge shorter) instead of on the taller box.
    field: 'h-[39px] px-3 pb-[3px] text-sm',
    btn: 'h-9 w-9 p-0',
    labeled: 'h-9 px-3 text-xs',
  },
  md: {
    field: 'h-12 px-4 pb-1 text-sm',
    btn: 'h-11 w-11 p-0',
    labeled: 'h-11 px-4 text-sm',
  },
  lg: {
    field: 'h-[53px] px-4 pb-[5px] text-sm',
    btn: 'h-12 w-12 p-0',
    labeled: 'h-12 px-5 text-sm',
  },
}

const base =
  'min-w-0 flex-1 rounded-field outline-none ' +
  'transition-[background-color,box-shadow] duration-200 ease-material ' +
  'motion-reduce:transition-none'

const tones = {
  /* Cream face. The resting hairline is dark (not white) because the header
     behind it is dark: a light ring on a light field would disappear. */
  light:
    'bg-[#F5F5F0] text-primary-700 placeholder:text-primary-700/50 ' +
    'ring-1 ring-primary-700/10 ' +
    'hover:bg-white focus:bg-white focus:ring-2 focus:ring-primary-700/20',
  surface:
    'surface-wash bg-tertiary-400 text-white placeholder:text-white/70 shadow-e1 ' +
    'ring-1 ring-white/10 ' +
    'hover:bg-tertiary-300 focus:bg-tertiary-300 focus:ring-2 focus:ring-white/80 focus:shadow-e2',
}

function SearchBar({
  size = 'md',
  tone = 'surface',
  label = 'Rechercher un jeu',
  placeholder = 'Rechercher un jeu…',
  buttonLabel = '',
  name = 'q',
  value,
  defaultValue,
  onChange,
  onSubmit,
  autoFocus = false,
  inputRef,
  className,
  inputClassName,
  buttonClassName,
  ...inputProps
}) {
  return (
    <form
      role="search"
      onSubmit={onSubmit}
      className={cn('flex items-start gap-2', className)}
    >
      <input
        ref={inputRef}
        name={name}
        type="text"
        autoComplete="off"
        enterKeyHint="search"
        aria-label={label}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        autoFocus={autoFocus}
        className={cn(base, tones[tone], sizes[size].field, inputClassName)}
        {...inputProps}
      />

      {/* Same height as the field by construction, so the pair can never
          drift out of alignment. The slab edge scales through Button's
          size → --slab mapping. */}
      <Button
        type="submit"
        variant="primary"
        size={size}
        aria-label={buttonLabel ? undefined : 'Rechercher'}
        className={cn(
          'shrink-0',
          buttonLabel ? sizes[size].labeled : sizes[size].btn,
          buttonClassName
        )}
      >
        <Search size={18} strokeWidth={2} />
        {buttonLabel && <span>{buttonLabel}</span>}
      </Button>
    </form>
  )
}

export default SearchBar
