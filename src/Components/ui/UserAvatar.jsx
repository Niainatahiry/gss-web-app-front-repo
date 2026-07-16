import React from 'react'

function UserAvatar({ username = null, avatarUrl = null }) {
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
      <span className="font-body text-sm font-medium text-primary-100 hidden sm:block">
        {username}
      </span>

      <div className="relative">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={username}
            className="w-10 h-10 rounded-full object-cover border-2 border-primary-400"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center border-2 border-primary-400">
            <span className="font-display text-sm font-bold text-primary-100">
              {initials}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserAvatar