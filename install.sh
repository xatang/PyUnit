#!/bin/bash

# Ensure the script is run as root
if [ "$EUID" -ne 0 ]; then
  echo "Please run the script as root."
  exit 1
fi

# Determine the directory where install.sh is located
INSTALL_DIR=$(dirname "$(realpath "$0")")

# Path to your Python script (assume it's in the same directory as install.sh)
SCRIPT_NAME="main.py"  # Replace with the name of your Python script
SCRIPT_PATH="$INSTALL_DIR/$SCRIPT_NAME"

# Check if the script file exists
if [ ! -f "$SCRIPT_PATH" ]; then
  echo "Error: Script file $SCRIPT_NAME not found in directory $INSTALL_DIR."
  exit 1
fi

# Service name
SERVICE_NAME="PyUnit.service"
# User and group under which the service will run
USER_NAME=$(logname)
GROUP_NAME=$(id -gn $USER_NAME)

# Update apt package list
echo "Updating apt package list..."
sudo apt-get update

# Ensure python3-venv is installed (for creating virtual environments)
if ! dpkg -l | grep -q python3-venv; then
  echo "Installing python3-venv..."
  sudo apt-get install -y python3-venv
  if [ $? -ne 0 ]; then
    echo "Failed to install python3-venv. Exiting."
    exit 1
  fi
fi

# Create a virtual environment
VENV_DIR="$INSTALL_DIR/venv"
echo "Creating virtual environment in $VENV_DIR..."
python3 -m venv "$VENV_DIR"
if [ $? -ne 0 ]; then
  echo "Failed to create virtual environment. Exiting."
  exit 1
fi

# Activate the virtual environment and install dependencies
echo "Installing dependencies from requirements.txt..."
if [ -f "$INSTALL_DIR/requirements.txt" ]; then
  source "$VENV_DIR/bin/activate"
  pip install -r "$INSTALL_DIR/requirements.txt"
  if [ $? -ne 0 ]; then
    echo "Failed to install dependencies. Exiting."
    exit 1
  fi
  deactivate
else
  echo "requirements.txt not found. Skipping dependency installation."
fi

# Create the service file
echo "Creating service $SERVICE_NAME..."
SERVICE_FILE="/etc/systemd/system/$SERVICE_NAME"

cat <<EOF | sudo tee "$SERVICE_FILE" > /dev/null
[Unit]
Description=Custom python firmware for iDryer Unit
After=klipper.service moonraker.service

[Service]
ExecStart=$VENV_DIR/bin/python3 $SCRIPT_PATH
WorkingDirectory=$INSTALL_DIR
Restart=always
RestartSec=10
User=$USER_NAME
Group=$GROUP_NAME

[Install]
WantedBy=multi-user.target
EOF

bash create_symlink.sh

# Reload systemd
echo "Reloading systemd..."
sudo systemctl daemon-reload

# Start the service
echo "Starting service $SERVICE_NAME..."
sudo systemctl start "$SERVICE_NAME"

# Check the service status
echo "Checking service status..."
sudo systemctl status "$SERVICE_NAME"

# Enable service autostart
echo "Enabling service autostart..."
sudo systemctl enable "$SERVICE_NAME"

echo "Installation complete. Service $SERVICE_NAME has been successfully created and started."