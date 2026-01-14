#!/bin/bash

# Script to download face-api.js models

echo "Downloading face-api.js models..."

# Create models directory if it doesn't exist
mkdir -p public/models

# Download models from the official repository
cd public/models

# Base URL for models
BASE_URL="https://raw.githubusercontent.com/justadudewhohacks/face-api.js-models/master"

# Download TinyFaceDetector models
echo "Downloading TinyFaceDetector models..."
curl -O "$BASE_URL/tiny_face_detector/tiny_face_detector_model-weights_manifest.json"
curl -O "$BASE_URL/tiny_face_detector/tiny_face_detector_model-shard1"

# Download FaceLandmark68 models
echo "Downloading FaceLandmark68 models..."
curl -O "$BASE_URL/face_landmark_68/face_landmark_68_model-weights_manifest.json"
curl -O "$BASE_URL/face_landmark_68/face_landmark_68_model-shard1"

# Download FaceRecognition models
echo "Downloading FaceRecognition models..."
curl -O "$BASE_URL/face_recognition/face_recognition_model-weights_manifest.json"
curl -O "$BASE_URL/face_recognition/face_recognition_model-shard1"
curl -O "$BASE_URL/face_recognition/face_recognition_model-shard2"

# Download FaceExpression models
echo "Downloading FaceExpression models..."
curl -O "$BASE_URL/face_expression/face_expression_model-weights_manifest.json"
curl -O "$BASE_URL/face_expression/face_expression_model-shard1"

cd ../..

echo "✅ Models downloaded successfully!"
echo "You can now run 'npm start' to start the application."
