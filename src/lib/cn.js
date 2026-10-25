import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge class names, letting later Tailwind utilities win over earlier ones.
 * Use it in every design-system primitive so callers can override layout
 * classes without fighting the variant defaults.
 *
 *   cn('h-10 px-4', 'h-12') // → 'h-12'
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export default cn
