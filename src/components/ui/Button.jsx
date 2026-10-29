import { cn } from '../../lib/cn'
import surface from './surfaces'

/**
 * Design-system button.
 *
 * Variants
 *  - primary  yellow CTA — one per view. Hard-shadow "slab": the yellow face
 *             sits on an opaque tertiary-100 edge closed by a 1px white
 *             hairline (see --shadow-slab). It reads as a pressed physical
 *             object rather than a floating card.
 *  - tonal    dark filled secondary action
 *  - surface  teal card material — same recipe as the Select trigger
 *  - outline  bordered, on dark surfaces (still the go-to for true ghosts)
 *  - ghost    low-emphasis / nav
 *  - danger   destructive
 *
 * Sizes:  sm | md | lg | icon (icon = square, padding-less). Each size also
 *         sets --slab so the primary CTA's edge scales with the control
 *         instead of looking muddy when small or thin when large.
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
    // Press: collapse the slab — the control sits down into its edge.
    'active:[--slab:0px] active:translate-y-[2px] ' +
    // A secondary ring on a yellow face is invisible; use white. The offset is
    // painted over the slab, so it borrows the slab's own cyan: the offset band
    // merges into the edge instead of chopping it with a dark gap.
    'focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-tertiary-100',
  tonal: 'bg-primary-600 text-white hover:bg-primary-500 hover:shadow-e2',
  surface,
  outline: 'border border-white/15 text-primary-100 hover:border-white/25 hover:bg-white/5',
  ghost: 'text-primary-100 hover:bg-white/5 hover:text-white',
  danger: 'bg-red-600 text-white hover:bg-red-500 hover:shadow-e2',
}

const sizes = {
  sm:   'h-9 px-3 text-xs [--slab:4px]',
  md:   'h-11 px-5 text-sm [--slab:5px]',
  lg:   'h-13 px-7 text-sm [--slab:6px]',
  icon: 'h-10 w-10 p-0 [--slab:4px]',
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
