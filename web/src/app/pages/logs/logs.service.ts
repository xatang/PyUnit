import { Injectable } from '@angular/core';
import { LoggingService } from '../../services/logging.service';
import { Observable, Subject } from 'rxjs';
import { ToastService } from '../../services/toast';

@Injectable({
  providedIn: 'root'
})
export class LogsService {
  private appLogsSubject = new Subject<string>();
  private dryerLogsSubject = new Subject<string>();

  appLogs$ = this.appLogsSubject.asObservable();
  dryerLogs$ = this.dryerLogsSubject.asObservable();

  private appSocket: WebSocket | null = null;
  private dryerSocket: WebSocket | null = null;
  private appReconnectTimeout: any;
  private dryerReconnectTimeout: any;
  private appIntentionalClose = false;
  private dryerIntentionalClose = false;

  constructor(private toastService: ToastService, private logger: LoggingService) {}

  connectToAppLogs(url: string): void {
    this.disconnectAppLogs();
    this.appIntentionalClose = false; // reset intent for a fresh connection

    try {
      this.appSocket = new WebSocket(url);
      this.appSocket.onopen = () => {
  this.logger.info('LogsService', 'Connected to App logs WebSocket');
        this.toastService.show('Connected to App logs', { classname: 'bg-success text-light', delay: 2000 });
        clearTimeout(this.appReconnectTimeout);
      };
      this.appSocket.onmessage = (event) => {
        this.appLogsSubject.next(event.data);
      };
      this.appSocket.onclose = (event) => {
  this.logger.info('LogsService', 'Disconnected from App logs WebSocket', event.code, event.reason, 'intentional=', this.appIntentionalClose);
        if (!this.appIntentionalClose) {
          this.appReconnectTimeout = setTimeout(() => {
            this.connectToAppLogs(url);
          }, 3000);
        }
      };
      this.appSocket.onerror = (error) => {
  this.logger.error('LogsService', 'App WebSocket error', error);
        this.toastService.show('App WebSocket connection error', { classname: 'bg-danger text-light', delay: 3000 });
      };
    } catch (error) {
  this.logger.error('LogsService', 'Failed to connect to App WebSocket', error);
      this.toastService.show('Failed to connect to App WebSocket', { classname: 'bg-danger text-light', delay: 3000 });

      if (!this.appIntentionalClose) {
        this.appReconnectTimeout = setTimeout(() => {
          this.connectToAppLogs(url);
        }, 3000);
      }
    }
  }

  connectToDryerLogs(url: string): void {
    this.disconnectDryerLogs();
    this.dryerIntentionalClose = false; // reset intent for a fresh connection

    try {
      this.dryerSocket = new WebSocket(url);
      this.dryerSocket.onopen = () => {
  this.logger.info('LogsService', 'Connected to Dryer logs WebSocket');
        this.toastService.show('Connected to Dryer logs', { classname: 'bg-success text-light', delay: 2000 });
        clearTimeout(this.dryerReconnectTimeout);
      };
      this.dryerSocket.onmessage = (event) => {
        this.dryerLogsSubject.next(event.data);
      };
      this.dryerSocket.onclose = (event) => {
  this.logger.info('LogsService', 'Disconnected from Dryer logs WebSocket', event.code, event.reason, 'intentional=', this.dryerIntentionalClose);
        if (!this.dryerIntentionalClose) {
          this.dryerReconnectTimeout = setTimeout(() => {
            this.connectToDryerLogs(url);
          }, 3000);
        }
      };
      this.dryerSocket.onerror = (error) => {
  this.logger.error('LogsService', 'Dryer WebSocket error', error);
        this.toastService.show('Dryer WebSocket connection error', { classname: 'bg-danger text-light', delay: 3000 });
      };
    } catch (error) {
  this.logger.error('LogsService', 'Failed to connect to Dryer WebSocket', error);
      this.toastService.show('Failed to connect to Dryer WebSocket', { classname: 'bg-danger text-light', delay: 3000 });

      if (!this.dryerIntentionalClose) {
        this.dryerReconnectTimeout = setTimeout(() => {
          this.connectToDryerLogs(url);
        }, 3000);
      }
    }
  }

  disconnectAppLogs(): void {
    this.appIntentionalClose = true;
    if (this.appSocket) {
      try { this.appSocket.close(); } catch {}
      this.appSocket = null;
    }
    clearTimeout(this.appReconnectTimeout);
  }

  disconnectDryerLogs(): void {
    this.dryerIntentionalClose = true;
    if (this.dryerSocket) {
      try { this.dryerSocket.close(); } catch {}
      this.dryerSocket = null;
    }
    clearTimeout(this.dryerReconnectTimeout);
  }

  disconnectAll(): void {
    this.disconnectAppLogs();
    this.disconnectDryerLogs();
  }
}
