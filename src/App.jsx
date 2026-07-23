import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserLayout from './pages/user/UserLayout';
import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import HomePage from './pages/user/HomePage';
import SearchPage from './pages/user/SearchPage';
import ProductPage from './pages/user/ProductPage';
import CartPage from './pages/user/CartPage';
import DebugOverlay from './components/debug/DebugOverlay';

function App() {
  return (
    <BrowserRouter>
        <DebugOverlay />

      <Routes>
        {/* User routes with shared layout */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;