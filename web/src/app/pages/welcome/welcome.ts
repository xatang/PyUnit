import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule],
  templateUrl: './welcome.html',
  styleUrl: './welcome.scss'
})
export class WelcomePage implements OnInit, OnDestroy {
  currentStep = 1;
  moonrakerConfigured = false;
  moonrakerIsLocalhost = false;
  dryersExist = false;
  isCheckingStatus = true;
  private routerSubscription?: Subscription;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.checkSetupStatus();

    // Re-check status when navigating back to this page
    this.routerSubscription = this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        if (event.url === '/welcome' || event.urlAfterRedirects === '/welcome') {
          console.log('Navigation to welcome detected, refreshing status...');
          this.checkSetupStatus();
        }
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  checkSetupStatus(): void {
    console.log('Checking setup status...');
    this.isCheckingStatus = true;

    // Check if moonraker is configured by testing actual connection
    this.http.get<any>(`${environment.apiUrl}/config/moonraker`).subscribe({
      next: (config) => {
        console.log('Moonraker config:', config);

        // Test actual connection to Moonraker
        this.http.post<any>(`${environment.apiUrl}/config/moonraker/test-connection`, config).subscribe({
          next: (testResult) => {
            console.log('Moonraker test connection result:', testResult);
            this.moonrakerConfigured = testResult.success === true;

            // Check if using localhost (warning for Docker users)
            this.moonrakerIsLocalhost = config &&
                                        (config.moonraker_ip === '127.0.0.1' ||
                                         config.moonraker_ip === 'localhost');
            console.log('Moonraker configured:', this.moonrakerConfigured);
            console.log('Moonraker is localhost:', this.moonrakerIsLocalhost);

            // Check if dryers exist
            this.http.get<any[]>(`${environment.apiUrl}/common/units`).subscribe({
              next: (dryers) => {
                console.log('Dryers:', dryers);
                this.dryersExist = dryers && dryers.length > 0;
                console.log('Dryers exist:', this.dryersExist);
                this.isCheckingStatus = false;

                // Determine current step
                if (!this.moonrakerConfigured) {
                  this.currentStep = 1;
                } else if (!this.dryersExist) {
                  this.currentStep = 2;
                } else {
                  // Both configured, show step 3 (Ready!)
                  this.currentStep = 3;
                }
                console.log('Current step:', this.currentStep);
              },
              error: (err) => {
                console.error('Error fetching dryers:', err);
                this.isCheckingStatus = false;
                this.currentStep = 1;
              }
            });
          },
          error: (err) => {
            console.error('Moonraker test connection failed:', err);
            this.moonrakerConfigured = false;
            this.isCheckingStatus = false;
            this.currentStep = 1;
          }
        });
      },
      error: (err) => {
        console.error('Error fetching moonraker config:', err);
        this.isCheckingStatus = false;
        this.currentStep = 1;
      }
    });
  }

  goToMoonrakerConfig(): void {
    this.router.navigate(['/configs/moonraker'], { queryParams: { from: 'welcome' } });
  }

  goToDryerConfig(): void {
    this.router.navigate(['/configs/dryer'], { queryParams: { from: 'welcome' } });
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  skipSetup(): void {
    // Set flag to bypass setup guard
    sessionStorage.setItem('skipSetup', 'true');
    this.router.navigate(['/dashboard']);
  }
}
