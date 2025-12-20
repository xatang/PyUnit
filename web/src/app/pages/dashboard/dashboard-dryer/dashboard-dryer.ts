import { Component, OnInit, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { DashboardService, DryerStateSummary, PresetShort, TimeRangeKey } from '../dashboard.service';
import * as Highcharts from 'highcharts';
import { ToastService } from '../../../services/toast';
import { LoggingService } from '../../../services/logging.service';

@Pipe({ name: 'safeUrl', standalone: true })
export class SafeUrlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'app-dashboard-dryer',
  imports: [CommonModule, RouterModule, FormsModule, SafeUrlPipe],
  templateUrl: './dashboard-dryer.html',
  styleUrl: './dashboard-dryer.scss'
})
export class DashboardDryer implements OnInit, OnDestroy {
  dryerId!: number;
  summary?: DryerStateSummary;
  logs: any[] = []; // will reuse summary.logs filtered by range later
  private subs: Subscription[] = [];
  connectionStatus: string = '';
  presets: PresetShort[] = [];
  filteredPresets: PresetShort[] = [];
  selectedPresetId: number | null = null;
  starting = false;
  // Chart related
  private chart?: Highcharts.Chart;
  Highcharts: typeof Highcharts = Highcharts;
  timeRange: TimeRangeKey = '1h';
  timeRangeOptions: { key: TimeRangeKey; label: string }[] = [
    { key: '5m', label: '5m' },
    { key: '10m', label: '10m' },
    { key: '1h', label: '1h' },
    { key: '6h', label: '6h' },
    { key: '12h', label: '12h' },
    { key: 'all', label: 'All' }
  ];
  private firstData = true;
  private readonly POINT_LIMITS: Record<TimeRangeKey, number> = { '5m':400, '10m':600, '1h':1500, '6h':1100, '12h':950, 'all':800 };
  private readonly NO_ANIMATION_LIMIT = 1200;
  private lastRange?: TimeRangeKey;
  private lastFullRedrawAt = 0;
  private readonly FULL_REDRAW_INTERVAL_MS = 15_000; // safety refresh every 15s
  private initiatedConnection = false;
  // G-code macros card
  macrosExpanded = false;
  pythonScriptPath = 'python3 /home/orangepi/PyUnit/config_and_macros/idryer_api.py';
  // Embed links card
  embedLinksExpanded = false;

  constructor(private route: ActivatedRoute, private dashboard: DashboardService, private toast: ToastService, private logger: LoggingService) {}

  ngOnInit(): void {
    // Get dryer ID from route first
    this.subs.push(this.route.paramMap.subscribe(pm => {
      const val = pm.get('dryerId');
      this.dryerId = val ? +val : NaN;

      // Connect in optimized 'single' mode for this specific dryer
      if (Number.isFinite(this.dryerId) && !this.initiatedConnection) {
        this.logger.info('DashboardDryer', 'Connecting in single mode', { dryerId: this.dryerId });
        try {
          // No limit - load all logs for time range, frontend filtering handles performance
          this.dashboard.connect('single', this.dryerId);
          this.initiatedConnection = true;
        } catch (err) {
          this.logger.error('DashboardDryer', 'Failed to connect', err);
        }
      }

      this.pickSummary();
    }));

    // Fallback: ensure connection if status is closed/error
    if (this.dashboard.getConnectionStatus && typeof this.dashboard.getConnectionStatus === 'function') {
      const sub = this.dashboard.getConnectionStatus().subscribe(st => {
        if ((st === 'closed' || st === 'error') && !this.initiatedConnection && Number.isFinite(this.dryerId)) {
          this.logger.warn('DashboardDryer', 'Connection lost, reconnecting', { status: st });
          try {
            this.dashboard.connect('single', this.dryerId);
            this.initiatedConnection = true;
          } catch {}
        }
      });
      this.subs.push(sub);
    }

    this.subs.push(this.dashboard.getSummaries().subscribe(() => { this.pickSummary(); this.updateChart(); }));
    this.subs.push(this.dashboard.getConnectionStatus().subscribe((cs: any) => this.connectionStatus = cs));
    this.subs.push(this.dashboard.getPresets().subscribe((ps: PresetShort[]) => { this.presets = ps; this.filterPresets(); }));
    this.subs.push(this.dashboard.getTimeRange().subscribe((r: TimeRangeKey) => { this.timeRange = r; this.updateChart(true); }));
    // Init chart after view paint
    setTimeout(() => this.initChart());
  }

  private pickSummary() {
    if (!Number.isFinite(this.dryerId)) { this.summary = undefined; return; }
    const found = this.dashboard['state']?.summaries?.get(this.dryerId); // internal map access (ok for now; could expose method)
    if (found) {
      this.summary = found;
      this.logs = found.logs;
      // Keep selection even if it matches currentPresetId (requested: remove blocking of active preset button)
      this.filterPresets();
    } else {
      this.summary = undefined;
      this.logs = [];
      this.filteredPresets = [];
    }
  }

  // ----- Chart logic -----
  private initChart() {
    const el = document.getElementById('singleDryerChart');
    if (!el) return;
  this.logger.debug('DashboardDryer', 'initChart');
  const self = this;
  this.chart = Highcharts.chart(el, {
      chart: { zoomType: 'x', backgroundColor: 'transparent' } as any,
      title: { text: undefined },
      credits: { enabled: false },
      legend: { enabled: true, itemStyle: { color: '#dedce0' }, itemHoverStyle: { color: '#fff' }, itemHiddenStyle: { color: '#6d6f73' } },
      xAxis: { type: 'datetime', labels: { style: { color: '#dedce0' } }, lineColor: '#3a4247', tickColor: '#3a4247', dateTimeLabelFormats: { hour: '%d.%m %H:%M', minute: '%H:%M', second: '%H:%M:%S' } },
      yAxis: [
        { title: { text: 'Temperature (°C)', style: { color: '#dedce0' } }, labels: { style: { color: '#dedce0' } }, gridLineColor: '#31373c' },
        { title: { text: 'Humidity (%)', style: { color: '#dedce0' } }, labels: { style: { color: '#dedce0' } }, max:100, opposite: true, gridLineColor: '#31373c' }
      ],
      tooltip: {
        shared: true,
        useHTML: true,
        backgroundColor: 'rgba(25,25,30,0.95)',
        borderColor: '#3a3a40',
        style: { color: '#f0f0f2' },
        formatter: function() {
          const points = (this as any).points as Highcharts.Point[] | undefined;
          if (!points || points.length === 0) return '';
          const visible = points.filter(p => p.series.visible);
          if (!visible.length) return '';
          const dt = Highcharts.dateFormat('%d.%m.%Y %H:%M:%S', (this as any).x as number);
          let html = `<div style='font-size:11px;margin-bottom:6px;color:#fff;'>${dt}</div>`;
          html += `<table style='border-collapse:collapse;font-size:11px;color:#e2e2e5;'>`;
          // Build one row with both metrics; we have only one dryer so ensure columns Temp / Hum
          let tempPoint = visible.find(p => p.series.userOptions.id === 'temp');
          let humPoint = visible.find(p => p.series.userOptions.id === 'hum');
          const name = (self.summary?.name || ('Dryer ' + self.dryerId));
          html += `<tr>`;
          html += `<td style='padding:2px 8px 2px 0; white-space:nowrap; color:#fff;'>${name}</td>`;
          if (tempPoint) html += `<td style='padding:2px 8px; color:${tempPoint.color};'>T: <b>${tempPoint.y}</b>°C</td>`; else html += `<td style='padding:2px 8px; color:#555;'>T: -</td>`;
          if (humPoint) html += `<td style='padding:2px 0; color:${humPoint.color};'>H: <b>${humPoint.y}</b>%</td>`; else html += `<td style='padding:2px 0; color:#555;'>H: -</td>`;
          html += `</tr>`;
          html += `</table>`;
          return html;
        }
      },
      plotOptions: { series: { animation: { duration: 600 }, turboThreshold: 5000 } },
      series: []
    });
    this.updateChart();
  }

  private adaptiveDownsample(data: [number, number][], limit: number): [number, number][] {
    if (data.length <= limit) return data;
    const factor = data.length / limit;
    if (factor < 1.6) {
      const stride = Math.ceil(factor);
      const out: [number, number][] = [];
      for (let i=0;i<data.length;i+=stride) out.push(data[i]);
      if (out[out.length-1][0] !== data[data.length-1][0]) out.push(data[data.length-1]);
      return out;
    }
    // Simple LTTB variant
    const threshold = limit;
    const sampled: [number, number][] = [];
    let a = 0; sampled.push(data[a]);
    let bucketSize = (data.length - 2) / (threshold - 2);
    for (let i=0;i<threshold-2;i++) {
      const rangeStart = Math.floor((i + 1) * bucketSize) + 1;
      const rangeEnd = Math.floor((i + 2) * bucketSize) + 1;
      const end = Math.min(rangeEnd, data.length);
      let avgX=0, avgY=0; const len = end - rangeStart;
      for (let j=rangeStart;j<end;j++){ avgX+=data[j][0]; avgY+=data[j][1]; }
      avgX /= (len||1); avgY /= (len||1);
      const rangeOffs = Math.floor(i * bucketSize) + 1;
      const rangeTo = Math.min(Math.floor((i + 1) * bucketSize) + 1, data.length - 1);
      let maxArea=-1, nextA=rangeOffs;
      for (let j=rangeOffs;j<rangeTo;j++) {
        const area = Math.abs((data[a][0]-avgX)*(data[j][1]-data[a][1]) - (data[a][0]-data[j][0])*(avgY-data[a][1]));
        if (area>maxArea){ maxArea=area; nextA=j; }
      }
      sampled.push(data[nextA]);
      a = nextA;
    }
    sampled.push(data[data.length-1]);
    return sampled;
  }

  private updateChart(force = false) {
    if (!this.chart || !this.summary) return;
    let logs = this.summary.logs || [];
    // Defensive: ensure chronological order (ascending x) to avoid backtracking artifacts
    if (logs.length > 1) {
      const last = logs[logs.length-1];
      const prev = logs[logs.length-2];
      if ((last.epoch_ms ?? Date.parse(last.timestamp)) < (prev.epoch_ms ?? Date.parse(prev.timestamp))) {
        logs = [...logs].sort((a,b) => (a.epoch_ms ?? Date.parse(a.timestamp)) - (b.epoch_ms ?? Date.parse(b.timestamp)));
      }
    }
    if (!logs.length) {
      if (this.chart.series.length) { while (this.chart.series.length) this.chart.series[0].remove(false); this.chart.redraw(); }
      return;
    }
    const t0 = performance.now();
    const now = Date.now();
    const windows: Record<Exclude<TimeRangeKey,'all'>, number> = { '5m':5*60e3,'10m':10*60e3,'1h':3600e3,'6h':6*3600e3,'12h':12*3600e3 };
    const cutoff = this.timeRange !== 'all' ? (now - windows[this.timeRange as Exclude<TimeRangeKey,'all'>]) : 0;

    const tempSeries = this.chart.series.find(s => s.userOptions.id === 'temp');
    const humSeries = this.chart.series.find(s => s.userOptions.id === 'hum');

    const lastLog = logs[logs.length - 1];
    const lastEpoch = lastLog.epoch_ms ?? Date.parse(lastLog.timestamp);

    const needFullRedrawBecauseRangeChanged = this.lastRange && this.lastRange !== this.timeRange;
    const safetyElapsed = (now - this.lastFullRedrawAt) > this.FULL_REDRAW_INTERVAL_MS;

    // Decide if incremental path is viable: same range, not forced, series exists, and new log is strictly newer than last point.
    let incrementalDone = false;
    if (!force && !needFullRedrawBecauseRangeChanged && !safetyElapsed && tempSeries && humSeries && tempSeries.data.length && humSeries.data.length) {
      const lastPlottedX = tempSeries.data[tempSeries.data.length - 1].x as number;
      if (lastEpoch > lastPlottedX) {
        // Add only new logs (there could be more than one if batching)
        const newLogs = logs
          .filter(l => (l.epoch_ms ?? Date.parse(l.timestamp)) > lastPlottedX)
          .sort((a,b) => (a.epoch_ms ?? Date.parse(a.timestamp)) - (b.epoch_ms ?? Date.parse(b.timestamp)));
        if (newLogs.length > 0) {
          newLogs.forEach(l => {
            const x = l.epoch_ms ?? Date.parse(l.timestamp);
            tempSeries!.addPoint([x, l.temperature], false, false, false);
            humSeries!.addPoint([x, l.relative_humidity], false, false, false);
          });
          // Prune old points outside window for non 'all'
          if (this.timeRange !== 'all') {
            while (tempSeries.data.length && (tempSeries.data[0].x as number) < cutoff) tempSeries.data[0].remove(false);
            while (humSeries.data.length && (humSeries.data[0].x as number) < cutoff) humSeries.data[0].remove(false);
          }
          this.chart.redraw();
          incrementalDone = true;
        }
      }
    }

    if (incrementalDone) {
      const dt = (performance.now() - t0).toFixed(1);
      this.logger.debug('DashboardDryer', 'updateChart incremental', { dryer: this.dryerId, seriesPoints: tempSeries?.data.length, dt });
      this.lastRange = this.timeRange;
      if (this.firstData) this.firstData = false;
      return;
    }

    // Full redraw path (initial / forced / range change / safety / no existing series)
    let filtered = logs;
    if (this.timeRange !== 'all') {
      filtered = logs.filter(l => (l.epoch_ms ?? Date.parse(l.timestamp)) >= cutoff);
      if (!filtered.length) filtered = [logs[logs.length-1]];
    }
    let tempData: [number, number][] = filtered.map(l => [l.epoch_ms ?? Date.parse(l.timestamp), l.temperature]);
    let humData: [number, number][] = filtered.map(l => [l.epoch_ms ?? Date.parse(l.timestamp), l.relative_humidity]);
    const limit = this.POINT_LIMITS[this.timeRange];
    tempData = this.adaptiveDownsample(tempData, limit);
    humData = this.adaptiveDownsample(humData, limit);
    const animate = this.firstData && (tempData.length < this.NO_ANIMATION_LIMIT) && (humData.length < this.NO_ANIMATION_LIMIT);
    if (tempSeries) tempSeries.setData(tempData, false, false, false); else this.chart.addSeries({ id:'temp', name:'Temperature', type:'spline', data: tempData, yAxis:0, animation: animate }, false);
    if (humSeries) humSeries.setData(humData, false, false, false); else this.chart.addSeries({ id:'hum', name:'Humidity', type:'spline', data: humData, yAxis:1, dashStyle:'ShortDot', animation: animate }, false);
    this.chart.redraw();
    const dt = (performance.now() - t0).toFixed(1);
    this.logger.debug('DashboardDryer', 'updateChart fullRedraw', { dryer: this.dryerId, tempPoints: tempData.length, humPoints: humData.length, dt, range: this.timeRange });
    this.lastRange = this.timeRange;
    this.lastFullRedrawAt = now;
    if (this.firstData) this.firstData = false;
  }

  onRangeChange(r: TimeRangeKey) {
    if (r === this.timeRange) return;
    this.dashboard.setTimeRange(r); // triggers subscription
  }

  isValidId(): boolean { return Number.isFinite(this.dryerId); }

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
    if (!this.summary || !this.summary.status || this.summary.status==='pending') return 'status-pending';
    return 'status-active';
  }

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

  onSelectPreset(p: PresetShort) {
    // Allow selecting even if it's already the active preset (removed previous block)
    this.selectedPresetId = p.id === this.selectedPresetId ? null : p.id; // toggle selection
    this.logger.debug('DashboardDryer', 'onSelectPreset', { dryer: this.dryerId, presetId: p.id, selected: this.selectedPresetId });
  }

  async onStart() {
    if (!this.summary || !this.selectedPresetId || this.starting) return;
    this.starting = true;
    try {
      const res = await this.dashboard.startDryer(this.dryerId, this.selectedPresetId);
      // optimistic: clear selection (will become active on next log)
      this.selectedPresetId = null;
      this.toast.show(`Started dryer #${this.dryerId}${res?.message ? ': '+res.message : ''}`, { classname: 'bg-success text-light', delay: 3000, dedupKey: 'start-'+this.dryerId });
      this.logger.info('DashboardDryer', 'startDryer success', { dryer: this.dryerId });
    } catch (e: any) {
      this.logger.error('DashboardDryer', 'Start failed', e);
      this.toast.show(`Failed to start dryer #${this.dryerId}${e?.message ? ': '+e.message : ''}`, { classname: 'bg-danger text-light', delay: 4000, dedupKey: 'start-error-'+this.dryerId });
    } finally {
      this.starting = false;
    }
  }

  private filterPresets() {
    if (!Number.isFinite(this.dryerId)) { this.filteredPresets = []; return; }
    this.filteredPresets = this.presets.filter(p => !p.dryers || p.dryers.some(d => d.id === this.dryerId));
  }

  async onStop() {
    if (!this.summary || this.summary.status === 'pending') return;
    try {
      const res = await this.dashboard.stopDryer(this.dryerId);
      this.toast.show(`Stopped dryer #${this.dryerId}${res?.message ? ': '+res.message : ''}`, { classname: 'bg-warning text-dark', delay: 3000, dedupKey: 'stop-'+this.dryerId });
      this.logger.info('DashboardDryer', 'stopDryer success', { dryer: this.dryerId });
    } catch (e: any) {
      this.logger.error('DashboardDryer', 'Stop failed', e);
      this.toast.show(`Failed to stop dryer #${this.dryerId}${e?.message ? ': '+e.message : ''}`, { classname: 'bg-danger text-light', delay: 4000, dedupKey: 'stop-error-'+this.dryerId });
    }
  }

  /** Toggle G-code macros card visibility */
  toggleMacros() {
    this.macrosExpanded = !this.macrosExpanded;
    this.logger.debug('DashboardDryer', 'toggleMacros', { expanded: this.macrosExpanded });
  }

  /** Generate G-code macro for turning off dryer */
  generateOffMacro(): string {
    const dryerName = this.summary?.name?.toLowerCase().replace(/\s+/g, '_') || `dryer_${this.dryerId}`;
    return `[gcode_macro off_${dryerName}]\ngcode:\n    RUN_SHELL_COMMAND CMD=pyunit_api PARAMS="--id ${this.dryerId}"`;
  }

  /** Generate G-code macros for all available presets */
  generatePresetMacros(): string[] {
    if (!this.filteredPresets.length) return [];
    const dryerName = this.summary?.name?.toLowerCase().replace(/\s+/g, '_') || `dryer_${this.dryerId}`;
    return this.filteredPresets.map(p => {
      const presetName = p.name.toLowerCase().replace(/\s+/g, '_');
      return `[gcode_macro ${presetName}_${dryerName}]\ngcode:\n    RUN_SHELL_COMMAND CMD=pyunit_api PARAMS="--id ${this.dryerId} --preset_id ${p.id}"`;
    });
  }

  /** Generate shell command definition macro */
  generateShellCommandMacro(): string {
    return `[gcode_shell_command pyunit_api]\ncommand: ${this.pythonScriptPath}\ntimeout: 5.\nverbose: True`;
  }

  /** Copy specific macro text to clipboard */
  async copyMacro(macroText: string): Promise<void> {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(macroText);
      } else {
        // Fallback for older browsers or when clipboard API is not available
        const textArea = document.createElement('textarea');
        textArea.value = macroText;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      this.toast.show('Macro copied to clipboard', { classname: 'bg-success text-light', delay: 2000 });
      this.logger.info('DashboardDryer', 'Copied single macro to clipboard', { dryer: this.dryerId });
    } catch (e) {
      this.logger.error('DashboardDryer', 'Failed to copy macro', e);
      this.toast.show('Failed to copy to clipboard', { classname: 'bg-danger text-light', delay: 3000 });
    }
  }

  /** Copy generated macros to clipboard */
  async copyMacros() {
    const macros: string[] = [];
    macros.push(this.generateShellCommandMacro());
    macros.push(this.generateOffMacro());
    macros.push(...this.generatePresetMacros());
    const text = macros.join('\n\n');
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers or when clipboard API is not available
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      this.toast.show('G-code macros copied to clipboard', { classname: 'bg-success text-light', delay: 2000 });
      this.logger.info('DashboardDryer', 'Copied macros to clipboard', { dryer: this.dryerId, lines: macros.length });
    } catch (e) {
      this.logger.error('DashboardDryer', 'Failed to copy macros', e);
      this.toast.show('Failed to copy to clipboard', { classname: 'bg-danger text-light', delay: 3000 });
    }
  }

  /** Toggle embed links section */
  toggleEmbedLinks() {
    this.embedLinksExpanded = !this.embedLinksExpanded;
  }

  /** Get embed page URLs */
  getEmbedUrls() {
    const base = window.location.origin;
    return {
      chart: `${base}/embed/dryer/${this.dryerId}/chart`,
      control: `${base}/embed/dryer/${this.dryerId}/control`
    };
  }

  /** Copy embed URL to clipboard */
  async copyUrl(url: string, type: string) {
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        // Fallback for older browsers or when clipboard API is not available
        const textArea = document.createElement('textarea');
        textArea.value = url;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      this.toast.show(`${type} URL copied to clipboard`, { classname: 'bg-success text-light', delay: 2000 });
      this.logger.info('DashboardDryer', 'Copied embed URL', { dryer: this.dryerId, type });
    } catch (e) {
      this.logger.error('DashboardDryer', 'Failed to copy URL', e);
      this.toast.show('Failed to copy to clipboard', { classname: 'bg-danger text-light', delay: 3000 });
    }
  }

  ngOnDestroy(): void {
    this.logger.debug('DashboardDryer', 'ngOnDestroy');
    this.subs.forEach(s => s.unsubscribe());
    try { this.chart?.destroy(); } catch {}
    // Do not forcibly disconnect; the shared DashboardPage manages lifecycle.
  }
}
