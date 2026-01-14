# Quick Start Guide for Smart Attendance System

## Prerequisites Check

Before starting, verify you have:
- [ ] Node.js installed (version 16 or higher)
- [ ] npm installed (comes with Node.js)
- [ ] A working webcam
- [ ] A modern web browser (Chrome, Firefox, Edge, or Safari)

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Download Face Recognition Models

#### On Linux/Mac:
```bash
./download-models.sh
```

#### On Windows:
```bash
download-models.bat
```

#### Manual Download (if scripts don't work):
Visit: https://github.com/justadudewhohacks/face-api.js/tree/master/weights

Download these files to `public/models/`:
- tiny_face_detector_model-weights_manifest.json
- tiny_face_detector_model-shard1
- face_landmark_68_model-weights_manifest.json
- face_landmark_68_model-shard1
- face_recognition_model-weights_manifest.json
- face_recognition_model-shard1
- face_recognition_model-shard2
- face_expression_model-weights_manifest.json
- face_expression_model-shard1

### 3. Configure Environment (Optional)

```bash
cp .env.template .env
```

Edit `.env` to customize settings.

### 4. Start Development Server

```bash
npm run dev
```

or

```bash
npm start
```

### 5. Access Application

Open your browser and go to: http://localhost:3000

### 6. Login

Use default credentials:
- Username: `admin`
- Password: `admin123`

## First Time Usage

1. **Register Faces**
   - Go to "Mark Attendance" page
   - Click "Register Face" mode
   - Select a user from dropdown
   - Position your face in the camera
   - Click "Register Face"

2. **Mark Attendance**
   - Go to "Mark Attendance" page
   - Ensure "Mark Attendance" mode is selected
   - Position your face in the camera
   - Click "Mark Attendance"

3. **View Records**
   - Go to Dashboard
   - Select a date to filter records
   - Click "Export to CSV" to download

## Common Issues

### Webcam not working?
- Check browser permissions for camera access
- Close other apps using the webcam

### Models not loading?
- Verify files in `public/models/` directory
- Check browser console for errors
- Try re-running the download script

### Face not recognized?
- Ensure face is registered first
- Check lighting conditions
- Face should be clearly visible

## Build for Production

```bash
npm run build
```

Output will be in `dist/` directory.

## Need Help?

Check the main README.md for detailed documentation and troubleshooting.
