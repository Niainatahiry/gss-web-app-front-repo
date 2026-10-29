/**
 * Shared surface recipes — one material, several controls.
 *
 * `surface` is the secondary-action material: a teal card face (tertiary-400)
 * with the discreet circular yellow wash of TestimonialCard bleeding in from
 * the top-right corner, a hairline ring and soft elevation. Buttons, selects
 * and cards therefore read as one family, while the yellow primary CTA keeps
 * its own slab treatment.
 *
 * It lives here rather than in Button.jsx because Select needs the exact same
 * string — duplicating a recipe is how two controls drift apart after the
 * first tweak.
 *
 * Colour is the only thing that moves on hover (tertiary-400 → tertiary-300);
 * the wash is a background-image and simply rides on top. No dark variant:
 * `sm` and `md` differ by height and padding, never by material.
 */
export const surface = [
  'surface-wash bg-tertiary-400 text-white',
  'ring-1 ring-white/10 shadow-e1',
  'transition-all duration-200 ease-material',
  'hover:bg-tertiary-300 hover:ring-white/20 hover:shadow-e2',
  'focus-visible:bg-tertiary-300 focus-visible:ring-white/80 focus-visible:shadow-e2',
].join(' ')

export default surface
