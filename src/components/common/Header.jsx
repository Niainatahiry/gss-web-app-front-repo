import React, { useState } from 'react'
import logoSrc from '../../assets/logos/gss-logo-with-white-text.png'
import logoMobile from '../../assets/logos/gss-logo-transparent-for-dark-background.png'
import ShoppingCart from '../ui/ShoppingCart'
import UserAvatar from '../ui/UserAvatar'
import { Search, Menu, X, User } from 'lucide-react'
import BrowseDropdown from '../ui/BrowseDropdown'

function Header() {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const user = {
    username: 'John Doe',
    avatarUrl: null
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsUserMenuOpen(false)
  }

  const navLinks = [
    { label: 'Accueil', href: '#' },
    { label: 'Recommandations', href: '#' },
    { label: 'Genres', href: '#' },
  ]

  return (
    <header className="fixed w-full top-0 left-0 right-0 z-50 bg-primary-700/60 backdrop-blur-xl py-6 lg:py-0 hover:bg-primary-700 transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left side: Hamburger (mobile only) + Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
            className="inline-flex lg:hidden items-center justify-center w-9 h-9 rounded-lg text-primary-100 hover:bg-primary-600 transition-colors cursor-pointer"
            aria-label="Menu navigation"
          >
            {isNavMenuOpen ? <X size={18} strokeWidth={2} /> : <Menu size={18} strokeWidth={2} />}
          </button>

          <div className="logo-container shrink-0">
            <img 
              src={logoSrc} 
              alt="GSS Logo" 
              className="h-12 w-auto hidden sm:block" 
            />
            <img 
              src={logoMobile} 
              alt="GSS" 
              className="h-7 w-auto sm:hidden" 
            />
          </div>
        </div>

        {/* Center: Desktop Navigation (visible on lg+) */}
        <nav className="hidden lg:flex items-center gap-1 font-body">
          <BrowseDropdown />
          
          <a href="#" className="text-base font-medium text-primary-100 hover:text-secondary px-4 py-2 transition-colors rounded-lg hover:bg-primary-600/50">
            Recommandations
          </a>
          <a href="#" className="text-base font-medium text-primary-100 hover:text-secondary px-4 py-2 transition-colors rounded-lg hover:bg-primary-600/50">
            Genres
          </a>
        </nav>

        {/* Right side: Search + Cart + User */}
        <div className="flex items-center gap-4 font-body">
          <button 
            className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-primary-100 hover:bg-primary-600 hover:text-secondary transition-all active:scale-95 cursor-pointer"
            aria-label="Rechercher"
          >
            <Search size={18} strokeWidth={2} />
          </button>

          <div className="shopping-cart">
            <ShoppingCart />
          </div>

          <div className="user-avatar-container">
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="inline-flex items-center justify-center cursor-pointer"
                >
                  <UserAvatar username={user.username} avatarUrl={user.avatarUrl} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-primary-600 rounded-lg border border-primary-400 shadow-xl overflow-hidden z-50">
                    <div className="py-1">
                      <a href="#" className="block px-4 py-2.5 text-sm text-primary-100 hover:bg-primary-500 transition-colors">Mon profil</a>
                      <a href="#" className="block px-4 py-2.5 text-sm text-primary-100 hover:bg-primary-500 transition-colors">Mes achats</a>
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
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-primary-100 hover:bg-primary-600 transition-all active:scale-95 cursor-pointer"
                aria-label="Se connecter"
              >
                <User size={18} strokeWidth={2} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu (dropdown, hidden on lg+) */}
      {isNavMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-primary-700/95 backdrop-blur-xl border-b border-primary-100/10 shadow-2xl">
          <div className="px-4 py-6 font-body">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsNavMenuOpen(false)}
                  className="text-lg font-medium text-primary-100 hover:text-primary-100/80 px-3 py-2 transition-colors rounded-lg hover:bg-primary-600"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header