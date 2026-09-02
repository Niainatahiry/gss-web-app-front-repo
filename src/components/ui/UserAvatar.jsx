import React from 'react'
import { User } from 'lucide-react'

function UserAvatar({ 
  username = null, 
  avatarUrl = null
}) {
  const getInitials = (name) => {
    if (!name) return '?'
    const parts = name.trim().split(' ')
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
  }

  const initials = getInitials(username)

  // Split firstname / lastname
  const [firstName = '', lastName = ''] = username ? username.trim().split(' ') : []

  // Déconnecté → icône User minimaliste dans un cercle
  if (!username) {
    return (
      <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center">
        <User size={18} strokeWidth={2} className="text-primary-100" />
      </div>
    )
  }

  // Connecté → prénom/nom à gauche (desktop uniquement) + avatar
  return (
    <div className="flex items-center gap-2.5">
      {/* Texte — caché sur mobile */}
      <div className="hidden sm:flex flex-col items-end leading-none">
        <span className="font-display text-xs font-semibold text-primary-100">
          {firstName}
        </span>
        <span className="font-display text-[10px] font-medium text-primary-300 mt-0.5">
          {lastName}
        </span>
      </div>

      {/* Avatar */}
      <div className="relative">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={username}
            className="w-9 h-9 rounded-full object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-primary-500 flex items-center justify-center">
            <span className="font-display text-xs font-bold text-primary-100">
              {initials}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserAvatar