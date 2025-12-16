import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DashboardService, DryerStateSummary, PresetShort } from '../../dashboard/dashboard.service';
import { ToastService } from '../../../services/toast';
import { LoggingService } from '../../../services/logging.service';

/**
 * Standalone embedded control page for Klipper HTTP camera integration
 * Displays status, presets, and controls in compact 4:3 aspect ratio
 * Usage: /embed/dryer/:id/control
 */
@Component({
  selector: 'app-dryer-control-embed',
  imports: [CommonModule],
  templateUrl: './dryer-control-embed.html',
  styleUrl: './dryer-control-embed.scss',
  standalone: true
})
export class DryerControlEmbed implements OnInit, OnDestroy {
  dryerId!: number;
  summary?: DryerStateSummary;
  private subs: Subscription[] = [];
  connectionStatus: string = '';
  presets: PresetShort[] = [];
  filteredPresets: PresetShort[] = [];
  selectedPresetId: number | null = null;
  starting = false;
  private initiatedConnection = false;

  constructor(
    private route: ActivatedRoute,
    private dashboard: DashboardService,
    private toast: ToastService,
    private logger: LoggingService
  ) {}

  ngOnInit(): void {
    this.logger.info('DryerControlEmbed', 'ngOnInit');

    // Ensure websocket connection
    if (this.dashboard.getConnectionStatus && typeof this.dashboard.getConnectionStatus === 'function') {
      const sub = this.dashboard.getConnectionStatus().subscribe(st => {
        if (st === 'closed' || st === 'error') {
          if (!this.initiatedConnection) {
            try { this.dashboard.connect(); this.initiatedConnection = true; } catch {}
          }
        }
      });
      this.subs.push(sub);
    } else {
      try { this.dashboard.connect(); this.initiatedConnection = true; } catch {}
    }

    this.subs.push(this.route.paramMap.subscribe(pm => {
      const val = pm.get('dryerId');
      this.dryerId = val ? +val : NaN;
      this.pickSummary();
    }));

    this.subs.push(this.dashboard.getSummaries().subscribe(() => {
      this.pickSummary();
    }));

    this.subs.push(this.dashboard.getConnectionStatus().subscribe((cs: any) =>
      this.connectionStatus = cs
    ));

    this.subs.push(this.dashboard.getPresets().subscribe((ps: PresetShort[]) => {
      this.presets = ps;
      this.filterPresets();
    }));
  }

  private pickSummary() {
    if (!Number.isFinite(this.dryerId)) {
      this.summary = undefined;
      return;
    }
    const found = this.dashboard['state']?.summaries?.get(this.dryerId);
    if (found) {
      this.summary = found;
      this.filterPresets();
    } else {
      this.summary = undefined;
      this.filteredPresets = [];
    }
  }

  private filterPresets() {
    if (!Number.isFinite(this.dryerId)) {
      this.filteredPresets = [];
      return;
    }
    this.filteredPresets = this.presets.filter(p =>
      !p.dryers || p.dryers.some(d => d.id === this.dryerId)
    );
  }

  getStatusLabel(): string {
    if (!this.summary) return 'Idle';
    switch (this.summary.status) {
      case 'drying': return 'Drying';
      case 'timer_drying': return 'Timer';
      case 'humidity_storage': return 'Storage (H)';
      case 'temperature_storage': return 'Storage (T)';
      case 'pending':
      default: return 'Idle';
    }
  }

  getStatusClass(): string {
    if (!this.summary || !this.summary.status || this.summary.status === 'pending')
      return 'status-pending';
    return 'status-active';
  }

  formatTimeLeft(seconds?: number | null): string {
    if (seconds === null || seconds === undefined) return '';
    if (seconds < 0) seconds = 0;
    const d = Math.floor(seconds / 86400); seconds %= 86400;
    const h = Math.floor(seconds / 3600); seconds %= 3600;
    const m = Math.floor(seconds / 60);
    const sLeft = Math.floor(seconds % 60);
    const parts: string[] = [];
    if (d) parts.push(d + 'd');
    if (h) parts.push(h + 'h');
    if (m) parts.push(m + 'm');
    if (!d && !h && !m) parts.push(sLeft + 's');
    return parts.join(' ');
  }

  onSelectPreset(p: PresetShort) {
    this.selectedPresetId = p.id === this.selectedPresetId ? null : p.id;
    this.logger.debug('DryerControlEmbed', 'onSelectPreset', {
      dryer: this.dryerId,
      presetId: p.id,
      selected: this.selectedPresetId
    });
  }

  async onStart() {
    if (!this.summary || !this.selectedPresetId || this.starting) return;
    this.starting = true;
    try {
      const res = await this.dashboard.startDryer(this.dryerId, this.selectedPresetId);
      this.selectedPresetId = null;
      this.toast.show(`Started dryer #${this.dryerId}${res?.message ? ': ' + res.message : ''}`, {
        classname: 'bg-success text-light',
        delay: 3000,
        dedupKey: 'start-' + this.dryerId
      });
      this.logger.info('DryerControlEmbed', 'startDryer success', { dryer: this.dryerId });
    } catch (e: any) {
      this.logger.error('DryerControlEmbed', 'Start failed', e);
      this.toast.show(`Failed to start dryer #${this.dryerId}${e?.message ? ': ' + e.message : ''}`, {
        classname: 'bg-danger text-light',
        delay: 4000,
        dedupKey: 'start-error-' + this.dryerId
      });
    } finally {
      this.starting = false;
    }
  }

  async onStop() {
    if (!this.summary || this.summary.status !== 'drying') return;
    try {
      const res = await this.dashboard.stopDryer(this.dryerId);
      this.toast.show(`Stopped dryer #${this.dryerId}${res?.message ? ': ' + res.message : ''}`, {
        classname: 'bg-warning text-dark',
        delay: 3000,
        dedupKey: 'stop-' + this.dryerId
      });
      this.logger.info('DryerControlEmbed', 'stopDryer success', { dryer: this.dryerId });
    } catch (e: any) {
      this.logger.error('DryerControlEmbed', 'Stop failed', e);
      this.toast.show(`Failed to stop dryer #${this.dryerId}${e?.message ? ': ' + e.message : ''}`, {
        classname: 'bg-danger text-light',
        delay: 4000,
        dedupKey: 'stop-error-' + this.dryerId
      });
    }
  }

  ngOnDestroy(): void {
    this.logger.debug('DryerControlEmbed', 'ngOnDestroy');
    this.subs.forEach(s => s.unsubscribe());
  }
}
