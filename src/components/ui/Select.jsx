import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '../../lib/cn'

/**
 * Select primitive — Radix for behaviour/a11y, monochrome surface for the UI.
 *
 *   <Select
 *     aria-label="Trier par"
 *     value={sort}
 *     onValueChange={setSort}
 *     options={SORT_OPTIONS}   // [{ id, label }]
 *     size="sm"                // sm | md
 *   />
 *
 * Radix gives: keyboard (↑/↓, Home/End, type-ahead, Esc, Tab), focus
 * management, portal rendering and ARIA wiring.
 *
 * Visual language: same recipe as the tonal Button — filled surface,
 * elevation instead of a border, monochrome white text.
 *   rest: bg-primary-600/40 + shadow-e2
 *   hover / focus / open: bg-primary-500/40 + shadow-e3
 */

const sizes = {
  sm: 'h-9 pl-3 pr-2.5 text-sm',
  md: 'h-11 pl-4 pr-3 text-sm',
}

const trigger =
  'group inline-flex cursor-pointer items-center justify-between gap-2 whitespace-nowrap ' +
  'rounded-control bg-primary-600/40 text-white/60 shadow-e2 ' +
  'transition-all duration-200 ease-material ' +
  'hover:bg-primary-500/40 hover:text-white hover:shadow-e3 ' +
  'focus-visible:bg-primary-500/40 focus-visible:text-white focus-visible:shadow-e3 focus-visible:outline-none ' +
  'data-[state=open]:bg-primary-500/40 data-[state=open]:text-white data-[state=open]:shadow-e3 ' +
  'data-[placeholder]:text-white/40 ' +
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-50'

const item =
  'flex cursor-pointer select-none items-center justify-between gap-2 ' +
  'rounded-control px-3 py-2 text-sm text-white/60 outline-none ' +
  'data-[highlighted]:bg-white/10 data-[highlighted]:text-white ' +
  'data-[state=checked]:text-white ' +
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-40'

function Select({
  value,
  onValueChange,
  options = [],
  size = 'sm',
  placeholder = 'Sélectionner…',
  className,
  disabled = false,
  ...props
}) {
  return (
    <SelectPrimitive.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <SelectPrimitive.Trigger
        className={cn(trigger, sizes[size], className)}
        {...props}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon asChild>
          <ChevronDown
            size={16}
            className="shrink-0 text-white/50 transition-colors duration-200 group-hover:text-white group-data-[state=open]:text-white"
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          sideOffset={6}
          className={cn(
            'z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden',
            'rounded-card bg-primary-700/95 p-1 shadow-e4 ring-1 ring-white/10 backdrop-blur-xl',
            'data-[state=open]:animate-[select-in_120ms_var(--ease-material)]',
            'motion-reduce:animate-none'
          )}
        >
          <SelectPrimitive.Viewport>
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.id}
                value={option.id}
                className={item}
              >
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator>
                  <Check size={14} className="shrink-0 text-white" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}

export default Select
