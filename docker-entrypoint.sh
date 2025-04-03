#!/bin/bash
set -e

# Print useful information for debugging
echo "Starting container with user $(id)"

# Set correct permissions (readable and writable by current user)
# This is crucial for OpenShift compatibility where the container may run as an arbitrary user
if [ ! -d "/app/user_data" ]; then
  mkdir -p /app/user_data
  chmod -R 777 /app/user_data
fi

if [ ! -d "/app/learning_plans" ]; then
  mkdir -p /app/learning_plans
  chmod -R 777 /app/learning_plans
fi

if [ ! -d "/app/data" ]; then
  mkdir -p /app/data
  chmod -R 777 /app/data
fi

# Set environment variable to flag we're running in Rahti
export DEPLOYMENT_ENV=${DEPLOYMENT_ENV:-rahti}

# Start the application
exec uvicorn app:app --host 0.0.0.0 --port 8000