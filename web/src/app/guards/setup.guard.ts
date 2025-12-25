import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { map, catchError, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments';

/**
 * Guard that checks if initial setup is complete
 * Redirects to welcome page if no moonraker config or dryers exist
 * Can be bypassed with skipSetup flag in sessionStorage
 */
export const setupGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);
  const apiUrl = environment.apiUrl;

  // Check if user has skipped setup
  const skipSetup = sessionStorage.getItem('skipSetup') === 'true';
  if (skipSetup) {
    console.log('Setup guard bypassed by skipSetup flag');
    return true;
  }

  // First check if moonraker is configured properly by testing actual connection
  return http.get<any>(`${apiUrl}/config/moonraker`).pipe(
    switchMap(config => {
      // Test actual connection to Moonraker
      return http.post<any>(`${apiUrl}/config/moonraker/test-connection`, config).pipe(
        switchMap(testResult => {
          const moonrakerConfigured = testResult.success === true;

          if (!moonrakerConfigured) {
            // Moonraker not configured or connection failed, redirect to welcome
            router.navigate(['/welcome']);
            return of(false);
          }

          // Moonraker is configured, check if dryers exist
          return http.get<any[]>(`${apiUrl}/common/units`).pipe(
            map(dryers => {
              if (dryers && dryers.length > 0) {
                // Setup is complete
                return true;
              } else {
                // No dryers found, redirect to welcome page
                router.navigate(['/welcome']);
                return false;
              }
            }),
            catchError(error => {
              // On error, redirect to welcome page
              console.error('Dryers check failed:', error);
              router.navigate(['/welcome']);
              return of(false);
            })
          );
        }),
        catchError(error => {
          // Moonraker test connection failed, redirect to welcome
          console.error('Moonraker test connection failed:', error);
          router.navigate(['/welcome']);
          return of(false);
        })
      );
    }),
    catchError(error => {
      // On error, redirect to welcome page
      console.error('Setup check failed:', error);
      router.navigate(['/welcome']);
      return of(false);
    })
  );
};
