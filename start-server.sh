#!/bin/bash

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start Express server
echo "Starting Express server..."
npm run server

# Start React client (in another terminal)
echo "Starting React client..."
npm run client
