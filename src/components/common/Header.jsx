import { useEffect, useRef, useState } from 'react'
import logoSrc from '../../assets/logos/gss-logo-with-white-text.png'
import logoMobile from '../../assets/logos/gss-logo-transparent-for-dark-background.png'
import ShoppingCart from '../ui/ShoppingCart'
import UserAvatar from '../ui/UserAvatar'
import { Search, Menu, X, User } from 'lucide-react'
import BrowseDropdown from '../ui/BrowseDropdown'
import Button from '../ui/Button'
import IconButton from '../ui/IconButton'
import SearchInput from '../ui/SearchInput'
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
<form
  onSubmit={handleSearch}
  role="search"
  className="group hidden lg:flex flex-1 justify-center px-12"
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

    {/* Search button — bg-secondary on the right.
        shadow-none: the component elevation smudges over the cream input.
        The background gradient is the short cream → yellow blend at the seam,
        scoped to this button and following the input's focus colour.
        No focus ring on this button: it renders a near-black inset border on
        the yellow surface. The plain ring-0 also cancels the component's
        default ring + black offset band. */}
    <Button
      type="submit"
      shape="none"
      aria-label="Rechercher"
      className="
        h-14 px-6 shrink-0 rounded-r-full
        shadow-none hover:shadow-none
        bg-[linear-gradient(to_right,#f5f5f0,transparent_16px)]
        group-has-[input:focus]:bg-[linear-gradient(to_right,#fff,transparent_16px)]
        focus-visible:ring-0 focus-visible:ring-offset-0
        active:scale-100
      "
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


  {/* ==================== MOBILE SEARCH ==================== */}
  {isSearchOpen && (
    <div
      id="mobile-search"
      className="lg:hidden border-t border-white/5 px-4 py-3"
      onKeyDown={(event) => {
        if (event.key === 'Escape') closeMobileSearch()
      }}
    >
      <SearchInput
        autoFocus
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