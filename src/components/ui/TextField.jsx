import { CircleAlert } from 'lucide-react'
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
 * - `error` renders a discreet bordered alert state (border + inline message +
 *   red active indicator), and wires `aria-invalid` / `aria-describedby` to
 *   the field.
 * - `inputRef` exposes the native input (focus management on submit).
 */
function TextField({
  id,
  label,
  trailing,
  error,
  inputRef,
  className,
  inputClassName,
  labelClassName,
  ...props
}) {
  const errorId = error ? `${id}-error` : undefined

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
          ref={inputRef}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={errorId}
          className={cn(
            'peer h-12 w-full rounded-md border px-4 text-[15px] text-tertiary-550 caret-tertiary-550',
            'outline-none placeholder:text-tertiary-550/50',
            'transition-[background-color,border-color] duration-200 ease-material',
            'bg-[#C8E4E4] hover:bg-[#D3E9E9] focus:bg-[#EAF6F6] focus:hover:bg-[#EAF6F6]',
            error ? 'border-red-300' : 'border-transparent',
            'motion-reduce:transition-none',
            trailing && 'pr-12',
            inputClassName
          )}
          {...props}
        />

        {/* Active indicator — white bar under the field (red on error) */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-x-3 -bottom-0.5 h-0.5',
            'origin-center scale-x-0 rounded-full',
            error ? 'bg-red-300' : 'bg-white/90',
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

      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 flex items-start gap-1.5 text-sm font-medium leading-4 text-red-300"
        >
          <CircleAlert
            size={14}
            strokeWidth={2.5}
            className="mt-px shrink-0"
            aria-hidden="true"
          />
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}

export default TextField
