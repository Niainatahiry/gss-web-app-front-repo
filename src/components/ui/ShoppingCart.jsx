import React from 'react'
import { ShoppingCart } from 'lucide-react'

export default function ShoppingCartButton() {
  const cartTotal = 125000
  const itemCount = 3

  return (
<button 
  className="group relative inline-flex items-center justify-center w-9 h-9 rounded-lg bg-primary-600 hover:bg-primary-500 text-primary-100 transition-all active:scale-95 cursor-pointer"
  aria-label={`Panier, ${itemCount} articles`}
>
  <ShoppingCart size={18} strokeWidth={2} className="group-hover:text-white transition-colors" />
  {itemCount > 0 && (
    <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-secondary ring-2 ring-primary-600" />
  )}
</button>
  )
}