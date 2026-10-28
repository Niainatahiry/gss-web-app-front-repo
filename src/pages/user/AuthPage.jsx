import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import Header from '../../components/common/Header'
import TextField from '../../components/ui/TextField'
import { authQuotes } from '../../data/authQuotes'
import { cn } from '../../lib/cn'
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

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  )
}

function SteamIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-white" aria-hidden="true">
      <path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.188.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.031 4.524 4.527s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0zM7.54 18.21l-1.473-.61c.262.543.714.999 1.314 1.25 1.297.539 2.793-.076 3.332-1.375.263-.63.264-1.319.005-1.949s-.75-1.121-1.377-1.383c-.624-.26-1.29-.249-1.878-.03l1.523.63c.956.4 1.409 1.5 1.009 2.455-.397.957-1.497 1.41-2.454 1.012H7.54zm11.415-9.303c0-1.662-1.353-3.015-3.015-3.015-1.665 0-3.015 1.353-3.015 3.015 0 1.665 1.35 3.015 3.015 3.015 1.663 0 3.015-1.35 3.015-3.015zm-5.273-.005c0-1.252 1.013-2.266 2.265-2.266 1.249 0 2.266 1.014 2.266 2.266 0 1.251-1.017 2.265-2.266 2.265-1.253 0-2.265-1.014-2.265-2.265z" />
    </svg>
  )
}

/**
 * Page de connexion.
 * Route `/auth`, déclarée hors du UserLayout pour garder son propre pied de
 * page légal, tout en réutilisant le header du site.
 */
function AuthPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-hidden bg-tertiary-550 font-body text-white">
      <Header />

      {/* Décale le contenu sous le header fixe (96px mobile, 144px dès lg) */}
      <div className="h-24 shrink-0 lg:h-36" aria-hidden="true" />

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
          {/* Carte de connexion — première sur mobile */}
          <section className="order-1 w-full max-w-[400px] xl:order-2 xl:shrink-0">
            <div className="xl:rounded-card xl:bg-tertiary-400 xl:px-8 xl:py-7 xl:shadow-e4">
              <h1 className="font-display text-4xl font-bold leading-tight text-white">
                Se connecter
              </h1>
              <p className="mt-1 text-sm text-white/85">
                Connectez-vous à votre compte
              </p>

              <form onSubmit={handleSubmit} className="mt-9">
                {/* Adresse mail */}
                <TextField
                  id="auth-email"
                  label="Adresse mail"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="adresse mail"
                />

                {/* Mot de passe */}
                <TextField
                  id="auth-password"
                  label="Mot de passe"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
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
                    Remember me
                  </label>

                  <a
                    href="#"
                    className="text-sm text-white underline-offset-4 transition-colors hover:text-secondary hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="mt-7 h-12 w-full cursor-pointer rounded-md bg-secondary-100 text-[15px] font-bold text-tertiary-550 transition-colors duration-200 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-tertiary-400 active:scale-[0.99]"
                >
                  Se connecter
                </button>

                {/* Séparateur */}
                <div className="my-4 flex items-center gap-3 text-[11px] font-semibold tracking-[0.12em] text-white/80">
                  <span className="h-px flex-1 bg-white/30" aria-hidden="true" />
                  OU
                  <span className="h-px flex-1 bg-white/30" aria-hidden="true" />
                </div>

                {/* Connexions externes */}
                <button
                  type="button"
                  className="flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-md bg-white text-[15px] font-semibold text-tertiary-550 transition-colors duration-200 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-tertiary-400"
                >
                  <GoogleIcon />
                  Continuer avec Google
                </button>

                <button
                  type="button"
                  className="mt-4 flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-md bg-[#0E1D36] text-[15px] font-semibold text-white transition-colors duration-200 hover:bg-[#16294a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-tertiary-400"
                >
                  <SteamIcon />
                  Continuer avec Steam
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-white">
                Nouvel utilisateur ?{' '}
                <a
                  href="#"
                  className="font-bold underline-offset-4 transition-colors hover:text-secondary hover:underline"
                >
                  Créer un compte
                </a>
              </p>
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
