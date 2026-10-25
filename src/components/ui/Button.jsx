import { cn } from '../../lib/cn'

/**
 * Design-system button.
 *
 * Variants
 *  - primary  yellow CTA — one per view
 *  - tonal    dark filled secondary action
 *  - outline  bordered, on dark surfaces
 *  - ghost    low-emphasis / nav
 *  - danger   destructive
 *
 * Sizes:  sm | md | lg | icon (icon = square, padding-less)
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
  primary: 'bg-secondary text-secondary-700 shadow-e2 hover:bg-secondary-100 hover:shadow-e3',
  tonal: 'bg-primary-600 text-white hover:bg-primary-500 hover:shadow-e2',
  outline: 'border border-white/15 text-primary-100 hover:border-white/25 hover:bg-white/5',
  ghost: 'text-primary-100 hover:bg-white/5 hover:text-white',
  danger: 'bg-red-600 text-white hover:bg-red-500 hover:shadow-e2',
}

const sizes = {
  sm: 'h-9 px-3 text-xs',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-sm',
  icon: 'h-10 w-10 p-0',
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
