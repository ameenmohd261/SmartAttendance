import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AttendanceProvider } from './context/AttendanceContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FaceCapture from './pages/FaceCapture';
import Admin from './pages/Admin';
import './styles/App.css';

function App() {
  return (
    <AttendanceProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/face-capture" element={<FaceCapture />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AttendanceProvider>
  );
}

export default App;
