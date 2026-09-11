import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export default function UserLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <Header />
      {isHomePage ? "" : <div className="pb-48"></div> }
      <Outlet />
      {isHomePage ? "" : <div className="pb-68"></div> }

      <Footer />
    </>
  );
} 