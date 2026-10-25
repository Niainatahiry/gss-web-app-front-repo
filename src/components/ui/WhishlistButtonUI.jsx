import { Bookmark } from 'lucide-react'
import IconButton from './IconButton'

function WishlistButtonUI() {
  return (
    <IconButton
      aria-label="Ajouter à la wishlist"
      className="w-auto h-auto p-2 bg-tertiary text-primary-700 hover:bg-tertiary-300"
    >
      <Bookmark size={18} className="text-primary-700" fill="currentColor" />
    </IconButton>
  )
}

export default WishlistButtonUI
