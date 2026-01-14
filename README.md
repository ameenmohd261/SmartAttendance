# Smart Attendance Management System with Face Recognition

A professional, feature-rich face recognition-based attendance management system built with React. This application uses face-api.js (powered by TensorFlow.js) for real-time face detection and recognition directly in the browser.

## 🌟 Key Features

- **Real-time Face Recognition**: Instant face detection and recognition using your device camera
- **User Registration**: Easy registration system to capture and store face data
- **Attendance Tracking**: Automatic attendance marking with timestamp
- **Attendance Records**: View all attendance records with detailed timestamps
- **Export Functionality**: Export attendance data to CSV format
- **Responsive Design**: Clean and modern UI that works on all devices
- **Browser-based**: No server required - everything runs in your browser
- **Privacy-focused**: All data stored locally using browser's localStorage

## 🛠️ Tech Stack

- **React 19**: Latest React for building UI components
- **face-api.js**: Face detection and recognition library built on TensorFlow.js
- **JavaScript ES6+**: Modern JavaScript for logic implementation
- **CSS3**: Custom styling with gradients and animations
- **HTML5**: Semantic markup and Canvas API

## 📋 Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A device with a camera
- Modern web browser (Chrome, Firefox, Safari, or Edge)

## 🚀 How to Run Locally

### 1. Clone Repository

```bash
git clone https://github.com/ameenmohd261/SmartAttendance.git
cd SmartAttendance
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Download Face Detection Models

The application requires face-api.js models to function. Run the provided script:

```bash
./download-models.sh
```

**Or manually download:**
1. Create a `models` folder in the `public` directory
2. Download models from [face-api.js-models repository](https://github.com/justadudewhohacks/face-api.js-models)
3. Copy these files to `public/models`:
   - `tiny_face_detector_model-weights_manifest.json`
   - `tiny_face_detector_model-shard1`
   - `face_landmark_68_model-weights_manifest.json`
   - `face_landmark_68_model-shard1`
   - `face_recognition_model-weights_manifest.json`
   - `face_recognition_model-shard1`
   - `face_recognition_model-shard2`
   - `face_expression_model-weights_manifest.json`
   - `face_expression_model-shard1`

### 4. Start Application

```bash
npm start
```

The application will open at `http://localhost:3000`

## 📱 How to Use

### Register a New User

1. Click "Register New User" section
2. Click "Start Camera" to enable your camera
3. Enter your full name
4. Position your face in front of the camera
5. Click "Register Face" to save your face data

### Mark Attendance

1. Go to "Mark Attendance" section
2. Click "Start Camera"
3. Position your face in front of the camera
4. Click "Mark My Attendance"
5. System will recognize your face and mark attendance automatically

### View Records

- All attendance records are displayed in the "Attendance Records" section
- Records show name, date, and time
- Click "Export to CSV" to download records

## 🏗️ Project Structure

```
SmartAttendance/
├── public/
│   ├── index.html              # Main HTML file
│   ├── manifest.json           # PWA manifest
│   └── models/                 # Face detection models (to be downloaded)
├── src/
│   ├── components/
│   │   ├── Registration.js     # User registration component
│   │   ├── Attendance.js       # Attendance marking component
│   │   └── AttendanceRecords.js # Records display component
│   ├── styles/
│   │   ├── index.css          # Global styles
│   │   └── App.css            # Application styles
│   ├── utils/
│   │   └── faceRecognition.js # Face detection and recognition utilities
│   ├── App.js                 # Main application component
│   └── index.js               # Application entry point
├── package.json               # Dependencies and scripts
├── download-models.sh         # Script to download models
└── README.md                  # This file
```

## 🔒 Privacy & Data Storage

- All face data is stored locally in your browser's localStorage
- No data is sent to any external server
- Face descriptors are mathematical representations (not actual images)
- You can clear all data by clearing your browser's localStorage

## 🎨 Features in Detail

### Face Registration
- Captures face data using device camera
- Creates a mathematical descriptor of the face
- Stores descriptor with user's name
- Provides visual feedback during registration

### Face Recognition
- Compares detected face against registered faces
- Uses Euclidean distance for matching
- Configurable similarity threshold
- Real-time recognition with instant feedback

### Attendance Management
- Automatic timestamp recording
- Sorted records (most recent first)
- CSV export functionality
- Persistent storage across sessions

## 🔧 Configuration

You can adjust the face recognition threshold in `src/utils/faceRecognition.js`:

```javascript
// Lower value = stricter matching (default: 0.6)
export const compareFaces = (descriptor1, descriptor2, threshold = 0.6) => {
  // ...
}
```

## 🐛 Troubleshooting

### Camera Not Working
- Ensure browser has camera permissions
- Check if another application is using the camera
- Try using HTTPS (required by some browsers)

### Face Not Detected
- Ensure good lighting
- Position face clearly in frame
- Remove glasses or face coverings if possible

### Models Not Loading
- Verify models are in `public/models` directory
- Check browser console for specific errors
- Ensure all model files are downloaded correctly

## 📦 Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 🚀 Future Enhancements

- [ ] Backend integration (Node.js/Firebase)
- [ ] Database storage for attendance records
- [ ] User authentication system
- [ ] Multiple face registration per user
- [ ] Advanced analytics and reporting
- [ ] Email notifications
- [ ] Mobile app version
- [ ] Geolocation-based attendance
- [ ] QR code backup authentication

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Developer

Developed with expertise in modern web technologies, focusing on user experience and security.

## 🙏 Acknowledgments

- [face-api.js](https://github.com/justadudewhohacks/face-api.js) for the amazing face recognition library
- [TensorFlow.js](https://www.tensorflow.org/js) for machine learning capabilities
- React team for the excellent framework

---

**Note**: This application requires a modern browser with camera access and JavaScript enabled. For best results, use in well-lit environments with clear facial visibility.
