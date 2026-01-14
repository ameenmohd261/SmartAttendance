#!/bin/bash

# Script to download face-api.js models
set -e  # Exit on error

echo "Downloading face-api.js models..."

# Create models directory if it doesn't exist
mkdir -p public/models

# Download models from the official repository
cd public/models

# Base URL for models
BASE_URL="https://raw.githubusercontent.com/justadudewhohacks/face-api.js-models/master"

# Function to download and verify
download_file() {
    local url=$1
    local filename=$(basename "$url")
    echo "Downloading $filename..."
    if curl -f -O "$url"; then
        echo "✓ $filename downloaded successfully"
    else
        echo "✗ Failed to download $filename"
        exit 1
    fi
}

# Download TinyFaceDetector models
echo "Downloading TinyFaceDetector models..."
download_file "$BASE_URL/tiny_face_detector/tiny_face_detector_model-weights_manifest.json"
download_file "$BASE_URL/tiny_face_detector/tiny_face_detector_model-shard1"

# Download FaceLandmark68 models
echo "Downloading FaceLandmark68 models..."
download_file "$BASE_URL/face_landmark_68/face_landmark_68_model-weights_manifest.json"
download_file "$BASE_URL/face_landmark_68/face_landmark_68_model-shard1"

# Download FaceRecognition models
echo "Downloading FaceRecognition models..."
download_file "$BASE_URL/face_recognition/face_recognition_model-weights_manifest.json"
download_file "$BASE_URL/face_recognition/face_recognition_model-shard1"
download_file "$BASE_URL/face_recognition/face_recognition_model-shard2"

# Download FaceExpression models
echo "Downloading FaceExpression models..."
download_file "$BASE_URL/face_expression/face_expression_model-weights_manifest.json"
download_file "$BASE_URL/face_expression/face_expression_model-shard1"

cd ../..

echo ""
echo "✅ All models downloaded successfully!"
echo "You can now run 'npm start' to start the application."
