import React, { useRef, useEffect, useState } from 'react';
import { startVideo, stopVideo, detectFace, saveUserData } from '../utils/faceRecognition';

const Registration = ({ onStatusChange }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [name, setName] = useState('');
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState(null);
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    return () => {
      if (stream) {
        stopVideo(stream);
      }
    };
  }, [stream]);

  const handleStartCamera = async () => {
    try {
      setStatusMessage({ text: 'Starting camera...', type: 'info' });
      const videoStream = await startVideo(videoRef.current);
      setStream(videoStream);
      setIsCapturing(true);
      setStatusMessage({ text: 'Camera started successfully!', type: 'success' });
      onStatusChange?.('Camera started');
    } catch (error) {
      setStatusMessage({ text: error.message, type: 'error' });
      onStatusChange?.('Error: ' + error.message);
    }
  };

  const handleStopCamera = () => {
    if (stream) {
      stopVideo(stream);
      setStream(null);
      setIsCapturing(false);
      setStatusMessage({ text: 'Camera stopped', type: 'info' });
      onStatusChange?.('Camera stopped');
    }
  };

  const handleRegister = async () => {
    if (!name.trim()) {
      setStatusMessage({ text: 'Please enter your name', type: 'error' });
      return;
    }

    if (!isCapturing || !videoRef.current) {
      setStatusMessage({ text: 'Please start the camera first', type: 'error' });
      return;
    }

    try {
      setStatusMessage({ text: 'Detecting face...', type: 'info' });
      const detection = await detectFace(videoRef.current);

      if (!detection) {
        setStatusMessage({ 
          text: 'No face detected. Please ensure your face is visible and well-lit.', 
          type: 'error' 
        });
        return;
      }

      // Save user data
      saveUserData(name, detection.descriptor);
      setStatusMessage({ 
        text: `Successfully registered ${name}!`, 
        type: 'success' 
      });
      onStatusChange?.(`Registered: ${name}`);
      
      // Reset form
      setName('');
      setTimeout(() => {
        handleStopCamera();
      }, 2000);

    } catch (error) {
      setStatusMessage({ 
        text: 'Error during registration: ' + error.message, 
        type: 'error' 
      });
      onStatusChange?.('Error: ' + error.message);
    }
  };

  return (
    <div className="section">
      <h2>👤 Register New User</h2>
      
      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          style={{ display: isCapturing ? 'block' : 'none' }}
        />
        {!isCapturing && (
          <div style={{ 
            width: '100%', 
            height: '300px', 
            background: '#f0f0f0', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            color: '#999'
          }}>
            <p>Camera not started</p>
          </div>
        )}
        <canvas ref={canvasRef} className="canvas-overlay" />
      </div>

      <div className="controls">
        <div className="input-group">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            disabled={!isCapturing}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {!isCapturing ? (
            <button className="button" onClick={handleStartCamera}>
              📷 Start Camera
            </button>
          ) : (
            <>
              <button 
                className="button button-success" 
                onClick={handleRegister}
                disabled={!name.trim()}
              >
                ✅ Register Face
              </button>
              <button className="button button-secondary" onClick={handleStopCamera}>
                ⏹ Stop Camera
              </button>
            </>
          )}
        </div>

        {statusMessage.text && (
          <div className={`status-message status-${statusMessage.type}`}>
            {statusMessage.text}
          </div>
        )}
      </div>
    </div>
  );
};

export default Registration;
