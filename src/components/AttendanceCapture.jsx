import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { useAuth } from '../utils/AuthContext';
import { 
  loadModels, 
  detectFace, 
  findMatchingFace,
  drawDetection,
  isModelsLoaded
} from '../utils/faceRecognition';
import { 
  getUsers, 
  saveAttendanceRecord,
  updateUserFaceDescriptor
} from '../utils/storage';
import './AttendanceCapture.css';

const AttendanceCapture = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [mode, setMode] = useState('mark'); // 'mark' or 'register'
  const [webcamError, setWebcamError] = useState('');

  useEffect(() => {
    initializeFaceRecognition();
    loadUsers();
  }, []);

  const initializeFaceRecognition = async () => {
    try {
      showMessage('Loading face recognition models...', 'info');
      await loadModels();
      setIsModelLoaded(true);
      showMessage('Face recognition ready!', 'success');
    } catch (error) {
      console.error('Error loading models:', error);
      showMessage('Error loading face recognition models. Please refresh the page.', 'error');
    }
  };

  const loadUsers = () => {
    const allUsers = getUsers();
    setUsers(allUsers);
  };

  const showMessage = (msg, type = 'info') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage('');
      setMessageType('');
    }, 5000);
  };

  const handleWebcamError = (error) => {
    console.error('Webcam error:', error);
    setWebcamError('Unable to access webcam. Please check permissions.');
  };

  const captureAndProcess = async () => {
    if (!isModelLoaded) {
      showMessage('Face recognition models are still loading...', 'warning');
      return;
    }

    if (!webcamRef.current) {
      showMessage('Webcam not ready', 'error');
      return;
    }

    setIsCapturing(true);
    showMessage('Processing...', 'info');

    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        showMessage('Failed to capture image', 'error');
        setIsCapturing(false);
        return;
      }

      // Create image element
      const img = new Image();
      img.src = imageSrc;
      
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Detect face
      const detection = await detectFace(img);

      if (!detection) {
        showMessage('No face detected. Please position your face in the frame.', 'warning');
        setIsCapturing(false);
        return;
      }

      // Draw detection on canvas
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const displaySize = { width: img.width, height: img.height };
        canvas.width = displaySize.width;
        canvas.height = displaySize.height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        drawDetection(canvas, detection);
      }

      if (mode === 'register') {
        await handleRegisterFace(detection);
      } else {
        await handleMarkAttendance(detection);
      }
    } catch (error) {
      console.error('Error processing face:', error);
      showMessage('Error processing face. Please try again.', 'error');
    } finally {
      setIsCapturing(false);
    }
  };

  const handleRegisterFace = async (detection) => {
    if (!selectedUser) {
      showMessage('Please select a user to register', 'warning');
      return;
    }

    const success = updateUserFaceDescriptor(selectedUser, detection.descriptor);
    
    if (success) {
      showMessage('Face registered successfully!', 'success');
      loadUsers();
      setSelectedUser('');
    } else {
      showMessage('Failed to register face', 'error');
    }
  };

  const handleMarkAttendance = async (detection) => {
    const registeredUsers = users.filter(u => u.faceDescriptor);
    
    if (registeredUsers.length === 0) {
      showMessage('No users with registered faces found. Please register faces first.', 'warning');
      return;
    }

    const matchedUser = findMatchingFace(detection.descriptor, registeredUsers, 0.6);

    if (matchedUser) {
      const result = saveAttendanceRecord({
        userId: matchedUser.id,
        userName: matchedUser.name,
        status: 'Present'
      });

      if (result.success) {
        showMessage(`✓ Attendance marked for ${matchedUser.name} (Confidence: ${(matchedUser.confidence * 100).toFixed(1)}%)`, 'success');
      } else {
        showMessage(result.message, 'warning');
      }
    } else {
      showMessage('Face not recognized. Please register your face first.', 'warning');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="attendance-capture">
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
        <div className="capture-section">
          <div className="card">
            <h2>Face Recognition Attendance</h2>
            
            {message && (
              <div className={`alert alert-${messageType}`}>
                {message}
              </div>
            )}

            {webcamError && (
              <div className="alert alert-error">
                {webcamError}
              </div>
            )}

            {/* Mode Selection */}
            <div className="mode-selection">
              <button
                className={`btn ${mode === 'mark' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setMode('mark')}
              >
                Mark Attendance
              </button>
              <button
                className={`btn ${mode === 'register' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setMode('register')}
              >
                Register Face
              </button>
            </div>

            {mode === 'register' && (
              <div className="form-group">
                <label htmlFor="user-select">Select User to Register:</label>
                <select
                  id="user-select"
                  className="form-control"
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                >
                  <option value="">-- Select User --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} {u.faceDescriptor ? '(Already Registered)' : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Webcam Container */}
            <div className="webcam-container">
              <div className="webcam-wrapper">
                <Webcam
                  ref={webcamRef}
                  audio={false}
                  screenshotFormat="image/jpeg"
                  videoConstraints={{
                    width: 640,
                    height: 480,
                    facingMode: 'user'
                  }}
                  onUserMediaError={handleWebcamError}
                />
                <canvas ref={canvasRef} className="detection-canvas" />
              </div>
            </div>

            {/* Action Button */}
            <div className="action-buttons">
              <button
                className="btn btn-primary btn-large"
                onClick={captureAndProcess}
                disabled={!isModelLoaded || isCapturing || (mode === 'register' && !selectedUser)}
              >
                {isCapturing ? 'Processing...' : mode === 'mark' ? 'Mark Attendance' : 'Register Face'}
              </button>
            </div>

            {/* Instructions */}
            <div className="instructions">
              <h3>Instructions:</h3>
              <ul>
                <li>Allow webcam access when prompted</li>
                <li>Position your face clearly in the frame</li>
                <li>Ensure good lighting conditions</li>
                <li>Look directly at the camera</li>
                {mode === 'register' && <li>Select a user before capturing</li>}
                {mode === 'mark' && <li>Make sure your face is registered first</li>}
              </ul>
            </div>
          </div>

          {/* User Status */}
          <div className="card">
            <h3>Registered Users ({users.filter(u => u.faceDescriptor).length}/{users.length})</h3>
            <div className="user-list">
              {users.map((u) => (
                <div key={u.id} className="user-item">
                  <span className="user-name">{u.name}</span>
                  <span className={`status ${u.faceDescriptor ? 'registered' : 'pending'}`}>
                    {u.faceDescriptor ? '✓ Registered' : '○ Not Registered'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCapture;
