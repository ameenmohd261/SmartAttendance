import React, { useRef, useEffect, useState } from 'react';
import { 
  startVideo, 
  stopVideo, 
  detectFace, 
  compareFaces, 
  getUsersData,
  saveAttendance 
} from '../utils/faceRecognition';

const Attendance = ({ onStatusChange, onAttendanceMarked }) => {
  const videoRef = useRef();
  const [isCapturing, setIsCapturing] = useState(false);
  const [stream, setStream] = useState(null);
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });
  const [isProcessing, setIsProcessing] = useState(false);

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
      setStatusMessage({ text: 'Camera ready! Position your face to mark attendance.', type: 'success' });
      onStatusChange?.('Camera started for attendance');
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

  const handleMarkAttendance = async () => {
    if (!isCapturing || !videoRef.current) {
      setStatusMessage({ text: 'Please start the camera first', type: 'error' });
      return;
    }

    setIsProcessing(true);
    
    try {
      setStatusMessage({ text: 'Detecting and recognizing face...', type: 'info' });
      
      const detection = await detectFace(videoRef.current);

      if (!detection) {
        setStatusMessage({ 
          text: 'No face detected. Please ensure your face is clearly visible.', 
          type: 'error' 
        });
        setIsProcessing(false);
        return;
      }

      // Get all registered users
      const users = getUsersData();
      const userNames = Object.keys(users);

      if (userNames.length === 0) {
        setStatusMessage({ 
          text: 'No registered users found. Please register first.', 
          type: 'error' 
        });
        setIsProcessing(false);
        return;
      }

      // Find matching user
      let matchedUser = null;
      let minDistance = 1;

      for (const userName of userNames) {
        const userDescriptor = new Float32Array(users[userName]);
        const { isMatch, distance } = compareFaces(detection.descriptor, userDescriptor, 0.6);
        
        if (isMatch && distance < minDistance) {
          minDistance = distance;
          matchedUser = userName;
        }
      }

      if (matchedUser) {
        saveAttendance(matchedUser);
        setStatusMessage({ 
          text: `✅ Attendance marked for ${matchedUser}!`, 
          type: 'success' 
        });
        onStatusChange?.(`Attendance marked: ${matchedUser}`);
        onAttendanceMarked?.();
        
        setTimeout(() => {
          handleStopCamera();
        }, 2000);
      } else {
        setStatusMessage({ 
          text: '❌ Face not recognized. Please register first or try again.', 
          type: 'error' 
        });
        onStatusChange?.('Face not recognized');
      }

    } catch (error) {
      setStatusMessage({ 
        text: 'Error during recognition: ' + error.message, 
        type: 'error' 
      });
      onStatusChange?.('Error: ' + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="section">
      <h2>✓ Mark Attendance</h2>
      
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
      </div>

      <div className="controls">
        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          {!isCapturing ? (
            <button className="button" onClick={handleStartCamera}>
              📷 Start Camera
            </button>
          ) : (
            <>
              <button 
                className="button button-success" 
                onClick={handleMarkAttendance}
                disabled={isProcessing}
              >
                {isProcessing ? '⏳ Processing...' : '✓ Mark My Attendance'}
              </button>
              <button 
                className="button button-secondary" 
                onClick={handleStopCamera}
                disabled={isProcessing}
              >
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

export default Attendance;
