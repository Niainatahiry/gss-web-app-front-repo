import React from 'react'

function UserAvatar({ 
  username = null, 
  avatarUrl = null, 
  showUsername = true,
  showMenu = false 
}) {
  // Get initials from username
  const getInitials = (name) => {
    if (!name) return '?'
    const parts = name.trim().split(' ')
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
  }

  const initials = getInitials(username)

  // Not connected → show login button
  if (!username) {
    return (
      <button className="bg-secondary hover:bg-secondary-300 text-secondary-700 font-body text-sm font-medium rounded-lg px-4 py-2 transition-colors cursor-pointer">
        Se connecter
      </button>
    )
  }

  // Connected → show username + avatar
  return (
    <div className="flex items-center gap-3">
      {showUsername && (
        <span className="font-body text-sm font-medium text-primary-100 hidden sm:block">
          {username}
        </span>
      )}

      <div className="relative">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={username}
            className="w-10 h-10 rounded-full object-cover border-2 border-primary-400"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center border-2 border-primary-400">
            <span className="font-display text-sm font-bold text-primary-100">
              {initials}
            </span>
          </div>
        )}

        {/* Dropdown Menu */}
        {showMenu && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-primary-700 border border-primary-600 rounded-xl shadow-xl shadow-black/20 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <a href="/profile" className="block px-4 py-2 text-sm text-primary-100 hover:bg-primary-600 transition-colors">
              Mon Profil
            </a>
            <a href="/orders" className="block px-4 py-2 text-sm text-primary-100 hover:bg-primary-600 transition-colors">
              Mes Commandes
            </a>
            <div className="border-t border-primary-600 my-1" />
            <button className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-primary-600 transition-colors">
              Déconnexion
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserAvatar