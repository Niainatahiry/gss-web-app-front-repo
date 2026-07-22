import React from 'react'
import StarRating from './StarRating'
import UserAvatar from './UserAvatar'

// ── Testimonial Card Component ──
function TestimonialCard({ data }) {
  const { username, avatar, gamePurchased, rating, testimonial, gameName, genre, platform, launcher } = data

  // Handle genre as array or single string
  const genreList = Array.isArray(genre) ? genre : [genre]
  const maxTags = 3
  const displayedGenres = genreList.slice(0, maxTags)
  const remainingCount = genreList.length - maxTags

  return (
    <div className="bg-primary-100/5 border rounded-xl p-6 w-95 shrink-0 font-body hover:border-primary-400 transition-all duration-300 flex flex-col h-136">

      {/* First Section: Avatar + User Info + Stars */}
      <div className="flex items-center gap-4 mb-6">
        <UserAvatar 
          username={username} 
          avatarUrl={avatar} 
          showUsername={false}
          showMenu={false}
        />

        <div className="flex flex-col">
          <span className="text-primary-100 font-display font-semibold text-sm">
            {username}
          </span>
          <span className="text-primary-300 text-xs  line-clamp-1">
            purchased: {gamePurchased}
          </span>
          <StarRating count={rating} />
        </div>
      </div>

      {/* Separation: Quote Icon */}
      <div className="mb-6">
        <svg 
          className="w-8 h-8 text-tertiary opacity-60" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Second Section: Testimonial Text */}
      <div className="mb-6 grow">
        <p className="text-primary-200 font-display text-2xl leading-relaxed italic line-clamp-5 overflow-hidden">
          {testimonial}
        </p>
      </div>

      {/* Third Section: Game Details */}
      <div className="flex flex-col items-start justify-center gap-2 border-l-2 pl-6 border-primary-600 mt-auto">
        <span className="text-primary-100 font-display font-medium text-sm">
          {gameName}
        </span>

        {/* Genre Tags */}
        <div className="flex flex-wrap gap-1.5">
          {displayedGenres.map((g, index) => (
            <span 
              key={index}
              className="text-xs font-semibold px-2.5 py-1 rounded-md bg-primary-600 text-primary-300 transition-colors cursor-default"
            >
              {g}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="text-xs font-medium px-2 py-1 rounded-md bg-primary-600 text-primary-300 border border-primary-500">
              +{remainingCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-primary-300 text-xs mt-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span>{platform} — {launcher}</span>
        </div>
      </div>

    </div>
  )
}

export default TestimonialCard