import { useState } from 'react'
import logoSrc from '../../assets/logos/gss-logo-with-white-text.png'
import logoMobile from '../../assets/logos/gss-logo-transparent-for-dark-background.png'
import ShoppingCart from '../ui/ShoppingCart'
import UserAvatar from '../ui/UserAvatar'
import { Search, Menu, X, User } from 'lucide-react'
import BrowseDropdown from '../ui/BrowseDropdown'
import Button from '../ui/Button'
import IconButton from '../ui/IconButton'
import { Link, useNavigate } from 'react-router-dom'
import { pauseHeroAutoplay, resumeHeroAutoplay } from '../../utils/heroAutoplay'

function Header() {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const user = {
    username: 'John Doe',
    avatarUrl: null
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsUserMenuOpen(false)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    const query = searchQuery.trim()
    navigate(query ? `/search?q=${encodeURIComponent(query)}` : '/search')
  }

  const handleMobileSearch = (event) => {
    handleSearch(event)
    setIsNavMenuOpen(false)
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
      <IconButton
        onClick={() => setIsNavMenuOpen(!isNavMenuOpen)}
        className="lg:hidden w-9 h-9"
        aria-label="Menu navigation"
      >
        {isNavMenuOpen
          ? <X size={18} strokeWidth={2} />
          : <Menu size={18} strokeWidth={2} />
        }
      </IconButton>

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
<form
  onSubmit={handleSearch}
  role="search"
  className="hidden lg:flex flex-1 justify-center px-12"
>
  <div className="relative w-full max-w-xl flex items-center">

    {/* Search input — off-white/cream background */}
    <input
      type="text"
      value={searchQuery}
      onChange={(event) => setSearchQuery(event.target.value)}
      placeholder="Rechercher un jeu..."
      aria-label="Rechercher un jeu"
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
    <Button
      type="submit"
      shape="none"
      aria-label="Rechercher"
      className="h-14 px-6 shrink-0 rounded-r-full"
    >
      <Search
        size={18}
        strokeWidth={2}
      />
    </Button>

  </div>
</form>


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
              <div className="absolute right-0 top-full mt-2 w-48 bg-primary-600 rounded-card border border-primary-400 shadow-e4 overflow-hidden z-50">
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

                  <Button
                    variant="ghost"
                    shape="none"
                    onClick={handleLogout}
                    className="w-full justify-start rounded-none px-4 py-2.5 text-sm text-red-400 hover:bg-primary-500 hover:text-red-400"
                  >
                    Se déconnecter
                  </Button>

                </div>
              </div>
            )}

          </div>
        ) : (
          <IconButton
            onClick={() => setIsLoggedIn(true)}
            className="w-9 h-9"
            aria-label="Se connecter"
          >
            <User size={18} strokeWidth={2} />
          </IconButton>
        )}
      </div>

    </div>

  </div>


  {/* ==================== DESKTOP NAVIGATION ==================== */}
  <nav className="hidden lg:flex h-12 items-center justify-center gap-1 font-body border-t border-primary-100/5">

    <BrowseDropdown />

    <a
      href="#"
      className="text-base font-medium text-primary-100 hover:text-secondary px-4 py-2 transition-colors rounded-control hover:bg-primary-600/50"
    >
      Recommandations
    </a>

    <a
      href="#"
      className="text-base font-medium text-primary-100 hover:text-secondary px-4 py-2 transition-colors rounded-control hover:bg-primary-600/50"
    >
      Genres
    </a>

  </nav>


  {/* ==================== MOBILE NAVIGATION ==================== */}
  {isNavMenuOpen && (
    <div className="lg:hidden absolute top-full left-0 right-0 bg-primary-700/95 backdrop-blur-xl border-b border-primary-100/10 shadow-e4">

      <div className="px-4 py-6 font-body">

        <form onSubmit={handleMobileSearch} role="search" className="mb-4 flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Rechercher un jeu..."
            aria-label="Rechercher un jeu"
            className="h-11 flex-1 rounded-control border border-white/15 bg-white/10 px-4 text-sm text-white outline-none transition-colors placeholder:text-primary-200/60 focus:border-white/30"
          />
          <Button type="submit" icon aria-label="Rechercher">
            <Search size={18} strokeWidth={2} />
          </Button>
        </form>

        <nav className="flex flex-col gap-2">

          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsNavMenuOpen(false)}
              className="text-lg font-medium text-primary-100 hover:text-primary-100/80 px-3 py-2 transition-colors rounded-control hover:bg-primary-600"
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