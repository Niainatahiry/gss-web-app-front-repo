import { useState } from 'react'
import logoSrc from '../../assets/logos/gss-logo-with-white-text.png'
import logoMobile from '../../assets/logos/gss-logo-transparent-for-dark-background.png'
import ShoppingCart from '../ui/ShoppingCart'
import UserAvatar from '../ui/UserAvatar'
import { Search, Menu, X, User } from 'lucide-react'
import BrowseDropdown from '../ui/BrowseDropdown'
import { Link } from 'react-router-dom'
import { pauseHeroAutoplay, resumeHeroAutoplay } from '../../utils/heroAutoplay'

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
    <header
      className="fixed w-full top-0 left-0 right-0 z-50 bg-primary-700/60 backdrop-blur-xl"
      onPointerEnter={pauseHeroAutoplay}
      onPointerLeave={resumeHeroAutoplay}
    >

  {/* ==================== TOP ROW ==================== */}
  <div className="w-full px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">

    {/* Logo */}
    <div className="flex items-center gap-4 shrink-0">

      {/* Mobile hamburger */}
      <button
        onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
        className="inline-flex lg:hidden items-center justify-center w-9 h-9 rounded-lg text-primary-100 hover:bg-primary-600 transition-colors cursor-pointer"
        aria-label="Menu navigation"
      >
        {isNavMenuOpen
          ? <X size={18} strokeWidth={2} />
          : <Menu size={18} strokeWidth={2} />
        }
      </button>

      <Link to="/" className="logo-container shrink-0">
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
      </Link>

    </div>

{/* Search */}
<div className="hidden lg:flex flex-1 justify-center px-12">
  <div className="relative w-full max-w-xl flex items-center">

    {/* Search input — off-white/cream background */}
    <input
      type="text"
      placeholder="Rechercher un jeu..."
      className="
        w-full
        h-14
        pl-5 pr-32
        rounded-l-full
        bg-[#f5f5f0]
        border border-r-0 border-primary-100/10
        text-primary-700
        placeholder:text-primary-700/40
        outline-none
        transition-all
        focus:bg-white
        focus:border-primary-100/20
      "
    />

    {/* Search button — bg-secondary on the right */}
    <button
      type="submit"
      className="
        h-14
        px-6
        rounded-r-full
        bg-secondary/80
        hover:bg-secondary
        text-secondary-700
        font-medium
        flex items-center gap-2
        transition-colors
        shrink-0
      "
    >
      <Search
        size={18}
        strokeWidth={2}
      />
    </button>

  </div>
    </div>


    {/* Right side */}
    <div className="flex items-center gap-4 font-body shrink-0">

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
              <UserAvatar
                username={user.username}
                avatarUrl={user.avatarUrl}
              />
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-primary-600 rounded-lg border border-primary-400 shadow-xl overflow-hidden z-50">
                <div className="py-1">

                  <a
                    href="#"
                    className="block px-4 py-2.5 text-sm text-primary-100 hover:bg-primary-500 transition-colors"
                  >
                    Mon profil
                  </a>

                  <a
                    href="#"
                    className="block px-4 py-2.5 text-sm text-primary-100 hover:bg-primary-500 transition-colors"
                  >
                    Mes achats
                  </a>

                  <a
                    href="#"
                    className="block px-4 py-2.5 text-sm text-primary-100 hover:bg-primary-500 transition-colors"
                  >
                    Paramètres
                  </a>

                  <div className="border-t border-primary-400 my-1" />

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


  {/* ==================== DESKTOP NAVIGATION ==================== */}
  <nav className="hidden lg:flex h-12 items-center justify-center gap-1 font-body border-t border-primary-100/5">

    <BrowseDropdown />

    <a
      href="#"
      className="text-base font-medium text-primary-100 hover:text-secondary px-4 py-2 transition-colors rounded-lg hover:bg-primary-600/50"
    >
      Recommandations
    </a>

    <a
      href="#"
      className="text-base font-medium text-primary-100 hover:text-secondary px-4 py-2 transition-colors rounded-lg hover:bg-primary-600/50"
    >
      Genres
    </a>

  </nav>


  {/* ==================== MOBILE NAVIGATION ==================== */}
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