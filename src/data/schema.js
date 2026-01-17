// Sample data structure for the Smart Attendance System

// User Schema
export const userSchema = {
  id: 'string',           // Unique identifier
  name: 'string',         // Full name
  email: 'string',        // Email address
  faceDescriptor: 'array | null',  // Face descriptor array (128 values) or null if not registered
  registeredAt: 'ISO 8601 date string'  // Registration timestamp
};

// Attendance Record Schema
export const attendanceSchema = {
  userId: 'string',       // Reference to user ID
  userName: 'string',     // User's name (for quick access)
  timestamp: 'ISO 8601 date string',  // When attendance was marked
  status: 'string'        // Status: 'Present', 'Absent', etc.
};

// Sample Users Data
export const sampleUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    faceDescriptor: null,
    registeredAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    faceDescriptor: null,
    registeredAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    faceDescriptor: null,
    registeredAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Bob Williams',
    email: 'bob@example.com',
    faceDescriptor: null,
    registeredAt: new Date().toISOString()
  }
];

// Sample Attendance Records
export const sampleAttendance = [
  {
    userId: '1',
    userName: 'John Doe',
    timestamp: new Date().toISOString(),
    status: 'Present'
  },
  {
    userId: '2',
    userName: 'Jane Smith',
    timestamp: new Date().toISOString(),
    status: 'Present'
  }
];

// Storage Keys
export const STORAGE_KEYS = {
  USERS: 'smart_attendance_users',
  ATTENDANCE: 'smart_attendance_records',
  AUTH: 'isAuthenticated',
  USER: 'user'
};
