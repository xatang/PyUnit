#!/bin/bash
set -e

echo "========================================="
echo "PyUnit 2.0 - Uninstall Script"
echo "========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
CONTAINER_NAME="pyunit"
VOLUME_NAME="pyunit_pyunit_data"
NETWORK_NAME="pyunit_pyunit_network"
IMAGE_PREFIX="xatang/pyunit"

# Ask for confirmation
echo ""
echo -e "${YELLOW}WARNING: This will remove:${NC}"
echo "  - Docker container: $CONTAINER_NAME"
echo "  - Docker volume: $VOLUME_NAME (all data will be lost!)"
echo "  - Docker network: $NETWORK_NAME"
echo "  - Docker images: ${IMAGE_PREFIX}:*"
echo ""
echo "Local files (pyunit.db, logs) will NOT be deleted."
echo ""
read -p "Are you sure you want to continue? (yes/no): " -r
echo ""

if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo "Uninstall cancelled."
    exit 0
fi

echo "Starting uninstall process..."
echo ""

# Step 1: Stop and remove container
echo -e "${GREEN}[1/3]${NC} Stopping and removing container..."
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
    docker stop "$CONTAINER_NAME" 2>/dev/null || true
    docker rm "$CONTAINER_NAME" 2>/dev/null || true
    echo "  ✓ Container removed"
else
    echo "  ⓘ Container not found, skipping"
fi

# Step 2: Remove volume
echo -e "${GREEN}[2/3]${NC} Removing Docker volume..."
if docker volume ls --format '{{.Name}}' | grep -q "^${VOLUME_NAME}$"; then
    docker volume rm "$VOLUME_NAME" 2>/dev/null || true
    echo "  ✓ Volume removed"
else
    echo "  ⓘ Volume not found, skipping"
fi

# Step 3: Remove images
echo -e "${GREEN}[3/4]${NC} Removing Docker images..."
IMAGES=$(docker images --format '{{.Repository}}:{{.Tag}}' | grep "^${IMAGE_PREFIX}:" || true)
if [ -n "$IMAGES" ]; then
    echo "$IMAGES" | while read -r image; do
        docker rmi "$image" 2>/dev/null || true
        echo "  ✓ Removed image: $image"
    done
else
    echo "  ⓘ No images found, skipping"
fi

# Step 4: Remove network
echo -e "${GREEN}[4/4]${NC} Removing Docker network..."
if docker network ls --format '{{.Name}}' | grep -q "^${NETWORK_NAME}$"; then
    docker network rm "$NETWORK_NAME" 2>/dev/null || true
    echo "  ✓ Network removed"
else
    echo "  ⓘ Network not found, skipping"
fi

echo ""
echo -e "${GREEN}=========================================${NC}"
echo -e "${GREEN}Uninstall completed successfully!${NC}"
echo -e "${GREEN}=========================================${NC}"
echo ""
echo "To remove local database and logs, run:"
echo "  rm -f pyunit.db pyunit.db-wal pyunit.db-shm app.log dryer.log"
echo ""
