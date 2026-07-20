import React, { useState } from 'react'
import logoSrc from '../../assets/logos/gss-logo-light.png'
import ShoppingCart from '../ui/ShoppingCart'
import WishlistButtonUI from '../ui/WhishlistButtonUI'
import UserAvatar from '../ui/UserAvatar'
import { ChevronDown, Search } from 'lucide-react'

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  
  // État de connexion — à remplacer par ton context/auth plus tard
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const user = {
    username: 'John Doe',
    avatarUrl: null
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsDropdownOpen(false)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-700/60 backdrop-blur-xl border-b border-white/20 py-6">
      <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left side: Logo + Navigation */}
        <div className="flex items-center gap-6">
          <div className="logo-container shrink-0">
            <img src={logoSrc} alt="GSS Logo" className="h-12 w-auto" />
          </div>
          <nav className="navigation-menus hidden md:flex items-center gap-1 font-body">
            <a href="#" className="text-base font-medium text-primary-100 hover:text-primary-100/80 px-3 py-2 transition-colors">Accueil</a>
            <a href="#" className="text-base font-medium text-primary-100 hover:text-primary-100/80 px-3 py-2 transition-colors">Recommandations</a>
            <a href="#" className="text-base font-medium text-primary-100 hover:text-primary-100/80 px-3 py-2 transition-colors">Genres</a>
          </nav>
        </div>

        {/* Right side */}
        <div className="right-actions flex items-center gap-3 font-body">
          <div className="search-button-container">
            <Search size={28} className="text-primary-100 cursor-pointer hover:text-secondary transition-colors" />
          </div>
          
          <div className='flex items-center px-8 gap-4'>         
            <div className="shopping-cart">
              <ShoppingCart />
            </div>
            <div className="wishlist-button-container">
              <WishlistButtonUI />
            </div>
          </div>   
          
          <div className="user-avatar-container pl-4">
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
      </div>
    </header>
  )
}

export default Header