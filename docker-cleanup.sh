#!/bin/bash

# Step 1: Prune unused containers
echo "Pruning unused containers..."
docker container prune -f
if [ $? -eq 0 ]; then
    echo "Unused containers pruned successfully."
else
    echo "Failed to prune containers. Please check your Docker setup."
    exit 1
fi

# Step 2: Prune unused images
echo "Pruning unused containers..."
docker image prune -f
if [ $? -eq 0 ]; then
    echo "Unused images pruned successfully."
else
    echo "Failed to prune containers. Please check your Docker setup."
    exit 1
fi

# Step 3: Remove the 'result-app' Docker image
echo "Removing 'result-app' Docker image..."
docker image rm result-app -f
if [ $? -eq 0 ]; then
    echo "Image 'result-app' removed successfully."
else
    echo "Failed to remove the 'result-app' image. It may not exist."
fi

# Step 4: Bring up services using Docker Compose
echo "Bringing up services with Docker Compose..."
docker compose up --build
if [ $? -eq 0 ]; then
    echo "Services started successfully."
else
    echo "Failed to start services with Docker Compose."
    exit 1
fi
