#!/bin/bash

# PyUnit 2.0 - Build Script
# This script builds Docker image and publishes it to Docker Hub
# Run this on your development machine (Windows/Linux/macOS)

set -e

echo "========================================="
echo "PyUnit 2.0 - Docker Image Build Script"
echo "========================================="
echo ""

# Configuration - CHANGE THIS!
DOCKER_USERNAME="xatang"  # Your Docker Hub username
DOCKER_IMAGE="${DOCKER_USERNAME}/pyunit"
VERSION="latest"  # or use version like "2.0.2"

echo "Docker Image: ${DOCKER_IMAGE}:${VERSION}"
echo ""

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed!"
    echo "Please install Docker Desktop: https://docs.docker.com/get-docker/"
    exit 1
fi

echo "✓ Docker is installed"
echo ""

# Check if logged in to Docker Hub
echo "Checking Docker Hub authentication..."
if ! docker info | grep -q "Username"; then
    echo "⚠️  Not logged in to Docker Hub"
    echo "Please login:"
    docker login
    if [ $? -ne 0 ]; then
        echo "❌ Docker login failed"
        exit 1
    fi
fi

echo "✓ Logged in to Docker Hub"
echo ""

# Setup buildx for multi-platform
echo "========================================="
echo "Setting up multi-platform builder..."
echo "========================================="
echo ""

# Create builder if not exists
if ! docker buildx ls | grep -q "multiplatform"; then
    docker buildx create --name multiplatform --driver docker-container --bootstrap
fi

# Use the builder
docker buildx use multiplatform

echo "✓ Multi-platform builder ready"
echo ""

# Build image for multiple platforms
echo "========================================="
echo "Building Docker image for multiple platforms..."
echo "========================================="
echo ""

docker buildx build \
    --platform linux/amd64,linux/arm64,linux/arm/v7,linux/arm/v8 \
    -t ${DOCKER_IMAGE}:${VERSION} \
    --push \
    .

if [ $? -ne 0 ]; then
    echo ""
    echo "❌ Build failed!"
    exit 1
fi

echo ""
echo "✓ Build successful!"
echo ""

echo "========================================="
echo "✓ Successfully published!"
echo "========================================="
echo ""
echo "Image available at:"
echo "  https://hub.docker.com/r/${DOCKER_USERNAME}/pyunit"
echo ""
echo "Image supports:"
echo "  - linux/amd64 (x86_64)"
echo "  - linux/arm64 (ARM 64-bit)"
echo "  - linux/arm/v7 (ARMv7 32-bit)"
echo "  - linux/arm/v8 (ARMv8 32-bit)"
echo ""
echo "Users can install with:"
echo "  ./install.sh"
echo ""

echo "========================================="
echo "Build completed!"
echo "========================================="
