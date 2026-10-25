import { ShoppingCart } from 'lucide-react'
import IconButton from './IconButton'

export default function ShoppingCartButton() {
  const itemCount = 3

  return (
    <IconButton
      className="group relative w-9 h-9 bg-tertiary-550 hover:bg-tertiary-500"
      aria-label={`Panier, ${itemCount} articles`}
    >
      <ShoppingCart size={18} strokeWidth={2} className="group-hover:text-white transition-colors" />
      {itemCount > 0 && (
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-secondary ring-2 ring-primary-600" />
      )}
    </IconButton>
  )
}