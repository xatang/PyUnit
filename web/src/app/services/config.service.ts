import { Injectable } from '@angular/core';

declare global {
  interface Window {
    ENV: {
      API_URL: string;
      WS_URL: string;
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  get apiUrl(): string {
    return window.ENV?.API_URL || 'http://localhost:5000/api';
  }

  get wsUrl(): string {
    return window.ENV?.WS_URL || 'ws://localhost:5000/api';
  }
}
