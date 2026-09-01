import React, { useState } from 'react'
import logoSrc from '../../assets/logos/gss-logo-light.png'
import logoCompactSrc from '../../assets/logos/gss-logo-icon.png'
import ShoppingCart from '../ui/ShoppingCart'
import WishlistButtonUI from '../ui/WhishlistButtonUI'
import { ChevronDown, Search, Menu, X } from 'lucide-react'
import UserAvatar from '../ui/UserAvatar'

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const user = {
    username: 'John Doe',
    avatarUrl: null
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsDropdownOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="fixed w-full top-0 left-0 right-0 z-50 bg-primary-700/60 backdrop-blur-xl border-b border-primary-100/10 py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left side: Logo + Navigation */}
        <div className="flex items-center gap-6">
          <div className="logo-container shrink-0">
            {/* Full logo — visible à partir de sm */}
            <img 
              src={logoSrc} 
              alt="GSS Logo" 
              className="h-12 w-auto hidden sm:block" 
            />
            {/* Compact logo — visible UNIQUEMENT en dessous de sm */}
            <img 
              src={logoCompactSrc} 
              alt="GSS" 
              className="h-10 w-auto sm:hidden" 
            />
          </div>
          
          {/* Navigation — visible à partir de md */}
          <nav className="navigation-menus hidden md:flex items-center gap-1 font-body">
            <a href="#" className="text-base font-medium text-primary-100 hover:text-primary-100/80 px-3 py-2 transition-colors">Accueil</a>
            <a href="#" className="text-base font-medium text-primary-100 hover:text-primary-100/80 px-3 py-2 transition-colors">Recommandations</a>
            <a href="#" className="text-base font-medium text-primary-100 hover:text-primary-100/80 px-3 py-2 transition-colors">Genres</a>
          </nav>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 font-body">
          {/* Search — TOUJOURS visible */}
          <button 
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-primary-100 hover:bg-primary-600 hover:text-secondary transition-all active:scale-95 cursor-pointer"
            aria-label="Rechercher"
          >
            <Search size={18} strokeWidth={2} />
          </button>

          {/* Utils — visibles UNIQUEMENT à partir de lg */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="shopping-cart">
              <ShoppingCart />
            </div>
            
            <div className="user-avatar-container">
              {isLoggedIn ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    <UserAvatar username={user.username} avatarUrl={user.avatarUrl} />
                    <ChevronDown 
                      size={16} 
                      className={`text-primary-100 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-primary-600 rounded-lg border border-primary-400 shadow-xl overflow-hidden z-50">
                      <div className="py-1">
                        <a href="#" className="block px-4 py-2.5 text-sm text-primary-100 hover:bg-primary-500 transition-colors">Mon profil</a>
                        <a href="#" className="block px-4 py-2.5 text-sm text-primary-100 hover:bg-primary-500 transition-colors">Mes commandes</a>
                        <a href="#" className="block px-4 py-2.5 text-sm text-primary-100 hover:bg-primary-500 transition-colors">Paramètres</a>
                        <div className="border-t border-primary-400 my-1"></div>
                        <button 
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-primary-500 transition-colors cursor-pointer"
                        >
                          Se déconnecter
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button 
                  onClick={() => setIsLoggedIn(true)}
                  className="bg-secondary hover:bg-secondary-300 text-secondary-700 font-body text-sm font-medium rounded-lg px-4 py-2 transition-colors cursor-pointer"
                >
                  Se connecter
                </button>
              )}
            </div>
          </div>

          {/* Hamburger — visible en dessous de lg */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg text-primary-100 hover:bg-primary-600 transition-colors cursor-pointer"
            aria-label="Ouvrir le menu"
          >
            {isMobileMenuOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-primary-700/95 backdrop-blur-xl border-b border-primary-100/10 shadow-2xl">
          <div className="px-4 py-6 space-y-4 font-body">
            {/* Nav links — dans le menu UNIQUEMENT sur sm */}
            <nav className="flex flex-col gap-2 md:hidden">
              <a href="#" className="text-lg font-medium text-primary-100 hover:text-primary-100/80 px-3 py-2 transition-colors rounded-lg hover:bg-primary-600">Accueil</a>
              <a href="#" className="text-lg font-medium text-primary-100 hover:text-primary-100/80 px-3 py-2 transition-colors rounded-lg hover:bg-primary-600">Recommandations</a>
              <a href="#" className="text-lg font-medium text-primary-100 hover:text-primary-100/80 px-3 py-2 transition-colors rounded-lg hover:bg-primary-600">Genres</a>
            </nav>

            <div className="border-t border-primary-400/30 my-2 md:hidden"></div>

            {/* Utils */}
            <div className="flex items-center justify-between px-3">
              <div className="flex items-center gap-4">
                <div className="shopping-cart">
                  <ShoppingCart />
                </div>
              </div>
            </div>

            <div className="border-t border-primary-400/30 my-2"></div>

            {/* User Section */}
            <div className="px-3">
              {isLoggedIn ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 pb-2">
                    <UserAvatar username={user.username} avatarUrl={user.avatarUrl} />
                    <span className="text-primary-100 font-medium">{user.username}</span>
                  </div>
                  <a href="#" className="block px-3 py-2 text-sm text-primary-100 hover:bg-primary-600 rounded-lg transition-colors">Mon profil</a>
                  <a href="#" className="block px-3 py-2 text-sm text-primary-100 hover:bg-primary-600 rounded-lg transition-colors">Mes commandes</a>
                  <a href="#" className="block px-3 py-2 text-sm text-primary-100 hover:bg-primary-600 rounded-lg transition-colors">Paramètres</a>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-primary-600 rounded-lg transition-colors cursor-pointer"
                  >
                    Se déconnecter
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsLoggedIn(true)}
                  className="w-full bg-secondary hover:bg-secondary-300 text-secondary-700 font-body text-sm font-medium rounded-lg px-4 py-3 transition-colors cursor-pointer"
                >
                  Se connecter
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header