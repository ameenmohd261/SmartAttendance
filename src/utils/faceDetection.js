import * as faceDetection from '@tensorflow-models/face-detection';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';

let detector = null;

export const initFaceDetection = async () => {
  try {
    if (!detector) {
      const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
      const detectorConfig = {
        runtime: 'tfjs',
      };
      detector = await faceDetection.createDetector(model, detectorConfig);
    }
    return detector;
  } catch (error) {
    console.error('Error initializing face detection:', error);
    throw error;
  }
};

export const detectFaces = async (videoElement) => {
  try {
    if (!detector) {
      await initFaceDetection();
    }
    const faces = await detector.estimateFaces(videoElement);
    return faces;
  } catch (error) {
    console.error('Error detecting faces:', error);
    return [];
  }
};

export const drawFaceBox = (canvas, faces) => {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  faces.forEach((face) => {
    const { xMin, yMin, width, height } = face.box;
    
    // Draw bounding box
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 3;
    ctx.strokeRect(xMin, yMin, width, height);

    // Draw keypoints if available
    if (face.keypoints) {
      ctx.fillStyle = '#ff0000';
      face.keypoints.forEach((keypoint) => {
        ctx.beginPath();
        ctx.arc(keypoint.x, keypoint.y, 3, 0, 2 * Math.PI);
        ctx.fill();
      });
    }
  });
};

// Simple face matching based on position and size similarity
export const matchFace = (currentFace, storedDescriptor) => {
  if (!currentFace || !storedDescriptor) return 0;
  
  // In a real application, you would use more sophisticated face embedding comparison
  // For now, we'll use a simple position and size-based matching
  const currentBox = currentFace.box;
  const storedBox = storedDescriptor.box;
  
  if (!storedBox) return 0;
  
  const centerXDiff = Math.abs(currentBox.xMin - storedBox.xMin);
  const centerYDiff = Math.abs(currentBox.yMin - storedBox.yMin);
  const widthDiff = Math.abs(currentBox.width - storedBox.width);
  const heightDiff = Math.abs(currentBox.height - storedBox.height);
  
  const totalDiff = centerXDiff + centerYDiff + widthDiff + heightDiff;
  const similarity = Math.max(0, 1 - totalDiff / 1000); // Normalize to 0-1
  
  return similarity;
};

export const findMatchingStudent = (currentFace, faceDescriptors, threshold = 0.6) => {
  let bestMatch = null;
  let bestScore = 0;

  Object.entries(faceDescriptors).forEach(([studentId, descriptor]) => {
    const score = matchFace(currentFace, descriptor);
    if (score > threshold && score > bestScore) {
      bestScore = score;
      bestMatch = studentId;
    }
  });

  return { studentId: bestMatch, confidence: bestScore };
};
