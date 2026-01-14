import React, { useState, useEffect } from 'react';
import { getAttendanceData } from '../utils/faceRecognition';

const AttendanceRecords = ({ refreshTrigger }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadRecords();
  }, [refreshTrigger]);

  const loadRecords = () => {
    const attendanceData = getAttendanceData();
    // Sort by most recent first
    const sortedRecords = attendanceData.sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
    setRecords(sortedRecords);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const exportToCSV = () => {
    if (records.length === 0) {
      alert('No records to export');
      return;
    }

    const csvContent = [
      ['Name', 'Date', 'Time'],
      ...records.map(record => {
        const date = new Date(record.timestamp);
        return [
          record.name,
          date.toLocaleDateString('en-US'),
          date.toLocaleTimeString('en-US')
        ];
      })
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `attendance_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="section">
      <h2>📊 Attendance Records</h2>
      
      {records.length > 0 && (
        <button 
          className="button button-success" 
          onClick={exportToCSV}
          style={{ marginBottom: '20px', width: '100%' }}
        >
          📥 Export to CSV
        </button>
      )}

      {records.length === 0 ? (
        <div className="empty-state">
          <p style={{ fontSize: '3rem', marginBottom: '10px' }}>📋</p>
          <p>No attendance records yet.</p>
          <p style={{ fontSize: '0.9rem', color: '#999', marginTop: '5px' }}>
            Records will appear here after marking attendance.
          </p>
        </div>
      ) : (
        <ul className="attendance-list">
          {records.map((record, index) => (
            <li key={index} className="attendance-item">
              <div>
                <strong>{record.name}</strong>
              </div>
              <div>
                <span>{formatDate(record.timestamp)}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttendanceRecords;
