import StatsCard from './StatsCard';
// import './Dashboard.css';

function Dashboard() {
  const stats = [
    { label: 'Total Sales', value: '140,000 AR', change: '+12%' },
    { label: 'Total Orders', value: '1,234', change: '+8%' },
    { label: 'Active Users', value: '5,678', change: '+3%' },
    { label: 'Revenue', value: '2.5M AR', change: '+15%' },
  ];

  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>
      <div className="stats-grid">
        {stats.map((stat, idx) => (
          <StatsCard key={idx} {...stat} />
        ))}
      </div>
      {/* Add charts, recent orders, etc. */}
    </div>
  );
}

export default Dashboard;