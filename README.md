# Smart Attendance Management System with Face Recognition

A modern, web-based attendance management system that uses face recognition technology to mark attendance. Built with React, TensorFlow.js, and modern web technologies.

![Login Page](https://github.com/user-attachments/assets/960cdc03-fcb9-4a4e-a822-b3db8e5bfe72)

## Features

### ✅ Completed Features

- **🔐 User Authentication**: Simple login system for admin access
- **📊 Dashboard**: Comprehensive attendance records display with filtering and statistics
- **📷 Face Capture & Recognition**: Real-time webcam integration with TensorFlow.js face detection
- **👥 Student Management**: Add, edit, and delete student records
- **📚 Class Management**: Create and manage different classes
- **👤 Face Registration**: Capture and store face data for registered students
- **📈 Attendance Tracking**: Automatic attendance marking using face recognition
- **📥 Export to CSV**: Download attendance records as CSV files
- **🎨 Modern UI**: Clean, responsive design with gradient themes
- **💾 Local Storage**: Data persistence using browser localStorage

![Dashboard](https://github.com/user-attachments/assets/9ca55329-cc4f-45ed-84a6-2f55843d7ce8)

## Tech Stack

- **Frontend**: React 19.x with functional components
- **Routing**: React Router DOM v7
- **Face Detection**: TensorFlow.js with MediaPipe Face Detection model
- **State Management**: React Context API
- **Styling**: Modern CSS with gradients and animations
- **Data Export**: PapaParse for CSV generation
- **Build Tool**: React Scripts (Create React App)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Modern web browser with webcam support
- HTTPS or localhost (required for webcam access)

## Installation & Setup

### 1. Clone Repository
\`\`\`bash
git clone https://github.com/ameenmohd261/SmartAttendance.git
cd SmartAttendance
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Start Development Server
\`\`\`bash
npm start
\`\`\`

The application will open at `http://localhost:3000`

### 4. Build for Production
\`\`\`bash
npm run build
\`\`\`

## Usage Guide

### Login
- **Username**: `admin`
- **Password**: `admin`

![Face Capture](https://github.com/user-attachments/assets/8eb387d7-3089-4dc3-9391-4b2283dcb1fa)

### Setting Up the System

1. **Add Classes** (Admin Settings → Classes Tab)
   - Navigate to Admin Settings
   - Click on "Classes" tab
   - Enter class name and click "Add Class"

2. **Register Students** (Admin Settings → Students Tab)
   - Go to Admin Settings
   - Fill in Student Name, Student ID, and select Class
   - Click "Add Student"

3. **Capture Face Data**
   - In the registered students list, click "Capture Face" button
   - Allow camera access when prompted
   - Position your face in the frame
   - Click "Capture" when ready
   - The face data will be stored for recognition

### Marking Attendance

1. Navigate to "Face Capture" from the dashboard
2. Click "Start Camera" to activate webcam
3. Position face in the camera frame
4. The system will automatically detect and recognize registered students
5. Click "Mark Attendance" when a student is recognized
6. Attendance is recorded with timestamp

### Viewing & Exporting Records

1. Go to Dashboard to view all attendance records
2. Use filters to search by:
   - Class
   - Student name
   - Date range
3. View statistics: Total records and Today's attendance
4. Click "Export to CSV" to download filtered records

## Project Structure

\`\`\`
SmartAttendance/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/          # Reusable React components (future)
│   ├── context/
│   │   └── AttendanceContext.js  # Global state management
│   ├── pages/
│   │   ├── Login.js         # Authentication page
│   │   ├── Dashboard.js     # Main dashboard with records
│   │   ├── FaceCapture.js   # Face recognition & attendance marking
│   │   └── Admin.js         # Admin settings for students/classes
│   ├── styles/              # CSS files for each component
│   ├── utils/
│   │   ├── faceDetection.js # TensorFlow.js face detection logic
│   │   └── exportUtils.js   # CSV export functionality
│   ├── App.js               # Main app component with routing
│   └── index.js             # React entry point
├── package.json
└── README.md
\`\`\`

## Features in Detail

### Face Detection
- Uses TensorFlow.js MediaPipe Face Detection model
- Real-time face detection with bounding boxes
- Keypoint detection for facial features
- Optimized for browser performance

### State Management
- Context API for global state
- LocalStorage for data persistence
- Automatic save on state changes
- Data includes: users, students, classes, attendance, face descriptors

### Security Notes
- Current implementation uses simple client-side authentication
- For production use, implement proper backend authentication
- Face data stored in localStorage (consider secure backend storage)
- Webcam access requires user permission

## Browser Compatibility

- Chrome/Edge (Recommended)
- Firefox
- Safari (macOS/iOS)
- Opera

**Note**: Webcam access requires HTTPS in production or localhost in development.

## Known Limitations

1. Face matching uses simple position/size comparison (enhance for production)
2. Face data stored in browser localStorage (limited storage)
3. Single-user authentication system (expand for multiple roles)
4. No backend database (data cleared on browser cache clear)

## Future Enhancements

- [ ] Backend API with database integration (MongoDB/PostgreSQL)
- [ ] Advanced face recognition with face embeddings
- [ ] Multi-user roles (Admin, Teacher, Student)
- [ ] Email notifications for attendance
- [ ] Mobile app version
- [ ] Advanced analytics and reporting
- [ ] Attendance statistics and graphs
- [ ] Integration with learning management systems
- [ ] Biometric backup authentication
- [ ] Cloud storage for face data

## Troubleshooting

### Camera Not Working
- Ensure browser has camera permissions
- Check if camera is being used by another application
- Use HTTPS or localhost for webcam access

### Face Detection Not Working
- Ensure good lighting conditions
- Face should be clearly visible and front-facing
- Wait for model to load (check browser console)

### Build Errors
- Clear node_modules: `rm -rf node_modules package-lock.json`
- Reinstall: `npm install`
- Clear cache: `npm cache clean --force`

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues and questions:
- Open an issue on GitHub
- Contact: ameenmohd261

## Acknowledgments

- TensorFlow.js team for the face detection models
- React team for the amazing framework
- MediaPipe for face detection technology
