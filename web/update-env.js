#!/usr/bin/env node

/**
 * Script to update Angular environments.ts from .env file
 * Run this before building the frontend
 */

const fs = require('fs');
const path = require('path');

// Read .env file from project root
const envPath = path.join(__dirname, '..', '.env');
const envContent = fs.readFileSync(envPath, 'utf8');

// Parse .env file
const env = {};
envContent.split('\n').forEach(line => {
  line = line.trim();
  if (line && !line.startsWith('#')) {
    const [key, ...valueParts] = line.split('=');
    env[key.trim()] = valueParts.join('=').trim();
  }
});

// Create environments.ts content with getters that read from sessionStorage
// sessionStorage is populated by app.initializer.ts from window.ENV
const environmentsTs = `// Runtime configuration from config.js (populated by app.initializer.ts via sessionStorage)
export const environment = {
  get apiUrl(): string {
    return sessionStorage.getItem('API_URL') || 'http://localhost:5000/api';
  },
  get wsUrl(): string {
    return sessionStorage.getItem('WS_URL') || 'ws://localhost:5000/api';
  }
};
`;

// Write to src/environments.ts
const outputPath = path.join(__dirname, 'src', 'environments.ts');
fs.writeFileSync(outputPath, environmentsTs, 'utf8');

console.log('✓ environments.ts updated successfully');
console.log('  Using runtime configuration with getters (reads from sessionStorage)');
console.log('  Populated by app.initializer.ts from window.ENV (config.js)');
