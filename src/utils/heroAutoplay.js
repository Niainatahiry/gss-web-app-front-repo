// Cross-component signal used to stop the hero carousel while the user is
// interacting with the fixed header, so the nav never animates underneath the
// cursor (hover styles stay responsive).
const PAUSE_EVENT = 'gss:hero-autoplay-pause'
const RESUME_EVENT = 'gss:hero-autoplay-resume'

export const pauseHeroAutoplay = () => window.dispatchEvent(new Event(PAUSE_EVENT))
export const resumeHeroAutoplay = () => window.dispatchEvent(new Event(RESUME_EVENT))

export const onHeroAutoplayPause = (handler) => {
  window.addEventListener(PAUSE_EVENT, handler)
  return () => window.removeEventListener(PAUSE_EVENT, handler)
}

export const onHeroAutoplayResume = (handler) => {
  window.addEventListener(RESUME_EVENT, handler)
  return () => window.removeEventListener(RESUME_EVENT, handler)
}
