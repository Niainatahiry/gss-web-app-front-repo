import { useRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import RegisterForm from '../../components/auth/RegisterForm'
import SocialAuthButtons from '../../components/auth/SocialAuthButtons'
import TextField from '../../components/ui/TextField'
import { authQuotes } from '../../data/authQuotes'
import { cn } from '../../lib/cn'
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  stripControlCharacters,
  validateEmail,
  validateLoginPassword,
} from '../../utils/authValidation'
import logoSrc from '../../assets/logos/gss-logo-with-white-text.png'
import quoteMark from '../../assets/images/auth/quote-mark.png'

const LEGAL_LINKS = [
  'Conditions générales',
  'Avis de confidentialité',
  'Gestion des cookies',
  'Assistance',
]

const LAST_QUOTE_KEY = 'gss:last-auth-quote'
const DEFAULT_IMAGE_CLASSNAME = 'w-[28.5vw] max-w-[493px] -translate-x-[66%]'

/**
 * Tire une citation au hasard, sans répéter la précédente (mémorisée par
 * session). Fonction exécutée au chargement du module pour que le double rendu
 * de StrictMode ne fasse pas avancer le tirage deux fois.
 */
function pickAuthQuote() {
  if (authQuotes.length <= 1) return authQuotes[0]

  let previousId = null
  try {
    previousId = window.sessionStorage.getItem(LAST_QUOTE_KEY)
  } catch {
    // Stockage indisponible (navigation privée) : tirage simple.
  }

  const pool = authQuotes.filter((quote) => quote.id !== previousId)
  const picked = pool[Math.floor(Math.random() * pool.length)] ?? authQuotes[0]

  try {
    window.sessionStorage.setItem(LAST_QUOTE_KEY, picked.id)
  } catch {
    // Quota / sécurité : on ignore, la citation reste valide.
  }

  return picked
}

const activeQuote = pickAuthQuote()

/**
 * Page de connexion.
 * Route `/auth` : pas de header ni de footer du site, mais le logo reprend
 * exactement la position/taille qu'il a dans le header, avec son propre pied
 * de page légal.
 */
function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const isRegister = searchParams.get('mode') === 'register'

  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ email: '', password: '' })
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const switchMode = (mode) => {
    const next = new URLSearchParams(searchParams)

    if (mode === 'register') {
      next.set('mode', 'register')
      // Don't carry a login password over to the register form.
      setPassword('')
      setShowPassword(false)
      setErrors({ email: '', password: '' })
    } else {
      next.delete('mode')
    }

    setSearchParams(next, { replace: true })
  }

  const handleEmailChange = (event) => {
    const next = stripControlCharacters(event.target.value)
    setEmail(next)
    if (errors.email) {
      setErrors((current) => ({ ...current, email: validateEmail(next) }))
    }
  }

  const handlePasswordChange = (event) => {
    const next = stripControlCharacters(event.target.value)
    setPassword(next)
    if (errors.password) {
      setErrors((current) => ({ ...current, password: validateLoginPassword(next) }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedEmail = email.trim()
    setEmail(trimmedEmail)

    const nextErrors = {
      email: validateEmail(trimmedEmail),
      password: validateLoginPassword(password),
    }
    setErrors(nextErrors)

    if (nextErrors.email) {
      emailRef.current?.focus()
      return
    }
    if (nextErrors.password) {
      passwordRef.current?.focus()
      return
    }

    // Validation passée — brancher ici l'appel à l'API d'authentification.
  }

  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-hidden bg-tertiary-550 font-body text-white">
      {/* Logo seul — centré sous md, aligné comme dans le header à partir de md */}
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8">
        <div className="flex h-24 items-center justify-center md:justify-start">
          <Link to="/" className="logo-container shrink-0" aria-label="GSS — Retour à l'accueil">
            <img
              src={logoSrc}
              alt="GSS Logo"
              className="h-12 w-auto"
            />
          </Link>
        </div>
      </div>

      {/* Personnage de la citation active — aligné sur la colonne de contenu */}
      {activeQuote.image && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 hidden select-none xl:block"
        >
          <div className="pl-[14.5vw] pr-[11.4vw]">
            <div className="relative mx-auto h-0 max-w-[1280px]">
              <img
                src={activeQuote.image}
                alt=""
                className={cn(
                  'auth-character-fade absolute bottom-0 left-0',
                  activeQuote.imageClassName ?? DEFAULT_IMAGE_CLASSNAME
                )}
              />
            </div>
          </div>
        </div>
      )}

      {/* Contenu principal */}
      <main className="relative z-10 flex flex-1 items-center px-6 pb-12 pt-10 sm:px-10 xl:pl-[14.5vw] xl:pr-[11.4vw] xl:pb-[4.75rem] xl:pt-0">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-14 xl:flex-row xl:items-center xl:justify-between xl:gap-10">
          {/* Carte d'authentification — première sur mobile */}
          <section className="order-1 w-full max-w-[400px] xl:order-2 xl:shrink-0">
            <div className="xl:rounded-card xl:bg-tertiary-400 xl:px-8 xl:py-7 xl:shadow-e4">
              <h1 className="font-display text-4xl font-bold leading-tight text-white">
                {isRegister ? 'Créer un compte' : 'Se connecter'}
              </h1>
              <p className="mt-1 text-sm text-white/85">
                {isRegister ? 'Rejoignez la communauté GSS' : 'Connectez-vous à votre compte'}
              </p>

              {isRegister ? (
                <RegisterForm onSwitchToLogin={() => switchMode('login')} />
              ) : (
                <>
                  <form onSubmit={handleSubmit} noValidate className="mt-9">
                {/* Adresse mail */}
                <TextField
                  id="auth-email"
                  inputRef={emailRef}
                  label="Adresse mail"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  enterKeyHint="next"
                  maxLength={EMAIL_MAX_LENGTH}
                  required
                  value={email}
                  onChange={handleEmailChange}
                  error={errors.email}
                  placeholder="adresse mail"
                />

                {/* Mot de passe */}
                <TextField
                  id="auth-password"
                  inputRef={passwordRef}
                  label="Mot de passe"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  enterKeyHint="go"
                  minLength={PASSWORD_MIN_LENGTH}
                  maxLength={PASSWORD_MAX_LENGTH}
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  error={errors.password}
                  placeholder="mot de passe"
                  className="mt-5"
                  trailing={
                    <button
                      type="button"
                      onClick={() => setShowPassword((visible) => !visible)}
                      onMouseDown={(event) => event.preventDefault()}
                      aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                      aria-pressed={showPassword}
                      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-r-md text-tertiary-550/60 transition-colors hover:text-tertiary-550 focus-visible:bg-tertiary-550/10 focus-visible:text-tertiary-550 focus-visible:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  }
                />

                {/* Se souvenir / mot de passe oublié */}
                <div className="mt-5 flex items-center justify-between gap-4">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-white">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(event) => setRememberMe(event.target.checked)}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className="flex h-4 w-4 items-center justify-center rounded-[3px] border border-white/50 bg-white text-tertiary-550 transition peer-checked:border-secondary-100 peer-checked:bg-secondary-100 peer-focus-visible:ring-2 peer-focus-visible:ring-white/60"
                    >
                      {rememberMe && (
                        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" aria-hidden="true">
                          <path
                            d="M2.5 6.2 4.8 8.5 9.5 3.8"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    Se souvenir de moi
                  </label>

                  <a
                    href="#"
                    className="link-underline text-sm text-white hover:text-secondary focus-visible:text-secondary"
                  >
                    Mot de passe oublié ?
                  </a>
                </div>

                <button
                  type="submit"
                  className="mt-7 h-12 w-full cursor-pointer rounded-md bg-secondary-100 text-[15px] font-bold text-tertiary-550 transition-colors duration-200 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-tertiary-400 active:scale-[0.99]"
                >
                  Se connecter
                </button>

                <SocialAuthButtons />
              </form>

              <p className="mt-6 text-center text-sm text-white">
                Nouvel utilisateur ?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('register')}
                  className="link-underline cursor-pointer border-0 bg-transparent p-0 font-bold hover:text-secondary focus-visible:text-secondary"
                >
                  Créer un compte
                </button>
              </p>
                </>
              )}
            </div>
          </section>

          {/* Citation — masquée sous md, à gauche sur desktop */}
          <section className="order-2 hidden w-full max-w-[46rem] md:block xl:order-1 xl:-translate-y-12">
            <img
              src={quoteMark}
              alt=""
              aria-hidden="true"
              className="mb-1 -ml-2 h-10 w-auto select-none sm:h-12 xl:-ml-28 xl:h-16"
            />

            <blockquote>
              <h2 className="font-heading text-[clamp(2.5rem,5.4vw,3.5rem)] uppercase leading-[0.97] text-white/85 xl:text-[4.7vw] 2xl:text-[clamp(2.5rem,5.4vw,5.8rem)]">
                {activeQuote.lines.map((line, index) => (
                  <span
                    key={`${activeQuote.id}-${index}`}
                    className={cn('block', line.accent && 'text-secondary-100')}
                  >
                    {line.text}
                  </span>
                ))}
              </h2>

              {(activeQuote.author || activeQuote.source) && (
                <footer className="mt-5 pl-10 sm:pl-16 xl:mt-12 xl:pl-40 2xl:pl-60">
                  <cite className="flex items-center gap-4 font-body text-base not-italic text-white/90 sm:text-lg">
                    <span aria-hidden="true" className="text-white/60">——</span>
                    {[activeQuote.author, activeQuote.source].filter(Boolean).join(' - ')}
                  </cite>
                </footer>
              )}
            </blockquote>

            <div className="mt-6 flex justify-end xl:mt-8">
              <img
                src={quoteMark}
                alt=""
                aria-hidden="true"
                className="h-10 w-auto -scale-x-100 select-none sm:h-12 xl:h-14"
              />
            </div>
          </section>
        </div>
      </main>

      {/* Liens légaux */}
      <footer className="relative z-20 px-6 pb-6 sm:px-10 xl:pb-8">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-center text-sm leading-5">
          {LEGAL_LINKS.map((label) => (
            <a
              key={label}
              href="#"
              className="text-white/90 transition-colors hover:text-secondary"
            >
              {label}
            </a>
          ))}
          <span className="text-white/70">Copyright © 2026 GSS. Tous droits réservés.</span>
        </div>
      </footer>
    </div>
  )
}

export default AuthPage
