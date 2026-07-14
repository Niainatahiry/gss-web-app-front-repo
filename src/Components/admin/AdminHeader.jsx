import { useNavigate } from 'react-router-dom';
// import './AdminHeader.css';

function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth token
    navigate('/');
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <h1>Admin Panel</h1>
      </div>
      <div className="header-right">
        <input 
          type="text" 
          placeholder="Search..." 
          className="search-input"
        />
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </header>
  );
}

export default AdminHeader;