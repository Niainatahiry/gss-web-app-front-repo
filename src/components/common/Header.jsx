import { useEffect, useRef, useState } from 'react'
import logoSrc from '../../assets/logos/gss-logo-with-white-text.png'
import logoMobile from '../../assets/logos/gss-logo-transparent-for-dark-background.png'
import ShoppingCart from '../ui/ShoppingCart'
import UserAvatar from '../ui/UserAvatar'
import { Search, Menu, X, User } from 'lucide-react'
import BrowseDropdown from '../ui/BrowseDropdown'
import Button from '../ui/Button'
import IconButton from '../ui/IconButton'
import SearchBar from '../ui/SearchBar'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { pauseHeroAutoplay, resumeHeroAutoplay } from '../../utils/heroAutoplay'
import { cn } from '../../lib/cn'

function Header() {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isBrowseOpen, setIsBrowseOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchToggleRef = useRef(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isHomePage = pathname === '/'

  const [isAtTop, setIsAtTop] = useState(() => window.scrollY <= 8)

  /* On the home page the header floats fully transparent over the hero until
     the page is scrolled. Other routes always keep the solid bar. */
  useEffect(() => {
    const updateIsAtTop = () => setIsAtTop(window.scrollY <= 8)

    updateIsAtTop()
    window.addEventListener('scroll', updateIsAtTop, { passive: true })
    return () => window.removeEventListener('scroll', updateIsAtTop)
  }, [pathname])

  const hasOpenPanel = isBrowseOpen || isNavMenuOpen || isSearchOpen
  const isTransparent = isHomePage && isAtTop && !hasOpenPanel

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
    setIsSearchOpen(false)
    setIsNavMenuOpen(false)
  }

  const toggleMobileSearch = () => {
    setIsSearchOpen((open) => !open)
    setIsNavMenuOpen(false)
  }

  const closeMobileSearch = () => {
    setIsSearchOpen(false)
    searchToggleRef.current?.focus()
  }

  const navLinks = [
    { label: 'Accueil', href: '#' },
    { label: 'Recommandations', href: '#' },
    { label: 'Genres', href: '#' },
  ]

  return (
    <header
      className={cn(
        'fixed w-full top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter] duration-200',
        hasOpenPanel && 'transition-none',
        isTransparent ? 'bg-transparent' : 'bg-primary-700/60 backdrop-blur-xl'
      )}
      onPointerEnter={pauseHeroAutoplay}
      onPointerLeave={resumeHeroAutoplay}
    >

  {/* ==================== TOP ROW ==================== */}
  <div className="w-full px-4 sm:px-6 lg:px-8 h-24 flex items-center justify-between">

    {/* Logo */}
    <div className="flex items-center gap-4 shrink-0">

      {/* Mobile hamburger */}
      <IconButton
        onClick={() => {
          setIsNavMenuOpen(!isNavMenuOpen)
          setIsSearchOpen(false)
        }}
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
<div className="hidden lg:flex flex-1 justify-center px-12">
  <SearchBar
    size="lg"
    tone="light"
    value={searchQuery}
    onChange={(event) => setSearchQuery(event.target.value)}
    onSubmit={handleSearch}
    className="w-full max-w-xl"
  />
</div>


    {/* Right side */}
    <div className="flex items-center gap-4 font-body shrink-0">

      {/* Mobile search toggle */}
      <IconButton
        ref={searchToggleRef}
        onClick={toggleMobileSearch}
        className="lg:hidden w-9 h-9"
        aria-label={isSearchOpen ? 'Fermer la recherche' : 'Rechercher'}
        aria-expanded={isSearchOpen}
        aria-controls="mobile-search"
      >
        {isSearchOpen
          ? <X size={18} strokeWidth={2} />
          : <Search size={18} strokeWidth={2} />
        }
      </IconButton>

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
            onClick={() => {
              setIsNavMenuOpen(false)
              navigate('/auth')
            }}
            className="w-9 h-9"
            aria-label="Se connecter"
          >
            <User size={18} strokeWidth={2} />
          </IconButton>
        )}
      </div>

    </div>

  </div>


  {/* ==================== MOBILE SEARCH ==================== */}
  {isSearchOpen && (
    <div
      id="mobile-search"
      className="lg:hidden border-t border-white/5 px-4 py-3"
      onKeyDown={(event) => {
        if (event.key === 'Escape') closeMobileSearch()
      }}
    >
      <SearchBar
        autoFocus
        size="md"
        tone="surface"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        onSubmit={handleSearch}
      />
    </div>
  )}


  {/* ==================== DESKTOP NAVIGATION ==================== */}
  <nav className={cn(
    'hidden lg:flex h-12 items-center justify-center gap-1 font-body border-t transition-colors duration-200',
    hasOpenPanel && 'transition-none',
    isTransparent ? 'border-transparent' : 'border-primary-100/5'
  )}>

    <BrowseDropdown isOpen={isBrowseOpen} onOpenChange={setIsBrowseOpen} />

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