import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

const EXTERNAL_URL = /^https?:\/\//i

/**
 * Full-bleed promotional artwork used as a link.
 *
 * The artwork carries no visible text, so `alt` is the link's only accessible
 * name — it is required. Internal targets go through React Router, absolute
 * URLs open in a new tab.
 */
function PromoThumbnail({ imageUrl, alt, href, className }) {
  const shell = cn(
    'group relative block aspect-square w-full overflow-hidden rounded-card bg-primary-600',
    'ring-1 ring-white/10 shadow-e3 transition-shadow duration-300 ease-material',
    'hover:ring-white/25 hover:shadow-e4',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-tertiary-550',
    className
  )

  const artwork = (
    <img
      src={imageUrl}
      alt={alt}
      width={600}
      height={600}
      loading="lazy"
      decoding="async"
      className="block h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
    />
  )

  if (EXTERNAL_URL.test(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={shell}>
        {artwork}
      </a>
    )
  }

  return (
    <Link to={href} className={shell}>
      {artwork}
    </Link>
  )
}

export default PromoThumbnail
