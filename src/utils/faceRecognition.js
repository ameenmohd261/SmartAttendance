import * as faceapi from 'face-api.js';

let modelsLoaded = false;

// Load face-api models
export const loadModels = async () => {
  if (modelsLoaded) return;
  
  try {
    const MODEL_URL = '/models';
    
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);
    
    modelsLoaded = true;
    return true;
  } catch (error) {
    console.error('Error loading face-api models:', error);
    throw new Error('Failed to load face recognition models');
  }
};

// Detect face in image
export const detectFace = async (imageElement) => {
  try {
    const detection = await faceapi
      .detectSingleFace(imageElement, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();
    
    return detection;
  } catch (error) {
    console.error('Error detecting face:', error);
    return null;
  }
};

// Compare two face descriptors
export const compareFaces = (descriptor1, descriptor2, threshold = 0.6) => {
  // Validate inputs
  if (!descriptor1 || !descriptor2) return false;
  
  // Ensure descriptors are valid arrays
  if (!(descriptor1 instanceof Float32Array || Array.isArray(descriptor1)) ||
      !(descriptor2 instanceof Float32Array || Array.isArray(descriptor2))) {
    console.error('Invalid face descriptor type');
    return false;
  }
  
  const distance = faceapi.euclideanDistance(descriptor1, descriptor2);
  return distance < threshold;
};

// Find matching face from a list of known faces
export const findMatchingFace = (detectedDescriptor, knownFaces, threshold = 0.6) => {
  // Validate inputs
  if (!detectedDescriptor || !knownFaces || knownFaces.length === 0) {
    return null;
  }
  
  // Validate descriptor type
  if (!(detectedDescriptor instanceof Float32Array || Array.isArray(detectedDescriptor))) {
    console.error('Invalid detected face descriptor type');
    return null;
  }
  
  let bestMatch = null;
  let bestDistance = Infinity;
  
  for (const knownFace of knownFaces) {
    if (!knownFace.faceDescriptor || !Array.isArray(knownFace.faceDescriptor)) {
      continue;
    }
    
    try {
      const distance = faceapi.euclideanDistance(
        detectedDescriptor,
        new Float32Array(knownFace.faceDescriptor)
      );
      
      if (distance < threshold && distance < bestDistance) {
        bestDistance = distance;
        bestMatch = {
          ...knownFace,
          confidence: 1 - distance
        };
      }
    } catch (error) {
      console.error('Error comparing face descriptors:', error);
      continue;
    }
  }
  
  return bestMatch;
};

// Draw detection box on canvas
export const drawDetection = (canvas, detection, label = '') => {
  const ctx = canvas.getContext('2d');
  
  if (!detection) return;
  
  const { x, y, width, height } = detection.detection.box;
  
  // Draw rectangle
  ctx.strokeStyle = '#00ff00';
  ctx.lineWidth = 3;
  ctx.strokeRect(x, y, width, height);
  
  // Draw label
  if (label) {
    ctx.fillStyle = '#00ff00';
    ctx.font = '18px Arial';
    ctx.fillRect(x, y - 30, width, 30);
    ctx.fillStyle = '#000';
    ctx.fillText(label, x + 5, y - 8);
  }
};

export const isModelsLoaded = () => modelsLoaded;
