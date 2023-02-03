#!/bin/bash
# Run the app development server
echo '--------------------------------------------------------------------'
echo 'Stoppping & Removing Frontend container...'
echo '--------------------------------------------------------------------'
docker container stop babymed-frontend
docker container rm babymed-frontend
echo '--------------------------------------------------------------------'
echo 'Removing Frontend image...'
echo '--------------------------------------------------------------------'
docker rmi -f babymed/frontend:latest
echo '===================================================================='
echo 'Building Frontend image...'
echo '--------------------------------------------------------------------'
docker build -t babymed/frontend .
echo '--------------------------------------------------------------------'
