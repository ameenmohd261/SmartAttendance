# Smart Attendance System with Face Recognition

A modern, fully functional smart attendance management system built with React.js featuring real-time face recognition capabilities using Face-api.js. The system provides an intuitive interface for marking attendance, managing users, and exporting attendance records.

## 🌟 Key Features

### 1. **Face Recognition Module**
- Real-time face detection and recognition using Face-api.js (TensorFlow.js based)
- Webcam integration for capturing faces
- Face registration for new users
- High accuracy face matching with configurable threshold

### 2. **User Roles and Authentication**
- Secure admin login system
- Protected routes requiring authentication
- Session management with localStorage

### 3. **Dashboard**
- Comprehensive statistics overview:
  - Total users count
  - Registered faces count
  - Total attendance records
  - Today's attendance count
- Date-based attendance records viewing
- Complete user list with registration status
- Real-time data updates

### 4. **Attendance Capture Page**
- Real-time webcam integration
- Two modes:
  - **Mark Attendance**: Automatically recognize and mark attendance
  - **Register Face**: Register new faces for users
- Visual feedback with face detection overlay
- Error handling for webcam access and face detection failures

### 5. **Data Management**
- Local JSON-based storage using localStorage
- User information storage
- Attendance logs with timestamps
- CSV export functionality for attendance records
- Sample data initialization

### 6. **UI & UX Design**
- Fully responsive design (mobile and desktop compatible)
- Modern gradient-based styling
- Smooth transitions and animations
- User-friendly alert system
- Accessible form controls

### 7. **Error Handling**
- Unrecognized face detection
- Webcam access permission failures
- Model loading errors
- Duplicate attendance prevention

## 🛠️ Tech Stack

- **React 18.2**: Modern UI components with hooks
- **Vite**: Fast build tool and development server
- **React Router DOM 6**: Client-side routing
- **Face-api.js 0.22**: Face detection and recognition
- **React Webcam 7.1**: Webcam integration
- **File-saver**: CSV export functionality
- **PapaParse**: CSV data handling
- **CSS3**: Modern styling with gradients and animations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (version 16 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- A modern web browser (Chrome, Firefox, Edge, or Safari)
- A working webcam

## 🚀 Getting Started

### Step 1: Clone the Repository

```bash
git clone https://github.com/ameenmohd261/SmartAttendance.git
cd SmartAttendance
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React and React DOM
- React Router DOM
- Face-api.js
- React Webcam
- File-saver and PapaParse
- Vite and build tools

### Step 3: Download Face Recognition Models

The face recognition models need to be downloaded and placed in the `public/models` directory:

```bash
# Create models directory
mkdir -p public/models

# Download face-api.js models from GitHub
# You can download from: https://github.com/justadudewhohacks/face-api.js/tree/master/weights

# Required models:
# - tiny_face_detector_model-weights_manifest.json
# - tiny_face_detector_model-shard1
# - face_landmark_68_model-weights_manifest.json
# - face_landmark_68_model-shard1
# - face_recognition_model-weights_manifest.json
# - face_recognition_model-shard1 & shard2
# - face_expression_model-weights_manifest.json
# - face_expression_model-shard1
```

Alternatively, you can download all models at once:

```bash
# Using wget (Linux/Mac)
cd public
mkdir models
cd models
wget https://github.com/justadudewhohacks/face-api.js/raw/master/weights/tiny_face_detector_model-weights_manifest.json
wget https://github.com/justadudewhohacks/face-api.js/raw/master/weights/tiny_face_detector_model-shard1
wget https://github.com/justadudewhohacks/face-api.js/raw/master/weights/face_landmark_68_model-weights_manifest.json
wget https://github.com/justadudewhohacks/face-api.js/raw/master/weights/face_landmark_68_model-shard1
wget https://github.com/justadudewhohacks/face-api.js/raw/master/weights/face_recognition_model-weights_manifest.json
wget https://github.com/justadudewhohacks/face-api.js/raw/master/weights/face_recognition_model-shard1
wget https://github.com/justadudewhohacks/face-api.js/raw/master/weights/face_recognition_model-shard2
wget https://github.com/justadudewhohacks/face-api.js/raw/master/weights/face_expression_model-weights_manifest.json
wget https://github.com/justadudewhohacks/face-api.js/raw/master/weights/face_expression_model-shard1
```

### Step 4: Configure Environment Variables (Optional)

Copy the `.env.template` file to `.env` and customize if needed:

```bash
cp .env.template .env
```

Edit `.env` to change default credentials or settings:

```env
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=admin123
VITE_APP_NAME=Smart Attendance System
VITE_FACE_DETECTION_CONFIDENCE=0.5
VITE_FACE_MATCH_THRESHOLD=0.6
```

### Step 5: Start Development Server

```bash
npm run dev
```

Or alternatively:

```bash
npm start
```

The application will start at `http://localhost:3000`

### Step 6: Access the Application

1. Open your browser and navigate to `http://localhost:3000`
2. You'll be redirected to the login page
3. Use the default credentials:
   - **Username**: `admin`
   - **Password**: `admin123`
4. After login, you'll see the Dashboard

## 📱 VS Code Setup Guide

### Recommended VS Code Extensions

1. **ES7+ React/Redux/React-Native snippets** - Syntax shortcuts
2. **Prettier - Code formatter** - Consistent code formatting
3. **ESLint** - Code linting
4. **Auto Rename Tag** - Automatically rename paired HTML/XML tags
5. **Path Intellisense** - Autocomplete filenames

### VS Code Settings for this Project

Create a `.vscode/settings.json` file:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.tabSize": 2,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.exclude": {
    "**/node_modules": true,
    "**/dist": true
  }
}
```

### Opening Project in VS Code

```bash
# Open project directory in VS Code
code .
```

### Running from VS Code Terminal

1. Open integrated terminal: `Ctrl + `` (backtick) or `View > Terminal`
2. Run commands:
   ```bash
   npm install
   npm run dev
   ```

## 🏗️ Build for Production

### Step 1: Create Production Build

```bash
npm run build
```

This creates an optimized production build in the `dist` directory.

### Step 2: Preview Production Build Locally

```bash
npm run preview
```

This serves the production build locally for testing.

### Step 3: Deploy to Production

#### Option 1: Deploy to Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy --prod --dir=dist
   ```

#### Option 2: Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel --prod
   ```

#### Option 3: Deploy to GitHub Pages

1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add to package.json:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. Deploy:
   ```bash
   npm run deploy
   ```

#### Option 4: Traditional Web Server (Apache/Nginx)

1. Build the project:
   ```bash
   npm run build
   ```

2. Copy the `dist` folder contents to your web server's public directory:
   ```bash
   cp -r dist/* /var/www/html/
   ```

3. Configure your web server to serve the SPA correctly (redirect all routes to index.html)

## 📂 Project Structure

```
SmartAttendance/
├── public/
│   └── models/              # Face-api.js model files (not in repo)
├── src/
│   ├── components/          # React components
│   │   ├── Login.jsx        # Login page component
│   │   ├── Login.css        # Login page styles
│   │   ├── Dashboard.jsx    # Dashboard component
│   │   ├── Dashboard.css    # Dashboard styles
│   │   ├── AttendanceCapture.jsx  # Face recognition component
│   │   └── AttendanceCapture.css  # Attendance capture styles
│   ├── utils/               # Utility functions
│   │   ├── AuthContext.jsx  # Authentication context
│   │   ├── storage.js       # LocalStorage management
│   │   └── faceRecognition.js  # Face recognition utilities
│   ├── data/                # Data schemas and samples
│   │   └── schema.js        # Data structure definitions
│   ├── App.jsx              # Main App component
│   ├── App.css              # App styles
│   ├── main.jsx             # Application entry point
│   └── index.css            # Global styles
├── .env.template            # Environment variables template
├── .gitignore               # Git ignore rules
├── index.html               # HTML template
├── package.json             # Project dependencies
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

## 💾 Database Schema

### Users Collection/Table

```javascript
{
  id: String,              // Unique identifier
  name: String,            // Full name of user
  email: String,           // Email address
  faceDescriptor: Array,   // 128-dimensional face descriptor array
  registeredAt: DateTime   // Registration timestamp
}
```

### Attendance Records Collection/Table

```javascript
{
  userId: String,          // Reference to user ID
  userName: String,        // User's name
  timestamp: DateTime,     // When attendance was marked
  status: String           // 'Present', 'Absent', etc.
}
```

## 🔧 Configuration

### Face Recognition Settings

Adjust face detection and matching parameters in `.env`:

- `VITE_FACE_DETECTION_CONFIDENCE`: Minimum confidence for face detection (0-1)
- `VITE_FACE_MATCH_THRESHOLD`: Distance threshold for face matching (lower = stricter)

### Admin Credentials

Change admin credentials in `.env`:

- `VITE_ADMIN_USERNAME`: Admin username
- `VITE_ADMIN_PASSWORD`: Admin password

**Important**: In production, use environment variables on your hosting platform instead of the `.env` file.

## 🎯 Usage Guide

### First Time Setup

1. **Login**: Use admin credentials to access the system
2. **Register Faces**: 
   - Go to "Mark Attendance" page
   - Click "Register Face" mode
   - Select a user from dropdown
   - Position face in camera and click "Register Face"
   - Repeat for all users

### Marking Attendance

1. Go to "Mark Attendance" page
2. Ensure "Mark Attendance" mode is selected
3. Position face in camera
4. Click "Mark Attendance" button
5. System will recognize face and mark attendance

### Viewing Records

1. Go to Dashboard
2. Select date from date picker
3. View attendance records for that date
4. Click "Export to CSV" to download records

## 🐛 Troubleshooting

### Webcam Not Working
- Check browser permissions for camera access
- Ensure no other application is using the webcam
- Try a different browser

### Face Recognition Models Not Loading
- Verify models are in `public/models/` directory
- Check browser console for specific errors
- Ensure you're running the dev server (models must be served)

### Face Not Recognized
- Ensure face is registered first
- Check lighting conditions
- Face should be clearly visible and front-facing
- Try adjusting `VITE_FACE_MATCH_THRESHOLD`

### Attendance Already Marked
- System prevents duplicate attendance per day
- Check Dashboard to verify existing records

## 🔐 Security Considerations

1. **Authentication**: Current implementation uses simple client-side authentication. For production:
   - Implement server-side authentication
   - Use JWT tokens
   - Add password hashing

2. **Data Storage**: Currently uses localStorage. For production:
   - Migrate to secure database (MongoDB, Firebase, PostgreSQL)
   - Implement API endpoints
   - Add data encryption

3. **Environment Variables**: 
   - Never commit `.env` file to version control
   - Use environment variables on hosting platform
   - Rotate credentials regularly

## 🚀 Future Enhancements

- [ ] Backend API integration (Node.js/Express)
- [ ] Database integration (MongoDB/Firebase)
- [ ] Multiple user roles (Admin, Teacher, Student)
- [ ] Email notifications for attendance
- [ ] Advanced analytics and reporting
- [ ] Mobile application (React Native)
- [ ] Multi-language support
- [ ] Bulk user import/export
- [ ] Attendance history graphs and charts
- [ ] Integration with existing student management systems

## 📄 License

This project is open source and available under the MIT License.

## 👥 Support

For issues, questions, or contributions:
- Create an issue on GitHub
- Submit pull requests for improvements
- Contact: [Your contact information]

## 🙏 Acknowledgments

- Face-api.js for face recognition capabilities
- React team for the amazing framework
- Vite for the fast build tool
- All contributors to the project dependencies
