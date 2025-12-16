/**
 * Application initializer that loads runtime configuration
 * This runs BEFORE Angular bootstrap, after config.js has loaded
 */
export function initializeApp(): () => void {
  return () => {
    // Read configuration from window.ENV (set by config.js)
    const win = window as any;

    if (win.ENV) {
      console.log('Runtime config loaded:', win.ENV);

      // Store in sessionStorage for app-wide access
      sessionStorage.setItem('API_URL', win.ENV.API_URL);
      sessionStorage.setItem('WS_URL', win.ENV.WS_URL);
    } else {
      console.warn('window.ENV not found, using defaults');
      sessionStorage.setItem('API_URL', 'http://localhost:5000/api');
      sessionStorage.setItem('WS_URL', 'ws://localhost:5000/api');
    }
  };
}
