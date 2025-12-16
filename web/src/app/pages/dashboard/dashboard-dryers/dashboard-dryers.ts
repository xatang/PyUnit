import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../services/toast';
import { DashboardService, DryerStateSummary } from '../dashboard.service';
import { LoggingService } from '../../../services/logging.service';

@Component({
  selector: 'app-dashboard-dryers',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './dashboard-dryers.html',
  styleUrl: './dashboard-dryers.scss'
})
export class DashboardDryersPage implements OnInit {
  configForm!: FormGroup;
  isLoading = false;
  isTesting = false;
  testResult: { success: boolean; message: string } | null = null;
  showApiKey = false;
  summaries: DryerStateSummary[] = [];
  lastUpdated?: string;
  connectionStatus: string = 'connecting';

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService,
    private dashboard: DashboardService,
    private logger: LoggingService
  ) {}

  ngOnInit(): void {
    this.dashboard.getSummaries().subscribe(sums => {
      this.summaries = sums.sort((a,b)=>a.dryerId-b.dryerId);
      const latest = Math.max(...sums.map(s => s.updatedAt ? new Date(s.updatedAt).getTime() : 0));
      if (latest>0) this.lastUpdated = new Date(latest).toLocaleTimeString();
    });
    this.dashboard.getConnectionStatus().subscribe(cs => {
      const prev = this.connectionStatus;
      this.connectionStatus = cs;
      if (prev !== cs) {
        switch (cs) {
          case 'open':
            this.toastService.show('Connected to Dashboard', { classname: 'bg-success text-light', delay: 2500, dedupKey: 'ws-open' });
            break;
          case 'error':
            this.toastService.show('WebSocket Error', { classname: 'bg-danger text-light', delay: 5000, dedupKey: 'ws-error' });
            break;
          case 'closed':
            this.logger.info('DashboardDryers', '[WS] closed');
            break;
          case 'connecting':
            this.logger.debug('DashboardDryers', '[WS] connecting...');
            break;
        }
      }
    });
  }

  trackByDryer = (_: number, s: DryerStateSummary) => s.dryerId;

  formatTimeLeft(seconds?: number | null): string {
    if (seconds === null || seconds === undefined) return '';
    if (seconds < 0) seconds = 0;
    const d = Math.floor(seconds / 86400); seconds %= 86400;
    const h = Math.floor(seconds / 3600); seconds %= 3600;
    const m = Math.floor(seconds / 60); const sLeft = Math.floor(seconds % 60);
    const parts: string[] = [];
    if (d) parts.push(d + 'd');
    if (h) parts.push(h + 'h');
    if (m) parts.push(m + 'm');
    if (!d && !h && !m) parts.push(sLeft + 's');
    return parts.join(' ');
  }

  getStatusLabel(s: DryerStateSummary): string {
    switch (s.status) {
      case 'drying': return 'Drying';
      case 'timer_drying': return 'Timer';
      case 'humidity_storage': return 'Storage (H)';
      case 'temperature_storage': return 'Storage (T)';
      default: return 'Idle';
    }
  }

  getStatusClass(s: DryerStateSummary): string {
    if (!s.status || s.status==='pending') return 'status-pending';
    return 'status-active';
  }

  stopping: Record<number, boolean> = {};

  async onStop(s: DryerStateSummary) {
    if (this.stopping[s.dryerId]) return;
    this.stopping[s.dryerId] = true;
    try {
      const result = await this.dashboard.stopDryer(s.dryerId);
      this.toastService.show(result.message || `Dryer ${s.dryerId} stopped`, { classname: 'bg-success text-light', delay: 2500 });
    } catch (e: any) {
      this.toastService.show(e.message || `Failed to stop dryer ${s.dryerId}`, { classname: 'bg-danger text-light', delay: 4000 });
    } finally {
      this.stopping[s.dryerId] = false;
    }
  }
}
