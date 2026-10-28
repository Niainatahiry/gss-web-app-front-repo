import { cn } from '../../lib/cn'

/**
 * Material 3 « filled » text field, adapted to the GSS palette.
 *
 * - Label always visible above the field (like the design system mockups).
 * - Filled container: #C8E4E4 at rest, lightens on hover and focus.
 * - No coloured focus border/ring: the focus cue is the animated white
 *   active indicator sitting just under the field, where it stays visible
 *   against the teal page/card background.
 * - `trailing` hosts an optional control inside the field (e.g. the
 *   password visibility toggle).
 */
function TextField({
  id,
  label,
  trailing,
  className,
  inputClassName,
  labelClassName,
  ...props
}) {
  return (
    <div className={cn('group', className)}>
      <label
        htmlFor={id}
        className={cn(
          'mb-2 block text-sm font-medium text-white/85',
          'transition-[color,transform] duration-200 ease-material',
          'group-has-[input:focus]:-translate-y-px group-has-[input:focus]:text-white',
          'motion-reduce:transition-none motion-reduce:translate-none',
          labelClassName
        )}
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={id}
          className={cn(
            'peer h-12 w-full rounded-md border-0 bg-[#C8E4E4] px-4 text-[15px] text-tertiary-550 caret-tertiary-550',
            'outline-none placeholder:text-tertiary-550/50',
            'transition-[background-color] duration-200 ease-material',
            'hover:bg-[#D3E9E9] focus:bg-[#EAF6F6] focus:hover:bg-[#EAF6F6]',
            'motion-reduce:transition-none',
            trailing && 'pr-12',
            inputClassName
          )}
          {...props}
        />

        {/* Active indicator — white bar under the field, Material style */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5',
            'origin-center scale-x-0 rounded-full bg-white/90',
            'transition-transform duration-200 ease-material',
            'peer-focus:scale-x-100 motion-reduce:transition-none'
          )}
        />

        {trailing && (
          <div className="absolute inset-y-0 right-0 flex items-center">
            {trailing}
          </div>
        )}
      </div>
    </div>
  )
}

export default TextField
