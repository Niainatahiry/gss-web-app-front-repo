import { cn } from '../../lib/cn'

/**
 * Surface primitive.
 *
 *   <Card>                     resting elevation 2
 *   <Card elevation={1}>       nested / inset (e.g. a panel inside a card)
 *   <Card interactive>         hover lift + deeper shadow — clickable cards
 *   <Card radius="sm">         tighter corners (default is the 14px card radius)
 *   <Card as="article">        change the rendered element
 *
 * `interactive` expects a consumer that is actually clickable (button, link
 * wrapper, onClick handler) — it changes affordance, not behaviour.
 *
 * Radius is a prop (not a className override) because `rounded-card` is a
 * custom theme token: tailwind-merge cannot resolve it against `rounded-sm`,
 * so both utilities would survive and CSS order would decide the winner.
 */

const radii = {
  none: '',
  sm: 'rounded-sm',
  md: 'rounded-md',
  control: 'rounded-control',
  card: 'rounded-card',
}

const elevations = {
  1: 'shadow-e1',
  2: 'shadow-e2',
  3: 'shadow-e3',
  4: 'shadow-e4',
}

function Card({
  as: Tag = 'div',
  elevation = 2,
  radius = 'card',
  interactive = false,
  className,
  children,
  ...props
}) {
  return (
    <Tag
      className={cn(
        'bg-primary-600/80 ring-1 ring-white/10',
        radii[radius],
        elevations[elevation],
        interactive &&
          'cursor-pointer transition-all duration-300 ease-material hover:-translate-y-0.5 hover:shadow-e4 hover:ring-white/20 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default Card
