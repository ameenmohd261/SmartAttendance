import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { 
  getAttendanceRecords, 
  getAttendanceByDate, 
  getAttendanceStats,
  getUsers,
  exportToCSV,
  initializeStorage
} from '../utils/storage';
import { saveAs } from 'file-saver';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    // Initialize storage on component mount
    initializeStorage();
    loadData();
  }, [selectedDate]);

  const loadData = () => {
    const statistics = getAttendanceStats();
    setStats(statistics);
    
    const dateRecords = getAttendanceByDate(selectedDate);
    setAttendanceData(dateRecords);
    
    const users = getUsers();
    setAllUsers(users);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleExportCSV = () => {
    const records = selectedDate ? 
      getAttendanceByDate(selectedDate) : 
      getAttendanceRecords();
    
    if (records.length === 0) {
      alert('No attendance records to export');
      return;
    }
    
    const csvContent = exportToCSV(records);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const fileName = `attendance_${selectedDate || 'all'}.csv`;
    saveAs(blob, fileName);
  };

  return (
    <div className="dashboard">
      <nav className="navbar">
        <div className="container">
          <h1>Smart Attendance System</h1>
          <div className="nav-links">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/attendance">Mark Attendance</Link>
            <span>Welcome, {user?.username}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="dashboard-header">
          <h2>Dashboard Overview</h2>
          <button className="btn btn-success" onClick={handleExportCSV}>
            Export to CSV
          </button>
        </div>

        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card card">
            <div className="stat-icon">👥</div>
            <div className="stat-content">
              <h3>{stats.totalUsers || 0}</h3>
              <p>Total Users</p>
            </div>
          </div>
          
          <div className="stat-card card">
            <div className="stat-icon">✓</div>
            <div className="stat-content">
              <h3>{stats.registeredUsers || 0}</h3>
              <p>Registered Faces</p>
            </div>
          </div>
          
          <div className="stat-card card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>{stats.totalAttendance || 0}</h3>
              <p>Total Attendance</p>
            </div>
          </div>
          
          <div className="stat-card card">
            <div className="stat-icon">📅</div>
            <div className="stat-content">
              <h3>{stats.todayAttendance || 0}</h3>
              <p>Today's Attendance</p>
            </div>
          </div>
        </div>

        {/* Attendance Records */}
        <div className="card attendance-section">
          <div className="section-header">
            <h3>Attendance Records</h3>
            <div className="date-filter">
              <label htmlFor="date">Select Date:</label>
              <input
                type="date"
                id="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="form-control"
              />
            </div>
          </div>

          {attendanceData.length > 0 ? (
            <div className="table-responsive">
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((record, index) => (
                    <tr key={index}>
                      <td>{record.userId}</td>
                      <td>{record.userName}</td>
                      <td>{new Date(record.timestamp).toLocaleDateString()}</td>
                      <td>{new Date(record.timestamp).toLocaleTimeString()}</td>
                      <td>
                        <span className="status-badge status-present">
                          {record.status || 'Present'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-data">
              <p>No attendance records found for {new Date(selectedDate).toLocaleDateString()}</p>
            </div>
          )}
        </div>

        {/* User List */}
        <div className="card">
          <h3>Registered Users</h3>
          <div className="users-grid">
            {allUsers.map((user) => (
              <div key={user.id} className="user-card">
                <div className="user-info">
                  <h4>{user.name}</h4>
                  <p>{user.email}</p>
                  <span className={`badge ${user.faceDescriptor ? 'badge-success' : 'badge-warning'}`}>
                    {user.faceDescriptor ? 'Face Registered' : 'Face Not Registered'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
