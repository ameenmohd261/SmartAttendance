@echo off
REM Script to download face-api.js models for Windows
REM Run this script from the project root directory

echo Creating models directory...
if not exist "public\models" mkdir public\models

echo Downloading face-api.js models...

cd public\models

set BASE_URL=https://github.com/justadudewhohacks/face-api.js/raw/master/weights

REM Download tiny face detector model
echo Downloading tiny face detector...
curl -L -o tiny_face_detector_model-weights_manifest.json "%BASE_URL%/tiny_face_detector_model-weights_manifest.json"
curl -L -o tiny_face_detector_model-shard1 "%BASE_URL%/tiny_face_detector_model-shard1"

REM Download face landmark 68 model
echo Downloading face landmark 68 model...
curl -L -o face_landmark_68_model-weights_manifest.json "%BASE_URL%/face_landmark_68_model-weights_manifest.json"
curl -L -o face_landmark_68_model-shard1 "%BASE_URL%/face_landmark_68_model-shard1"

REM Download face recognition model
echo Downloading face recognition model...
curl -L -o face_recognition_model-weights_manifest.json "%BASE_URL%/face_recognition_model-weights_manifest.json"
curl -L -o face_recognition_model-shard1 "%BASE_URL%/face_recognition_model-shard1"
curl -L -o face_recognition_model-shard2 "%BASE_URL%/face_recognition_model-shard2"

REM Download face expression model
echo Downloading face expression model...
curl -L -o face_expression_model-weights_manifest.json "%BASE_URL%/face_expression_model-weights_manifest.json"
curl -L -o face_expression_model-shard1 "%BASE_URL%/face_expression_model-shard1"

cd ..\..

echo.
echo All models downloaded successfully!
echo Models are located in: public\models\
echo.
echo You can now run the application with: npm run dev
pause
