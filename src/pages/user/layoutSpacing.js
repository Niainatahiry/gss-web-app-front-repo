/**
 * Spacing presets for the shared user layout.
 *
 * `top`    clears the fixed header (96px on mobile, 144px from `lg`, where the
 *          desktop nav bar appears).
 * `bottom` leaves room between the page content and the footer.
 *
 * Values are regular Tailwind classes, so every preset is responsive.
 */
const HEADER_OFFSET = 'pb-32 sm:pb-32 lg:pb-48';

export const SPACING = {
  /** Content sits under the transparent header (home hero). */
  none: { top: '', bottom: '' },

  /** Clears the fixed header only. Used when a route has no spacing handle. */
  header: { top: HEADER_OFFSET, bottom: '' },

  /** Clears the header and leaves room above the footer, scaled by screen. */
  headerWithFooterGap: {
    top: HEADER_OFFSET,
    bottom: 'pb-16 sm:pb-32 lg:pb-68',
  },
};
