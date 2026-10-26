import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import StarRating from './StarRating'
import UserAvatar from './UserAvatar'

// ── Testimonial Card Component ──
// Speech-bubble card: the bubble carries the review, the tail points down to
// the author, which sits *outside* the surface. The avatar row is deliberately
// detached so the card reads as someone actually speaking.
function TestimonialCard({ data, index = 0 }) {
  const { username, avatar, rating, testimonial, gameName } = data

  return (
    <article
      className="group flex h-full w-[280px] shrink-0 snap-start flex-col sm:w-[320px] 2xl:w-[340px]"
      aria-label={`Avis de ${username}`}
    >

      {/* Bubble */}
      <div className="relative flex flex-1 flex-col rounded-card bg-tertiary-400 p-6 shadow-e2 ring-1 ring-white/10 transition-all duration-300 ease-material group-hover:-translate-y-1 group-hover:shadow-e3 group-hover:ring-white/20 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">

        {/* Decorative wash — clipped so it never leaks past the rounded corners */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-card"
        >
          <div className="absolute -right-12 -top-16 h-36 w-36 rounded-full bg-secondary/10 blur-2xl" />
        </div>

        <div className="relative flex flex-1 flex-col gap-4">

          <div className="flex items-start justify-between">
            <FontAwesomeIcon
              icon={faQuoteLeft}
              aria-hidden="true"
              className="text-xl text-white/30"
            />

            <span className="font-mono text-[10px] tracking-[0.2em] text-white/35">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          <p className="line-clamp-6 flex-1 text-lg leading-relaxed text-white/85 sm:text-[15px] md:text-xl">
            {testimonial}
          </p>

          <StarRating count={rating} size="sm" />

        </div>

        {/* Tail — same fill as the bubble, aimed at the avatar below */}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 14"
          className="absolute -bottom-2.75 left-8 h-3 w-6 fill-tertiary-400"
        >
          <path d="M0 0H23L8 12.2C5.6 13.7 2.6 12.4 1.4 9.8L0 6.5V0Z" />
        </svg>

      </div>

      {/* Author — outside the bubble, aligned under the tail */}
      <div className="mt-6 flex items-center gap-3 pl-1">
        <UserAvatar
          username={username}
          avatarUrl={avatar}
          showUsername={false}
        />

        <div className="flex min-w-0 flex-col">
          <span className="truncate font-display text-sm font-semibold text-white/90">
            {username}
          </span>
          <span className="truncate text-xs text-white/55">
            {gameName}
          </span>
        </div>
      </div>

    </article>
  )
}

export default TestimonialCard
