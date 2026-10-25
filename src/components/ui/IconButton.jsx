import Button from './Button'

/**
 * Square, icon-only button. Thin wrapper over Button so it inherits every
 * state (focus ring, disabled, active scale) without per-use classes.
 *
 * Pass `aria-label` — there is no visible text.
 */
function IconButton({ variant = 'ghost', ...props }) {
  return <Button variant={variant} icon {...props} />
}

export default IconButton
