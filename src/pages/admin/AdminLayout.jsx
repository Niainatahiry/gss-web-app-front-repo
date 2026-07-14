import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
// import './AdminLayout.css';

function AdminLayout() {
  const navigate = useNavigate();

  // Check if user is admin (implement your auth logic)
  const isAdmin = true; // Replace with actual auth check

  if (!isAdmin) {
    navigate('/');
    return null;
  }

  return (
    <div className="admin-container">
      <AdminSidebar />
      <div className="admin-main">
        <AdminHeader />
        <main className="admin-content">
          <Outlet /> {/* This renders the nested routes */}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;