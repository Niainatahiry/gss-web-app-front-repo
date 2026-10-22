// Format a price with a dot as thousands separator, no decimal places.
// e.g. 195000 -> "195.000"
export function formatAriary(amount) {
  return Number(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export default formatAriary
