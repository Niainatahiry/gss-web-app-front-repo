import StarRating from './StarRating'
import UserAvatar from './UserAvatar'
import Card from './Card'

// ── Testimonial Card Component ──
function TestimonialCard({ data }) {
  const { username, avatar, rating, testimonial, gameName } = data

  return (
    <Card
      as="article"
      className="flex h-full flex-col gap-4 p-5 sm:p-6 font-body bg-primary-600/40"
    >

      <StarRating count={rating} size="sm" />

      <p className="grow text-sm sm:text-base leading-relaxed text-primary-100 line-clamp-6">
        “{testimonial}”
      </p>

      <div className="flex items-center gap-3 border-t border-white/10 pt-4">
        <UserAvatar
          username={username}
          avatarUrl={avatar}
          showUsername={false}
        />

        <div className="flex min-w-0 flex-col">
          <span className="truncate font-display text-sm font-semibold text-primary-100">
            {username}
          </span>
          <span className="truncate text-xs text-primary-300">
            {gameName}
          </span>
        </div>
      </div>

    </Card>
  )
}

export default TestimonialCard
