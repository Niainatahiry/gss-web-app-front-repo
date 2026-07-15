import { BookmarkSimple } from '@phosphor-icons/react'
import React from 'react'

function WishlistButtonUI() {
  return (
    <button className="bg-tertiary rounded-md p-2 cursor-pointer hover:bg-tertiary-300 transition-colors">
      <BookmarkSimple size={16} weight="fill" className="text-primary-700" />
      
    </button>
  )
}

export default WishlistButtonUI