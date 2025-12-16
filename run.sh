#!/bin/bash
set -e

echo "========================================="
echo "PyUnit 2.0 - Install/Update Script"
echo "========================================="

# Detect Docker image tag based on git branch
if [ -d ".git" ]; then
    BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "main")
    case "$BRANCH" in
        main)
            DOCKER_TAG="latest"
            ;;
        dev)
            DOCKER_TAG="dev"
            ;;
        *)
            DOCKER_TAG="$BRANCH"
            ;;
    esac
else
    DOCKER_TAG="latest"
fi

DOCKER_IMAGE="xatang/pyunit:${DOCKER_TAG}"
echo "Image: ${DOCKER_IMAGE}"
echo ""

# Detect OS
if [ -f /etc/os-release ]; then
    . /etc/os-release
    OS=$ID
    echo "OS: $OS"
else
    echo "Cannot detect OS"
    exit 1
fi

# Check/Install Docker
echo ""
echo "Checking Docker..."
if command -v docker &> /dev/null; then
    echo "Docker: OK"
else
    echo "Installing Docker..."
    case "$OS" in
        ubuntu|debian|raspbian)
            sudo apt-get update
            sudo apt-get install -y ca-certificates curl
            sudo install -m 0755 -d /etc/apt/keyrings
            curl -fsSL https://download.docker.com/linux/$OS/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
            echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/$OS $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list
            sudo apt-get update
            sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
            ;;
        *)
            echo "Unsupported OS"
            exit 1
            ;;
    esac
fi

if ! groups | grep -q docker; then
    sudo usermod -aG docker $USER
fi

# Check/Install Python dependencies for idryer_api.py
echo ""
echo "Checking Python dependencies..."
if command -v python3 &> /dev/null; then
    echo "Python3: OK"
    # Check if requests module is installed
    if ! python3 -c "import requests" 2>/dev/null; then
        echo "Installing python3-requests..."
        case "$OS" in
            ubuntu|debian|raspbian)
                sudo apt-get update
                sudo apt-get install -y python3-requests
                ;;
            *)
                echo "Warning: Could not install python3-requests automatically"
                echo "Please install manually: pip3 install requests"
                ;;
        esac
    else
        echo "python3-requests: OK"
    fi
else
    echo "Warning: Python3 not found. Installing..."
    case "$OS" in
        ubuntu|debian|raspbian)
            sudo apt-get update
            sudo apt-get install -y python3 python3-requests
            ;;
        *)
            echo "Warning: Could not install Python3 automatically"
            ;;
    esac
fi

# Detect Docker Compose command
echo ""
if docker compose version &> /dev/null; then
    DC="docker compose"
else
    DC="docker-compose"
fi
echo "Docker Compose: $DC"

# Auto-detect IP
echo ""
IP=$(hostname -I | awk '{print $1}')
[ -z "$IP" ] && IP="localhost"
echo "Detected IP: $IP"

# Backup local config files if they exist
echo ""
echo "Backing up local configurations..."
if [ -f ".env" ]; then
    cp .env .env.backup
    echo "✓ Backed up .env"
fi

# Update from git (if in git repo)
echo ""
if [ -d ".git" ]; then
    echo "Updating from repository..."
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "main")
    git pull origin $CURRENT_BRANCH || echo "Pull failed, continuing..."
    echo "Repository updated from branch: $CURRENT_BRANCH"
else
    echo "Not a git repository, skipping update"
fi

# Create required files for Docker volume mounts
echo ""
echo "Initializing required files..."
touch pyunit.db
touch app.log
touch dryer.log
echo "✓ Files initialized"

# Update .env with detected IP
echo ""
if [ -f ".env.backup" ]; then
    echo "Restoring .env from backup..."
    # Extract old IP if exists
    OLD_IP=$(grep "API_URL=" .env.backup | sed 's/.*http:\/\/\([^:]*\):.*/\1/' || echo "")
    if [ -n "$OLD_IP" ] && [ "$OLD_IP" != "localhost" ]; then
        IP=$OLD_IP
        echo "Using previous IP: $IP"
    fi
    mv .env.backup .env
fi

if [ -f ".env" ]; then
    echo "Updating configuration in .env..."
    # Extract PORT from .env
    PORT=$(grep "^PORT=" .env | cut -d'=' -f2)
    [ -z "$PORT" ] && PORT="5000"
    # Update DOCKER_IMAGE
    sed -i "s|DOCKER_IMAGE=.*|DOCKER_IMAGE=${DOCKER_IMAGE}|" .env
    # Update IPs in .env
    sed -i "s|API_URL=.*|API_URL=http://${IP}:${PORT}/api|" .env
    sed -i "s|WS_URL=.*|WS_URL=ws://${IP}:${PORT}/api|" .env
    echo "✓ .env updated with:"
    echo "  - Docker image: ${DOCKER_IMAGE}"
    echo "  - IP: $IP"
    echo "  - PORT: $PORT"
else
    echo "Error: .env file not found!"
    echo "Please restore from git or create manually"
    exit 1
fi

# Start PyUnit
echo ""
echo "Starting PyUnit..."
sudo $DC down 2>/dev/null || true
sudo $DC pull
sudo $DC up -d

echo ""
echo "========================================="
echo "Done! Access: http://${IP}:${PORT}"
echo "========================================="
echo ""
echo "Useful commands:"
echo "  sudo $DC logs -f       # View logs"
echo "  sudo $DC restart       # Restart"
echo "  sudo $DC down          # Stop"
echo "  sudo $DC ps            # Status"
echo "========================================="
