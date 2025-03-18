#!/bin/bash

# Determine the username
if [ -n "$SUDO_USER" ]; then
    USERNAME="$SUDO_USER"
else
    USERNAME=$(logname 2>/dev/null)
    if [ -z "$USERNAME" ]; then
        USERNAME=$(whoami)
    fi
fi

echo "Username: $USERNAME"

# Path to the configuration file
CONFIG_FILE="config.json"

LOG_FILE="app.log"

# Check if the file exists in the current directory
if [ ! -f "$CONFIG_FILE" ]; then
    echo "File $CONFIG_FILE not found in the current directory."
    exit 1
fi

# Check if the file exists in the current directory
if [ ! -f "$LOG_FILE" ]; then
    echo "File $LOG_FILE not found in the current directory."
    exit 1
fi

# Search for the printer_data/config directory
PRINTER_DATA_CONFIGS=$(sudo -u $USERNAME find /home/$USERNAME -type d -path "*/printer_data/config" 2>/dev/null | head -n 1)

if [ -z "$PRINTER_DATA_CONFIGS" ]; then
    echo "Directory printer_data/config not found."
    exit 1
fi

PRINTER_DATA_LOGS=$(sudo -u $USERNAME find /home/$USERNAME -type d -path "*/printer_data/logs" 2>/dev/null | head -n 1)

if [ -z "$PRINTER_DATA_LOGS" ]; then
    echo "Directory printer_data/logs not found."
    exit 1
fi

# Create the symlink
SYMLINK_PATH="$PRINTER_DATA_CONFIGS/$(basename "PyUnit.json")"
if [ -e "$SYMLINK_PATH" ]; then
    echo "Symlink or file already exists: $SYMLINK_PATH"
else
    sudo -u $USERNAME ln -s "$(pwd)/config.json" "$(pwd)/PyUnit.json"
    sudo -u $USERNAME ln -s "$(pwd)/PyUnit.json" "$SYMLINK_PATH"
    echo "Symlink created: $SYMLINK_PATH -> $(pwd)/$CONFIG_FILE"
fi

# Create the symlink
SYMLINK_PATH="$PRINTER_DATA_LOGS/$(basename "PyUnit.log")"
if [ -e "$SYMLINK_PATH" ]; then
    echo "Symlink or file already exists: $SYMLINK_PATH"
else
    sudo -u $USERNAME ln -s "$(pwd)/app.log" "$(pwd)/PyUnit.log"
    sudo -u $USERNAME ln -s "$(pwd)/PyUnit.log" "$SYMLINK_PATH"
    echo "Symlink created: $SYMLINK_PATH -> $(pwd)/$LOG_FILE"
fi