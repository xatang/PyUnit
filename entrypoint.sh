#!/bin/bash
set -e

echo "Starting PyUnit..."
echo "DEBUG: API_URL=${API_URL}"
echo "DEBUG: WS_URL=${WS_URL}"

# Create runtime config as JavaScript file
mkdir -p /app/web/dist/pyunit/browser/assets
cat > /app/web/dist/pyunit/browser/assets/config.js << EOF
window.ENV = {
  API_URL: '${API_URL:-http://localhost:5000/api}',
  WS_URL: '${WS_URL:-ws://localhost:5000/api}'
};
EOF

echo "Frontend runtime config created"
echo "DEBUG: Config file content:"
cat /app/web/dist/pyunit/browser/assets/config.js

# Run database migrations
echo "Running database migrations..."
cd /app
alembic upgrade head || echo "Migration skipped"

# Start the application
echo "Starting application..."
exec python main.py
