import { useRef, useState } from 'react'
import { Check, Eye, EyeOff } from 'lucide-react'
import TextField from '../ui/TextField'
import SocialAuthButtons from './SocialAuthButtons'
import { cn } from '../../lib/cn'
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERNAME_MAX_LENGTH,
  hasPasswordDigitOrSymbol,
  hasPasswordMinLength,
  stripControlCharacters,
  validateEmail,
  validateRegisterPassword,
  validateUsername,
} from '../../utils/authValidation'

function VisibilityToggle({ visible, onToggle, label }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      onMouseDown={(event) => event.preventDefault()}
      aria-label={visible ? `Masquer ${label}` : `Afficher ${label}`}
      aria-pressed={visible}
      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-r-md text-tertiary-550/60 transition-colors hover:text-tertiary-550 focus-visible:bg-tertiary-550/10 focus-visible:text-tertiary-550 focus-visible:outline-none"
    >
      {visible ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  )
}

/**
 * Account creation form rendered inside the auth card.
 * Register mode keeps a two-column grid from `sm` so the card stays compact.
 */
function RegisterForm({ onSwitchToLogin }) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  })

  const usernameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const handleUsernameChange = (event) => {
    const next = stripControlCharacters(event.target.value)
    setUsername(next)
    if (errors.username) {
      setErrors((current) => ({ ...current, username: validateUsername(next) }))
    }
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
      setErrors((current) => ({ ...current, password: validateRegisterPassword(next) }))
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const trimmedUsername = username.trim()
    const trimmedEmail = email.trim()
    setUsername(trimmedUsername)
    setEmail(trimmedEmail)

    const nextErrors = {
      username: validateUsername(trimmedUsername),
      email: validateEmail(trimmedEmail),
      password: validateRegisterPassword(password),
    }
    setErrors(nextErrors)

    const fields = [
      ['username', usernameRef],
      ['email', emailRef],
      ['password', passwordRef],
    ]
    const firstInvalid = fields.find(([key]) => nextErrors[key])
    if (firstInvalid) {
      firstInvalid[1].current?.focus()
      return
    }

    // Validation passée — brancher ici l'appel à l'API d'inscription
    // (avec le referralCode du lien d'affiliation, plus tard).
  }

  const passwordChecks = [
    { label: '8 caractères minimum', met: hasPasswordMinLength(password) },
    { label: 'Au moins un chiffre ou un symbole', met: hasPasswordDigitOrSymbol(password) },
  ]

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="mt-9">
        <div className="space-y-4">
          <TextField
            id="register-username"
            inputRef={usernameRef}
            label="Nom d'utilisateur"
            name="username"
            type="text"
            autoComplete="username"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            enterKeyHint="next"
            maxLength={USERNAME_MAX_LENGTH}
            required
            value={username}
            onChange={handleUsernameChange}
            error={errors.username}
            placeholder="nom d'utilisateur"
          />

          <TextField
            id="register-email"
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

          <TextField
            id="register-password"
            inputRef={passwordRef}
            label="Mot de passe"
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
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
            trailing={
              <VisibilityToggle
                visible={showPassword}
                onToggle={() => setShowPassword((visible) => !visible)}
                label="le mot de passe"
              />
            }
          />
        </div>

        <ul className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          {passwordChecks.map(({ label, met }) => (
            <li
              key={label}
              className={cn(
                'flex items-center gap-1.5 transition-colors duration-200',
                met ? 'text-secondary-100' : 'text-white/50'
              )}
            >
              <Check
                size={13}
                strokeWidth={2.5}
                className={cn('shrink-0', met ? 'opacity-100' : 'opacity-40')}
                aria-hidden="true"
              />
              {label}
            </li>
          ))}
        </ul>

        <button
          type="submit"
          className="mt-6 h-12 w-full cursor-pointer rounded-md bg-secondary-100 text-[15px] font-bold text-tertiary-550 transition-colors duration-200 hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-tertiary-400 active:scale-[0.99]"
        >
          Créer un compte
        </button>

        <SocialAuthButtons />
      </form>

      <p className="mt-6 text-center text-sm text-white">
        Déjà un compte ?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="link-underline cursor-pointer border-0 bg-transparent p-0 font-bold hover:text-secondary focus-visible:text-secondary"
        >
          Se connecter
        </button>
      </p>
    </>
  )
}

export default RegisterForm
