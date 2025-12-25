import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAttendance } from '../context/AttendanceContext';
import { exportAttendanceToCSV, filterRecordsByDate, filterRecordsByClass, filterRecordsByStudent } from '../utils/exportUtils';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout, attendanceRecords, classes } = useAttendance();
  const [filterClass, setFilterClass] = useState('');
  const [filterStudent, setFilterStudent] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  if (!user) {
    navigate('/');
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getFilteredRecords = () => {
    let filtered = [...attendanceRecords];
    filtered = filterRecordsByDate(filtered, filterStartDate, filterEndDate);
    filtered = filterRecordsByClass(filtered, filterClass);
    filtered = filterRecordsByStudent(filtered, filterStudent);
    return filtered;
  };

  const filteredRecords = getFilteredRecords();

  const handleExport = () => {
    exportAttendanceToCSV(filteredRecords);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Smart Attendance Dashboard</h1>
        <div className="header-actions">
          <span className="user-info">Welcome, {user.username}</span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="navigation-cards">
          <div className="nav-card" onClick={() => navigate('/face-capture')}>
            <div className="card-icon">📷</div>
            <h3>Face Capture</h3>
            <p>Mark attendance using face recognition</p>
          </div>

          <div className="nav-card" onClick={() => navigate('/admin')}>
            <div className="card-icon">⚙️</div>
            <h3>Admin Settings</h3>
            <p>Manage students and classes</p>
          </div>

          <div className="nav-card" onClick={handleExport}>
            <div className="card-icon">📊</div>
            <h3>Export Records</h3>
            <p>Download attendance as CSV</p>
          </div>
        </div>

        <div className="attendance-section">
          <h2>Attendance Records</h2>
          
          <div className="filters">
            <div className="filter-group">
              <label>Class:</label>
              <select value={filterClass} onChange={(e) => setFilterClass(e.target.value)}>
                <option value="">All Classes</option>
                {classes.map(cls => (
                  <option key={cls.id} value={cls.name}>{cls.name}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Student:</label>
              <input
                type="text"
                value={filterStudent}
                onChange={(e) => setFilterStudent(e.target.value)}
                placeholder="Search by name"
              />
            </div>

            <div className="filter-group">
              <label>From:</label>
              <input
                type="date"
                value={filterStartDate}
                onChange={(e) => setFilterStartDate(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <label>To:</label>
              <input
                type="date"
                value={filterEndDate}
                onChange={(e) => setFilterEndDate(e.target.value)}
              />
            </div>

            <button onClick={handleExport} className="btn-export">
              Export to CSV
            </button>
          </div>

          <div className="stats">
            <div className="stat-card">
              <h4>Total Records</h4>
              <p className="stat-number">{filteredRecords.length}</p>
            </div>
            <div className="stat-card">
              <h4>Today's Attendance</h4>
              <p className="stat-number">
                {filteredRecords.filter(r => r.date === new Date().toLocaleDateString()).length}
              </p>
            </div>
          </div>

          <div className="table-container">
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Class</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="no-records">No attendance records found</td>
                  </tr>
                ) : (
                  filteredRecords.map(record => (
                    <tr key={record.id}>
                      <td>{record.studentName}</td>
                      <td>{record.className || 'N/A'}</td>
                      <td>{record.date}</td>
                      <td>{record.time}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
