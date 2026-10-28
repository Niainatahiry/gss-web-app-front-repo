import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import UserLayout from './pages/user/UserLayout';
import AdminLayout from './pages/admin/AdminLayout';
import HomePage from './pages/user/HomePage';
import SearchPage from './pages/user/SearchPage';
import ProductPage from './pages/user/ProductPage';
import CartPage from './pages/user/CartPage';
import AuthPage from './pages/user/AuthPage';
import DebugOverlay from './components/debug/DebugOverlay';
import { SPACING } from './pages/user/layoutSpacing';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* User routes with shared layout */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<HomePage />} handle={{ spacing: SPACING.none }} />
        <Route path="/search" element={<SearchPage />} handle={{ spacing: SPACING.header }} />
        <Route
          path="/product/:id"
          element={<ProductPage />}
          handle={{ spacing: SPACING.headerWithFooterGap }}
        />
        <Route path="/cart" element={<CartPage />} handle={{ spacing: SPACING.header }} />
      </Route>

      {/* Auth : page dédiée (header du site, pied de page légal propre) */}
      <Route path="/auth" element={<AuthPage />} />

      {/* Admin routes */}
      <Route path="/admin/*" element={<AdminLayout />} />
    </>
  )
);

function App() {
  return (
    <>
      <DebugOverlay />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
