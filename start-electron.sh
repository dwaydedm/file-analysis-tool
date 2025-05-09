#!/bin/bash

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start Electron app
echo "Starting Electron application..."
npm start
