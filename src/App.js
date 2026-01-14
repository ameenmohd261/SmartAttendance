import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Registration from './components/Registration';
import Attendance from './components/Attendance';
import AttendanceRecords from './components/AttendanceRecords';
import { loadModels } from './utils/faceRecognition';

function App() {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [statusLog, setStatusLog] = useState([]);
  const [refreshRecords, setRefreshRecords] = useState(0);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        addStatusLog('Initializing Smart Attendance System...');
        addStatusLog('Loading face detection models...');
        await loadModels();
        setModelsLoaded(true);
        addStatusLog('✅ System ready! You can now register users and mark attendance.');
      } catch (error) {
        console.error('Initialization error:', error);
        setLoadingError(error.message);
        addStatusLog('❌ Error: ' + error.message);
      }
    };

    initializeApp();
  }, []);

  const addStatusLog = (message) => {
    setStatusLog(prev => [...prev, { message, time: new Date().toLocaleTimeString() }]);
  };

  const handleAttendanceMarked = () => {
    setRefreshRecords(prev => prev + 1);
  };

  if (loadingError) {
    return (
      <div className="app">
        <div className="header">
          <h1>⚠️ Setup Required</h1>
        </div>
        <div className="section">
          <h2>Face Detection Models Not Found</h2>
          <p style={{ marginBottom: '15px' }}>
            The face detection models are required for this application to work.
          </p>
          <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '15px' }}>
            <h3 style={{ marginBottom: '10px' }}>Setup Instructions:</h3>
            <ol style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
              <li>Create a <code>models</code> folder in the <code>public</code> directory</li>
              <li>Download the face-api.js models from: 
                <a 
                  href="https://github.com/justadudewhohacks/face-api.js-models" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{ color: '#667eea', marginLeft: '5px' }}
                >
                  GitHub Repository
                </a>
              </li>
              <li>Copy these model files into <code>public/models</code>:
                <ul style={{ marginTop: '10px' }}>
                  <li>tiny_face_detector_model-weights_manifest.json</li>
                  <li>tiny_face_detector_model-shard1</li>
                  <li>face_landmark_68_model-weights_manifest.json</li>
                  <li>face_landmark_68_model-shard1</li>
                  <li>face_recognition_model-weights_manifest.json</li>
                  <li>face_recognition_model-shard1 and shard2</li>
                  <li>face_expression_model-weights_manifest.json</li>
                  <li>face_expression_model-shard1</li>
                </ul>
              </li>
              <li>Restart the application</li>
            </ol>
          </div>
          <p style={{ color: '#721c24', background: '#f8d7da', padding: '10px', borderRadius: '5px' }}>
            <strong>Error:</strong> {loadingError}
          </p>
        </div>
      </div>
    );
  }

  if (!modelsLoaded) {
    return (
      <div className="app">
        <div className="header">
          <h1>🔄 Loading Smart Attendance System</h1>
          <p>Please wait while we initialize face detection models...</p>
        </div>
        <div className="loading">
          <p>Loading face detection models... This may take a moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="header">
        <h1>🎓 Smart Attendance System</h1>
        <p>Face Recognition Based Attendance Management</p>
      </div>

      <div className="content">
        <Registration onStatusChange={addStatusLog} />
        <Attendance 
          onStatusChange={addStatusLog} 
          onAttendanceMarked={handleAttendanceMarked}
        />
      </div>

      <AttendanceRecords refreshTrigger={refreshRecords} />

      {statusLog.length > 0 && (
        <div className="section" style={{ marginTop: '20px' }}>
          <h2>📝 Activity Log</h2>
          <div style={{ 
            maxHeight: '200px', 
            overflowY: 'auto',
            background: '#f8f9fa',
            padding: '15px',
            borderRadius: '8px'
          }}>
            {statusLog.slice(-10).reverse().map((log, index) => (
              <div 
                key={index} 
                style={{ 
                  padding: '8px 0', 
                  borderBottom: index < statusLog.slice(-10).length - 1 ? '1px solid #dee2e6' : 'none',
                  fontSize: '0.9rem'
                }}
              >
                <span style={{ color: '#667eea', fontWeight: '600', marginRight: '10px' }}>
                  {log.time}
                </span>
                <span>{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
