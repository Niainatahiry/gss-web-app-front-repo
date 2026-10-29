import { cn } from '../../lib/cn'
import surface from './surfaces'

/**
 * Design-system button.
 *
 * Variants
 *  - primary  yellow CTA — one per view. Extruded "slab" (--shadow-slab): a
 *             copy of the button offset down-right behind the face, so the
 *             control reads as a physical object seen from the front-left.
 *  - tonal    dark filled secondary action
 *  - surface  teal card material — same recipe as the Select trigger
 *  - outline  bordered, on dark surfaces (still the go-to for true ghosts)
 *  - ghost    low-emphasis / nav
 *  - danger   destructive
 *
 * Sizes:  sm | md | lg | icon (icon = square, padding-less). Each size also
 *         sets the slab depths (--slab-x / --slab-y) so the base scales with
 *         the control instead of looking muddy when small.
 * Shapes: default | pill | none — explicit so special cases (search bar,
 *         circular gallery controls) never have to fight the merge layer.
 */

const base =
  'inline-flex items-center justify-center gap-2 font-body font-semibold ' +
  'transition-all duration-200 ease-material cursor-pointer select-none ' +
  'active:scale-[0.98] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ' +
  'focus-visible:ring-offset-2 focus-visible:ring-offset-primary ' +
  'disabled:pointer-events-none disabled:opacity-50'

const variants = {
  primary:
    'bg-secondary text-secondary-700 shadow-slab hover:bg-secondary-100 ' +
    // Press: zero both depths, so the base collapses and the button sits flat.
    'active:[--slab-x:0px] active:[--slab-y:0px] active:translate-y-[1px] ' +
    // A yellow ring on a yellow face is invisible; an outer ring would be
    // drawn over the base. Inset stays visible and never fights the slab.
    'focus-visible:ring-white focus-visible:ring-inset focus-visible:ring-offset-0',
  tonal: 'bg-primary-600 text-white hover:bg-primary-500 hover:shadow-e2',
  surface,
  outline: 'border border-white/15 text-primary-100 hover:border-white/25 hover:bg-white/5',
  ghost: 'text-primary-100 hover:bg-white/5 hover:text-white',
  danger: 'bg-red-600 text-white hover:bg-red-500 hover:shadow-e2',
}

const sizes = {
  sm: 'h-9 px-3 text-xs [--slab-x:2px] [--slab-y:3px]',
  md: 'h-11 px-5 text-sm [--slab-x:2px] [--slab-y:4px]',
  lg: 'h-13 px-7 text-sm [--slab-x:3px] [--slab-y:5px]',
  icon: 'h-10 w-10 p-0 [--slab-x:2px] [--slab-y:3px]',
}

const shapes = {
  default: 'rounded-control',
  pill: 'rounded-full',
  none: '',
}

function Button({
  variant = 'primary',
  size = 'md',
  shape = 'default',
  icon = false,
  type = 'button',
  className,
  ...props
}) {
  return (
    <button
      type={type}
      className={cn(
        base,
        variants[variant],
        sizes[icon ? 'icon' : size],
        shapes[shape],
        className
      )}
      {...props}
    />
  )
}

export default Button
