import React from 'react'
import logoSrc from '../../assets/logos/gss-logo-light.png'
import { MagnifyingGlassIcon } from '@phosphor-icons/react'
import ShoppingCart from '../ui/ShoppingCart'
import WishlistButtonUI from '../ui/WhishlistButtonUI'

function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-700/60 backdrop-blur-md border-b border-white/20 py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left side: Logo + Navigation */}
        <div className="flex items-center gap-6">
          <div className="logo-container shrink-0">
            <img
              src={logoSrc}
              alt="GSS Logo"
              className="h-12 w-auto"
            />
          </div>
          <nav className="navigation-menus hidden md:flex items-center gap-1 font-body">
            <a href="#" className="text-base font-medium text-primary-100 hover:text-primary-100/80 px-3 py-2 transition-colors">
              Accueil
            </a>
            <a href="#" className="text-base font-medium text-primary-100 hover:text-primary-100/80 px-3 py-2 transition-colors">
              Recommandations
            </a>
            <a href="#" className="text-base font-medium text-primary-100 hover:text-primary-100/80 px-3 py-2 transition-colors">
              Genres
            </a>
          </nav>
        </div>

        {/* Right side: Cart, Wishlist, etc. */}
        <div className="right-actions flex items-center gap-3 font-body">
          {/* Add cart, wishlist, user icons here */}
          <div className="search-button-container">
            <MagnifyingGlassIcon size={40} className="text-primary-100  "/>
          </div>
          <div className='flex items-center px-8 gap-4'>         
            <div className="shopping-cart">
              <ShoppingCart />
            </div>
            <div className="whishilst-button-container">
              <WishlistButtonUI />
            </div>
          </div>   
        </div>
      </div>
    </header>
  )
}

export default Header