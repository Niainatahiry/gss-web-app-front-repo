import { Link, useLocation } from 'react-router-dom';
// import './AdminSidebar.css';

function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { label: 'Dashboard', path: '/admin', icon: '📊' },
    { label: 'Products', path: '/admin/products', icon: '🎮' },
    { label: 'Users', path: '/admin/users', icon: '👥' },
    { label: 'Orders', path: '/admin/orders', icon: '📦' },
    { label: 'Categories', path: '/admin/categories', icon: '📂' },
    { label: 'Reports', path: '/admin/reports', icon: '📈' },
  ];

  return (
    <aside className="admin-sidebar">
      <div className="sidebar-header">
        <h2>GSS Admin</h2>
      </div>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="icon">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSidebar;