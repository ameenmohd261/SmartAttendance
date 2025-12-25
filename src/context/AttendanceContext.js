import React, { createContext, useContext, useState, useEffect } from 'react';

const AttendanceContext = createContext();

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within AttendanceProvider');
  }
  return context;
};

export const AttendanceProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [faceDescriptors, setFaceDescriptors] = useState({});

  // Load data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedStudents = localStorage.getItem('students');
    const storedClasses = localStorage.getItem('classes');
    const storedRecords = localStorage.getItem('attendanceRecords');
    const storedDescriptors = localStorage.getItem('faceDescriptors');

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedStudents) setStudents(JSON.parse(storedStudents));
    if (storedClasses) setClasses(JSON.parse(storedClasses));
    if (storedRecords) setAttendanceRecords(JSON.parse(storedRecords));
    if (storedDescriptors) setFaceDescriptors(JSON.parse(storedDescriptors));
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('attendanceRecords', JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  useEffect(() => {
    localStorage.setItem('faceDescriptors', JSON.stringify(faceDescriptors));
  }, [faceDescriptors]);

  const login = (username, password) => {
    // Simple authentication (in production, use proper backend authentication)
    if (username === 'admin' && password === 'admin') {
      const userData = { username, role: 'admin' };
      setUser(userData);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addStudent = (student) => {
    setStudents([...students, { ...student, id: Date.now().toString() }]);
  };

  const updateStudent = (id, updatedStudent) => {
    setStudents(students.map(s => s.id === id ? { ...s, ...updatedStudent } : s));
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
    const newDescriptors = { ...faceDescriptors };
    delete newDescriptors[id];
    setFaceDescriptors(newDescriptors);
  };

  const addClass = (className) => {
    setClasses([...classes, { id: Date.now().toString(), name: className }]);
  };

  const deleteClass = (id) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  const markAttendance = (studentId, studentName, className) => {
    const record = {
      id: Date.now().toString(),
      studentId,
      studentName,
      className,
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };
    setAttendanceRecords([record, ...attendanceRecords]);
  };

  const saveFaceDescriptor = (studentId, descriptor) => {
    setFaceDescriptors({
      ...faceDescriptors,
      [studentId]: descriptor,
    });
  };

  const value = {
    user,
    login,
    logout,
    students,
    addStudent,
    updateStudent,
    deleteStudent,
    classes,
    addClass,
    deleteClass,
    attendanceRecords,
    markAttendance,
    faceDescriptors,
    saveFaceDescriptor,
  };

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
};
