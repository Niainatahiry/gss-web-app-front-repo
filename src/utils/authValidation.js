/**
 * Shared validation rules for the auth forms (login + register).
 * The backend remains the single source of truth; these checks are for UX.
 */

export const EMAIL_MAX_LENGTH = 254
export const PASSWORD_MIN_LENGTH = 8
export const PASSWORD_MAX_LENGTH = 128
export const USERNAME_MIN_LENGTH = 3
export const USERNAME_MAX_LENGTH = 20

/* Pragmatic address check: common local-part characters, no leading/trailing or
   consecutive dots, valid domain labels, and at least one dot in the domain. */
const EMAIL_PATTERN =
  /^[A-Za-z0-9!#$%&'*+/=?^_{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_{|}~-]+)*@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)+$/

const USERNAME_PATTERN = /^[A-Za-z0-9_-]+$/

export function validateEmail(value) {
  if (!value) return "L'adresse mail est requise."
  if (value.length > EMAIL_MAX_LENGTH) return 'Adresse mail trop longue (254 caractères maximum).'
  if (!EMAIL_PATTERN.test(value)) return 'Saisissez une adresse mail valide.'
  return ''
}

export function validateLoginPassword(value) {
  if (!value) return 'Le mot de passe est requis.'
  if (value.length < PASSWORD_MIN_LENGTH) return 'Le mot de passe doit contenir au moins 8 caractères.'
  if (value.length > PASSWORD_MAX_LENGTH) return 'Le mot de passe ne peut pas dépasser 128 caractères.'
  return ''
}

export function hasPasswordMinLength(value) {
  return value.length >= PASSWORD_MIN_LENGTH
}

export function hasPasswordDigitOrSymbol(value) {
  // Any non-alphanumeric character except whitespace counts as a symbol.
  return /[0-9]/.test(value) || /[^A-Za-z0-9\s]/.test(value)
}

export function validateRegisterPassword(value) {
  if (!value) return 'Le mot de passe est requis.'
  if (value.length < PASSWORD_MIN_LENGTH) return 'Le mot de passe doit contenir au moins 8 caractères.'
  if (value.length > PASSWORD_MAX_LENGTH) return 'Le mot de passe ne peut pas dépasser 128 caractères.'
  if (!hasPasswordDigitOrSymbol(value)) return 'Ajoutez au moins un chiffre ou un symbole.'
  return ''
}

export function validateUsername(value) {
  if (!value) return "Le nom d'utilisateur est requis."
  if (value.length < USERNAME_MIN_LENGTH || value.length > USERNAME_MAX_LENGTH) {
    return "Le nom d'utilisateur doit contenir entre 3 et 20 caractères."
  }
  if (!USERNAME_PATTERN.test(value)) return 'Utilisez uniquement des lettres, chiffres, _ ou -.'
  return ''
}

/** Retire les caractères de contrôle qu'on peut coller dans un champ. */
export function stripControlCharacters(value) {
  return Array.from(value)
    .filter((character) => {
      const code = character.codePointAt(0)
      return code >= 32 && code !== 127
    })
    .join('')
}
