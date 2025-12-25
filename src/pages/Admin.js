import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAttendance } from '../context/AttendanceContext';
import { detectFaces } from '../utils/faceDetection';
import '../styles/Admin.css';

const Admin = () => {
  const navigate = useNavigate();
  const { user, students, addStudent, updateStudent, deleteStudent, classes, addClass, deleteClass, saveFaceDescriptor } = useAttendance();
  
  const [activeTab, setActiveTab] = useState('students');
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [className, setClassName] = useState('');
  const [editingStudent, setEditingStudent] = useState(null);
  const [isCapturingFace, setIsCapturingFace] = useState(false);
  const [captureStudentId, setCaptureStudentId] = useState(null);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  useEffect(() => {
    return () => {
      stopFaceCapture();
    };
  }, []);

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (studentName && studentId) {
      addStudent({
        name: studentName,
        studentId: studentId,
        className: studentClass,
      });
      setStudentName('');
      setStudentId('');
      setStudentClass('');
    }
  };

  const handleUpdateStudent = (e) => {
    e.preventDefault();
    if (editingStudent && studentName && studentId) {
      updateStudent(editingStudent.id, {
        name: studentName,
        studentId: studentId,
        className: studentClass,
      });
      setEditingStudent(null);
      setStudentName('');
      setStudentId('');
      setStudentClass('');
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setStudentName(student.name);
    setStudentId(student.studentId);
    setStudentClass(student.className || '');
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    setStudentName('');
    setStudentId('');
    setStudentClass('');
  };

  const handleDeleteStudent = (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      deleteStudent(id);
    }
  };

  const handleAddClass = (e) => {
    e.preventDefault();
    if (className) {
      addClass(className);
      setClassName('');
    }
  };

  const handleDeleteClass = (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      deleteClass(id);
    }
  };

  const startFaceCapture = async (studentId) => {
    try {
      setCaptureStudentId(studentId);
      setIsCapturingFace(true);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      }
    } catch (err) {
      alert('Error accessing camera: ' + err.message);
      setIsCapturingFace(false);
    }
  };

  const stopFaceCapture = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCapturingFace(false);
    setCaptureStudentId(null);
  };

  const captureFaceData = async () => {
    try {
      if (videoRef.current && captureStudentId) {
        const faces = await detectFaces(videoRef.current);
        
        if (faces.length > 0) {
          // Save the face descriptor
          saveFaceDescriptor(captureStudentId, faces[0]);
          alert('Face data captured successfully!');
          stopFaceCapture();
        } else {
          alert('No face detected. Please position your face properly and try again.');
        }
      }
    } catch (err) {
      alert('Error capturing face data: ' + err.message);
    }
  };

  return (
    <div className="admin-container">
      <header className="page-header">
        <h1>Admin Settings</h1>
        <button onClick={() => navigate('/dashboard')} className="btn-back">
          Back to Dashboard
        </button>
      </header>

      <div className="admin-content">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            Students
          </button>
          <button
            className={`tab ${activeTab === 'classes' ? 'active' : ''}`}
            onClick={() => setActiveTab('classes')}
          >
            Classes
          </button>
        </div>

        {activeTab === 'students' && (
          <div className="tab-content">
            <div className="form-section">
              <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
              <form onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent}>
                <div className="form-group">
                  <label>Student Name</label>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    placeholder="Enter student name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Student ID</label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="Enter student ID"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Class</label>
                  <select
                    value={studentClass}
                    onChange={(e) => setStudentClass(e.target.value)}
                  >
                    <option value="">Select Class</option>
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.name}>{cls.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn-primary">
                    {editingStudent ? 'Update Student' : 'Add Student'}
                  </button>
                  {editingStudent && (
                    <button type="button" onClick={handleCancelEdit} className="btn-secondary">
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="list-section">
              <h2>Registered Students ({students.length})</h2>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Student ID</th>
                      <th>Class</th>
                      <th>Face Data</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="no-data">No students registered</td>
                      </tr>
                    ) : (
                      students.map(student => (
                        <tr key={student.id}>
                          <td>{student.name}</td>
                          <td>{student.studentId}</td>
                          <td>{student.className || 'N/A'}</td>
                          <td>
                            <button
                              onClick={() => startFaceCapture(student.id)}
                              className="btn-small"
                            >
                              Capture Face
                            </button>
                          </td>
                          <td className="action-buttons">
                            <button
                              onClick={() => handleEditStudent(student)}
                              className="btn-edit"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(student.id)}
                              className="btn-delete"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'classes' && (
          <div className="tab-content">
            <div className="form-section">
              <h2>Add New Class</h2>
              <form onSubmit={handleAddClass}>
                <div className="form-group">
                  <label>Class Name</label>
                  <input
                    type="text"
                    value={className}
                    onChange={(e) => setClassName(e.target.value)}
                    placeholder="Enter class name"
                    required
                  />
                </div>

                <button type="submit" className="btn-primary">
                  Add Class
                </button>
              </form>
            </div>

            <div className="list-section">
              <h2>Available Classes ({classes.length})</h2>
              <div className="classes-grid">
                {classes.length === 0 ? (
                  <p className="no-data">No classes created</p>
                ) : (
                  classes.map(cls => (
                    <div key={cls.id} className="class-card">
                      <h3>{cls.name}</h3>
                      <button
                        onClick={() => handleDeleteClass(cls.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {isCapturingFace && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Capture Face Data</h2>
            <div className="video-container">
              <video ref={videoRef} className="video-feed" playsInline />
              <canvas ref={canvasRef} className="canvas-overlay" />
            </div>
            <p>Position your face in the frame and click "Capture"</p>
            <div className="modal-actions">
              <button onClick={captureFaceData} className="btn-primary">
                Capture
              </button>
              <button onClick={stopFaceCapture} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
