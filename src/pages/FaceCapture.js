import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAttendance } from '../context/AttendanceContext';
import { initFaceDetection, detectFaces, drawFaceBox, findMatchingStudent } from '../utils/faceDetection';
import '../styles/FaceCapture.css';

const FaceCapture = () => {
  const navigate = useNavigate();
  const { user, students, markAttendance, faceDescriptors } = useAttendance();
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [status, setStatus] = useState('');
  const [detectedStudent, setDetectedStudent] = useState(null);
  const detectionIntervalRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, []);

  const startWebcam = async () => {
    try {
      setStatus('Initializing camera...');
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setIsWebcamActive(true);
          setStatus('Camera active. Initializing face detection...');
          
          // Initialize face detection
          initFaceDetection()
            .then(() => {
              setStatus('Ready! Position your face in the frame.');
              startDetection();
            })
            .catch(err => {
              setStatus('Error initializing face detection: ' + err.message);
            });
        };
      }
    } catch (err) {
      setStatus('Error accessing camera: ' + err.message);
      console.error('Camera error:', err);
    }
  };

  const stopWebcam = () => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
      detectionIntervalRef.current = null;
    }

    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    setIsWebcamActive(false);
    setStatus('');
    setDetectedStudent(null);
  };

  const startDetection = () => {
    if (detectionIntervalRef.current) {
      clearInterval(detectionIntervalRef.current);
    }

    detectionIntervalRef.current = setInterval(async () => {
      if (videoRef.current && canvasRef.current) {
        await detectAndDrawFaces();
      }
    }, 100); // Run detection every 100ms
  };

  const detectAndDrawFaces = async () => {
    try {
      const faces = await detectFaces(videoRef.current);
      
      if (canvasRef.current) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        drawFaceBox(canvasRef.current, faces);
      }

      if (faces.length > 0) {
        setStatus(`${faces.length} face(s) detected`);
        
        // Try to match face with registered students
        if (Object.keys(faceDescriptors).length > 0) {
          const match = findMatchingStudent(faces[0], faceDescriptors);
          if (match.studentId) {
            const student = students.find(s => s.id === match.studentId);
            if (student) {
              setDetectedStudent({
                ...student,
                confidence: (match.confidence * 100).toFixed(1)
              });
              setStatus(`Recognized: ${student.name} (${(match.confidence * 100).toFixed(1)}% confidence)`);
            }
          } else {
            setDetectedStudent(null);
          }
        }
      } else {
        setStatus('No face detected. Please position yourself in the frame.');
        setDetectedStudent(null);
      }
    } catch (err) {
      console.error('Detection error:', err);
    }
  };

  const handleMarkAttendance = () => {
    if (detectedStudent) {
      markAttendance(
        detectedStudent.id,
        detectedStudent.name,
        detectedStudent.className
      );
      setStatus(`Attendance marked for ${detectedStudent.name}!`);
      setDetectedStudent(null);
      
      // Show success message for 3 seconds
      setTimeout(() => {
        setStatus('Ready for next student');
      }, 3000);
    }
  };

  return (
    <div className="face-capture-container">
      <header className="page-header">
        <h1>Face Recognition Attendance</h1>
        <button onClick={() => navigate('/dashboard')} className="btn-back">
          Back to Dashboard
        </button>
      </header>

      <div className="capture-content">
        <div className="video-container">
          <div className="video-wrapper">
            <video ref={videoRef} className="video-feed" playsInline />
            <canvas ref={canvasRef} className="canvas-overlay" />
          </div>

          <div className="status-bar">
            {status && <p className="status-message">{status}</p>}
          </div>

          <div className="controls">
            {!isWebcamActive ? (
              <button onClick={startWebcam} className="btn-primary">
                Start Camera
              </button>
            ) : (
              <button onClick={stopWebcam} className="btn-secondary">
                Stop Camera
              </button>
            )}
          </div>
        </div>

        <div className="info-panel">
          <div className="detection-info">
            <h3>Detection Info</h3>
            {detectedStudent ? (
              <div className="detected-student">
                <p><strong>Name:</strong> {detectedStudent.name}</p>
                <p><strong>ID:</strong> {detectedStudent.studentId}</p>
                <p><strong>Class:</strong> {detectedStudent.className}</p>
                <p><strong>Confidence:</strong> {detectedStudent.confidence}%</p>
                <button onClick={handleMarkAttendance} className="btn-mark">
                  Mark Attendance
                </button>
              </div>
            ) : (
              <p className="no-detection">No student recognized yet</p>
            )}
          </div>

          <div className="instructions">
            <h3>Instructions</h3>
            <ul>
              <li>Click "Start Camera" to begin</li>
              <li>Position your face in the frame</li>
              <li>Wait for face detection (green box)</li>
              <li>System will recognize registered students</li>
              <li>Click "Mark Attendance" when recognized</li>
            </ul>
          </div>

          <div className="registered-students">
            <h3>Registered Students</h3>
            <p>{students.length} students registered</p>
            <p>{Object.keys(faceDescriptors).length} with face data</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaceCapture;
