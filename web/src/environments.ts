// Runtime configuration from config.js (populated by app.initializer.ts via sessionStorage)
export const environment = {
  get apiUrl(): string {
    return sessionStorage.getItem('API_URL') || 'http://localhost:5000/api';
  },
  get wsUrl(): string {
    return sessionStorage.getItem('WS_URL') || 'ws://localhost:5000/api';
  }
};
