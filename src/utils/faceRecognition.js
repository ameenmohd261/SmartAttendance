import * as faceapi from 'face-api.js';

let modelsLoaded = false;

// Load face detection models
export const loadModels = async () => {
  if (modelsLoaded) return;
  
  const MODEL_URL = process.env.PUBLIC_URL + '/models';
  
  try {
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);
    modelsLoaded = true;
    console.log('Face detection models loaded successfully');
  } catch (error) {
    console.error('Error loading face detection models:', error);
    throw new Error('Failed to load face detection models. Please ensure models are in the public/models directory.');
  }
};

// Detect face from video element
export const detectFace = async (videoElement) => {
  if (!videoElement) return null;
  
  const detection = await faceapi
    .detectSingleFace(videoElement, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()
    .withFaceDescriptor();
    
  return detection;
};

// Compare two face descriptors
export const compareFaces = (descriptor1, descriptor2, threshold = 0.6) => {
  if (!descriptor1 || !descriptor2) return false;
  
  const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
  return distance < threshold;
};

// Draw face detection on canvas
export const drawDetection = (canvas, detection, label = '') => {
  if (!canvas || !detection) return;
  
  const dims = faceapi.matchDimensions(canvas, canvas, true);
  const resizedDetection = faceapi.resizeResults(detection, dims);
  
  faceapi.draw.drawDetections(canvas, resizedDetection);
  faceapi.draw.drawFaceLandmarks(canvas, resizedDetection);
  
  if (label) {
    const drawBox = new faceapi.draw.DrawBox(resizedDetection.detection.box, { label });
    drawBox.draw(canvas);
  }
};

// Get user media (camera access)
export const startVideo = async (videoElement) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480 }
    });
    videoElement.srcObject = stream;
    return stream;
  } catch (error) {
    console.error('Error accessing camera:', error);
    throw new Error('Failed to access camera. Please ensure camera permissions are granted.');
  }
};

// Stop video stream
export const stopVideo = (stream) => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
};

// Storage helpers
export const saveUserData = (name, descriptor) => {
  const users = getUsersData();
  users[name] = Array.from(descriptor);
  localStorage.setItem('registeredUsers', JSON.stringify(users));
};

export const getUsersData = () => {
  const data = localStorage.getItem('registeredUsers');
  return data ? JSON.parse(data) : {};
};

export const saveAttendance = (name) => {
  const attendance = getAttendanceData();
  const timestamp = new Date().toISOString();
  attendance.push({ name, timestamp });
  localStorage.setItem('attendanceRecords', JSON.stringify(attendance));
};

export const getAttendanceData = () => {
  const data = localStorage.getItem('attendanceRecords');
  return data ? JSON.parse(data) : [];
};

export const clearAllData = () => {
  localStorage.removeItem('registeredUsers');
  localStorage.removeItem('attendanceRecords');
};
