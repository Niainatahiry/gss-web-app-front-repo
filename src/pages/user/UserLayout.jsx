import { Outlet, useMatches } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { SPACING } from './layoutSpacing';

/**
 * Shared user shell.
 *
 * Spacing is declared on the route itself in App.jsx:
 *
 *   <Route
 *     path="/product/:id"
 *     element={<ProductPage />}
 *     handle={{ spacing: SPACING.headerWithFooterGap }}
 *   />
 *
 * Routes without a `spacing` handle fall back to SPACING.header, so a new page
 * automatically clears the fixed header but only gets the footer gap when it
 * asks for it.
 */
export default function UserLayout() {
  const matches = useMatches();

  const spacing = matches.reduce(
    (current, match) => ({ ...current, ...match.handle?.spacing }),
    SPACING.header
  );

  return (
    <>
      <Header />
      {spacing.top && <div className={spacing.top} />}
      <Outlet />
      {spacing.bottom && <div className={spacing.bottom} />}
      <Footer />
    </>
  );
}
