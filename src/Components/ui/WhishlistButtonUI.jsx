import React from 'react'
import { Bookmark } from 'lucide-react'

function WishlistButtonUI() {
  return (
    <button className="bg-tertiary rounded-md p-2 cursor-pointer hover:bg-tertiary-300 transition-colors">
      <Bookmark size={18} className="text-primary-700" fill="currentColor" />
    </button>
  )
}

export default WishlistButtonUI