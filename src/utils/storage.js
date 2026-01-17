// Storage utility for managing attendance records and user data
const STORAGE_KEYS = {
  USERS: 'smart_attendance_users',
  ATTENDANCE: 'smart_attendance_records'
};

// Initialize default data if not exists
export const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const defaultUsers = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        faceDescriptor: null, // Will be populated during face registration
        registeredAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        faceDescriptor: null,
        registeredAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
  }

  if (!localStorage.getItem(STORAGE_KEYS.ATTENDANCE)) {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify([]));
  }
};

// User management
export const getUsers = () => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user) => {
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const updateUserFaceDescriptor = (userId, faceDescriptor) => {
  const users = getUsers();
  const user = users.find(u => u.id === userId);
  
  if (user) {
    user.faceDescriptor = Array.from(faceDescriptor);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return true;
  }
  return false;
};

// Attendance management
export const getAttendanceRecords = () => {
  const records = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
  return records ? JSON.parse(records) : [];
};

export const saveAttendanceRecord = (record) => {
  const records = getAttendanceRecords();
  
  // Check if attendance already marked today for this user
  const today = new Date().toDateString();
  const existingRecord = records.find(
    r => r.userId === record.userId && 
    new Date(r.timestamp).toDateString() === today
  );
  
  if (existingRecord) {
    return { success: false, message: 'Attendance already marked for today' };
  }
  
  records.push({
    ...record,
    timestamp: new Date().toISOString()
  });
  
  localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(records));
  return { success: true, message: 'Attendance marked successfully' };
};

// Get attendance by date
export const getAttendanceByDate = (date) => {
  const records = getAttendanceRecords();
  const targetDate = new Date(date).toDateString();
  
  // Pre-parse dates once and filter - more efficient for large datasets
  return records.filter(record => {
    try {
      return new Date(record.timestamp).toDateString() === targetDate;
    } catch (error) {
      console.error('Invalid timestamp in record:', record);
      return false;
    }
  });
};

// Get attendance statistics
export const getAttendanceStats = () => {
  const records = getAttendanceRecords();
  const users = getUsers();
  const today = new Date().toDateString();
  
  const todayRecords = records.filter(
    r => new Date(r.timestamp).toDateString() === today
  );
  
  return {
    totalUsers: users.length,
    totalAttendance: records.length,
    todayAttendance: todayRecords.length,
    registeredUsers: users.filter(u => u.faceDescriptor).length
  };
};

// Export data to CSV format
export const exportToCSV = (records) => {
  if (records.length === 0) return '';
  
  const headers = ['User ID', 'Name', 'Date', 'Time', 'Status'];
  const rows = records.map(record => [
    record.userId,
    record.userName,
    new Date(record.timestamp).toLocaleDateString(),
    new Date(record.timestamp).toLocaleTimeString(),
    record.status || 'Present'
  ]);
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  return csvContent;
};
