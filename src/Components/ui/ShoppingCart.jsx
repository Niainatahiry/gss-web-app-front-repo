import React from 'react'
import { ShoppingCartSimple as CartIcon } from '@phosphor-icons/react'

export default function ShoppingCart() {
  const cartTotal = 125000
  const itemCount = 3

  return (
    <div className="relative inline-block">
      <button className="flex items-center gap-2 bg-primary-600 rounded-lg px-2 py-2 cursor-pointer hover:bg-primary-500 transition-colors">
        <span className="font-mono text-sm font-medium text-primary-100 px-1.5">
          {cartTotal} AR
        </span>
        <div className="bg-secondary rounded-md p-2 flex items-center justify-center">
          <CartIcon size={16} weight="fill" className="text-primary-700" />
        </div>
      </button>

      {/* Badge en bas à droite, plus grand */}
      <span className="absolute -right-2.5 -bottom-2.5 bg-red-500 text-white text-xs font-bold min-w-[22px] h-[22px] rounded-full flex items-center justify-center px-1 border-2 border-primary-600">
        {itemCount}
      </span>
    </div>
  )
}