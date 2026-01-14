# How to Add This Code to VS Code

This guide will walk you through step-by-step instructions to get the Smart Attendance System code into VS Code and running on your computer.

## Prerequisites

Before you start, make sure you have:
- [ ] **VS Code** installed ([Download here](https://code.visualstudio.com/))
- [ ] **Node.js** (version 16+) installed ([Download here](https://nodejs.org/))
- [ ] **Git** installed ([Download here](https://git-scm.com/))
- [ ] A **webcam** connected to your computer

## Step 1: Clone the Repository

### Option A: Using VS Code's Built-in Git

1. Open **VS Code**
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. Type `Git: Clone` and press Enter
4. Paste this URL: `https://github.com/ameenmohd261/SmartAttendance.git`
5. Choose a folder location on your computer
6. Click "Open" when prompted

### Option B: Using Terminal/Command Prompt

1. Open Terminal (Mac/Linux) or Command Prompt (Windows)
2. Navigate to where you want to save the project:
   ```bash
   cd Documents
   ```
3. Clone the repository:
   ```bash
   git clone https://github.com/ameenmohd261/SmartAttendance.git
   ```
4. Open the folder in VS Code:
   ```bash
   cd SmartAttendance
   code .
   ```

## Step 2: Install Dependencies

1. In VS Code, open the **Terminal**:
   - Menu: `Terminal > New Terminal`
   - Or press: `Ctrl+` ` (backtick) on Windows/Linux or `Cmd+` ` on Mac

2. In the terminal, run:
   ```bash
   npm install
   ```

3. Wait for all packages to install (this may take 1-2 minutes)

## Step 3: Download Face Recognition Models

The face recognition feature requires model files. Run one of these commands:

### On Windows:
```bash
download-models.bat
```

### On Mac/Linux:
```bash
./download-models.sh
```

### If Scripts Don't Work:
Manually download models:
1. Go to: https://github.com/justadudewhohacks/face-api.js/tree/master/weights
2. Download these files to `public/models/` folder:
   - `tiny_face_detector_model-weights_manifest.json`
   - `tiny_face_detector_model-shard1`
   - `face_landmark_68_model-weights_manifest.json`
   - `face_landmark_68_model-shard1`
   - `face_recognition_model-weights_manifest.json`
   - `face_recognition_model-shard1`
   - `face_recognition_model-shard2`
   - `face_expression_model-weights_manifest.json`
   - `face_expression_model-shard1`

## Step 4: Configure Environment (Optional)

1. Copy the environment template:
   ```bash
   cp .env.template .env
   ```

2. Edit `.env` file if you want to change default credentials:
   ```env
   VITE_ADMIN_USERNAME=admin
   VITE_ADMIN_PASSWORD=admin123
   ```

## Step 5: Start the Development Server

In the VS Code terminal, run:
```bash
npm run dev
```

You should see:
```
VITE v5.4.21  ready in 171 ms
➜  Local:   http://localhost:3000/
```

## Step 6: Open in Browser

1. Hold `Ctrl` (Windows/Linux) or `Cmd` (Mac) and **click** on `http://localhost:3000/`
   
   OR

2. Open your browser and go to: `http://localhost:3000`

## Step 7: Login to the System

Use the default credentials:
- **Username**: `admin`
- **Password**: `admin123`

## Project Structure in VS Code

Once opened, you'll see this file structure:

```
SmartAttendance/
├── 📁 public/
│   └── 📁 models/          # Face recognition models
├── 📁 src/
│   ├── 📁 components/      # React components
│   │   ├── Login.jsx       # Login page
│   │   ├── Dashboard.jsx   # Dashboard page
│   │   └── AttendanceCapture.jsx  # Face recognition page
│   ├── 📁 utils/           # Helper functions
│   │   ├── AuthContext.jsx
│   │   ├── storage.js
│   │   └── faceRecognition.js
│   ├── App.jsx             # Main app
│   └── main.jsx            # Entry point
├── 📄 package.json         # Dependencies
├── 📄 README.md            # Documentation
└── 📄 vite.config.js       # Build config
```

## Recommended VS Code Extensions

Install these extensions for better development experience:

1. **ES7+ React/Redux/React-Native snippets**
   - ID: `dsznajder.es7-react-js-snippets`

2. **Prettier - Code formatter**
   - ID: `esbenp.prettier-vscode`

3. **ESLint**
   - ID: `dbaeumer.vscode-eslint`

4. **Auto Rename Tag**
   - ID: `formulahendry.auto-rename-tag`

### How to Install Extensions:

1. Click the Extensions icon (🔲) in VS Code sidebar
2. Search for the extension name
3. Click "Install"

## Common Commands

### Start Development Server:
```bash
npm run dev
```

### Build for Production:
```bash
npm run build
```

### Preview Production Build:
```bash
npm run preview
```

### Stop the Server:
Press `Ctrl+C` in the terminal

## Troubleshooting

### Issue: "npm not found"
**Solution**: Install Node.js from https://nodejs.org/

### Issue: "Port 3000 already in use"
**Solution**: 
1. Stop other apps using port 3000
2. Or change port in `vite.config.js`:
   ```javascript
   server: {
     port: 3001  // Change to different port
   }
   ```

### Issue: "Webcam not working"
**Solution**:
1. Allow camera permissions in browser
2. Check if another app is using the camera
3. Make sure you're using HTTPS or localhost

### Issue: "Models not loading"
**Solution**:
1. Verify files exist in `public/models/` folder
2. Re-run the download script
3. Check browser console for errors

## Next Steps

After successful setup:

1. **Register Faces**:
   - Go to "Mark Attendance" page
   - Click "Register Face" mode
   - Select a user from dropdown
   - Position your face and click "Register Face"

2. **Mark Attendance**:
   - Ensure "Mark Attendance" mode is selected
   - Position your face in camera
   - Click "Mark Attendance"

3. **View Records**:
   - Go to Dashboard
   - Select date to filter records
   - Export to CSV if needed

## Keyboard Shortcuts in VS Code

- **Open Terminal**: `Ctrl+` ` (backtick)
- **Open File**: `Ctrl+P`
- **Search in Files**: `Ctrl+Shift+F`
- **Format Code**: `Shift+Alt+F`
- **Save All**: `Ctrl+K, S`
- **Toggle Sidebar**: `Ctrl+B`

## Additional Resources

- **Full Documentation**: See `README.md`
- **Quick Start**: See `QUICKSTART.md`
- **Deployment Guide**: See `DEPLOYMENT.md`
- **Contributing**: See `CONTRIBUTING.md`

## Need Help?

If you encounter issues:
1. Check the browser console for errors (F12)
2. Check the VS Code terminal for error messages
3. Review the documentation files
4. Create an issue on GitHub

---

## Summary of Commands

```bash
# Clone repository
git clone https://github.com/ameenmohd261/SmartAttendance.git
cd SmartAttendance

# Open in VS Code
code .

# Install dependencies
npm install

# Download models (Windows)
download-models.bat

# Download models (Mac/Linux)
./download-models.sh

# Start development server
npm run dev

# Open browser at http://localhost:3000
# Login with admin/admin123
```

That's it! You should now have the Smart Attendance System running in VS Code. 🎉
