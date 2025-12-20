import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DashboardService, DryerStateSummary, TimeRangeKey } from '../../dashboard/dashboard.service';
import * as Highcharts from 'highcharts';
import { LoggingService } from '../../../services/logging.service';

/**
 * Standalone embedded chart page for Klipper HTTP camera integration
 * Displays only temperature/humidity chart in 4:3 aspect ratio
 * Usage: /embed/dryer/:id/chart
 */
@Component({
  selector: 'app-dryer-chart-embed',
  imports: [CommonModule],
  templateUrl: './dryer-chart-embed.html',
  styleUrl: './dryer-chart-embed.scss',
  standalone: true
})
export class DryerChartEmbed implements OnInit, OnDestroy {
  dryerId!: number;
  summary?: DryerStateSummary;
  private subs: Subscription[] = [];
  connectionStatus: string = '';

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
  private readonly POINT_LIMITS: Record<TimeRangeKey, number> = {
    '5m': 400, '10m': 600, '1h': 1500, '6h': 1100, '12h': 950, 'all': 800
  };
  private readonly NO_ANIMATION_LIMIT = 1200;
  private lastRange?: TimeRangeKey;
  private lastFullRedrawAt = 0;
  private readonly FULL_REDRAW_INTERVAL_MS = 15_000;
  private initiatedConnection = false;

  constructor(
    private route: ActivatedRoute,
    private dashboard: DashboardService,
    private logger: LoggingService
  ) {}

  ngOnInit(): void {
    this.logger.info('DryerChartEmbed', 'ngOnInit');

    // Get dryer ID from route first
    this.subs.push(this.route.paramMap.subscribe(pm => {
      const val = pm.get('dryerId');
      this.dryerId = val ? +val : NaN;

      // Connect in optimized 'single' mode for this specific dryer
      if (Number.isFinite(this.dryerId) && !this.initiatedConnection) {
        this.logger.info('DryerChartEmbed', 'Connecting in single mode', { dryerId: this.dryerId });
        try {
          // No limit - load all logs for time range, frontend filtering handles performance
          this.dashboard.connect('single', this.dryerId);
          this.initiatedConnection = true;
        } catch (err) {
          this.logger.error('DryerChartEmbed', 'Failed to connect', err);
        }
      }

      this.pickSummary();
    }));

    // Ensure websocket connection
    if (this.dashboard.getConnectionStatus && typeof this.dashboard.getConnectionStatus === 'function') {
      const sub = this.dashboard.getConnectionStatus().subscribe(st => {
        this.connectionStatus = st;
        if ((st === 'closed' || st === 'error') && !this.initiatedConnection && Number.isFinite(this.dryerId)) {
          try {
            this.dashboard.connect('single', this.dryerId);
            this.initiatedConnection = true;
          } catch {}
        }
      });
      this.subs.push(sub);
    }

    this.subs.push(this.dashboard.getSummaries().subscribe(() => {
      this.pickSummary();
      this.updateChart();
    }));

    // Subscribe to time range changes (for reconnection with new data)
    this.subs.push(this.dashboard.getTimeRange().subscribe((r: TimeRangeKey) => {
      this.timeRange = r;
      this.updateChart(true);
    }));

    // Init chart after view paint
    setTimeout(() => this.initChart());
  }

  private pickSummary() {
    if (!Number.isFinite(this.dryerId)) {
      this.summary = undefined;
      return;
    }
    const found = this.dashboard['state']?.summaries?.get(this.dryerId);
    if (found) {
      this.summary = found;
    } else {
      this.summary = undefined;
    }
  }

  private initChart() {
    const el = document.getElementById('embedChart');
    if (!el) return;

    this.logger.debug('DryerChartEmbed', 'initChart', { dryer: this.dryerId });
    const self = this;

    this.chart = Highcharts.chart(el, {
      chart: {
        zoomType: 'x',
        backgroundColor: 'transparent',
        spacingTop: 10,
        spacingBottom: 15,
        spacingLeft: 10,
        spacingRight: 10
      } as any,
      title: { text: undefined },
      credits: { enabled: false },
      legend: {
        enabled: true,
        align: 'center',
        verticalAlign: 'bottom',
        itemStyle: { color: '#dedce0', fontSize: '11px' },
        itemHoverStyle: { color: '#fff' },
        itemHiddenStyle: { color: '#6d6f73' },
        margin: 8,
        padding: 8
      },
      xAxis: {
        type: 'datetime',
        labels: { style: { color: '#dedce0' } },
        lineColor: '#3a4247',
        tickColor: '#3a4247',
        dateTimeLabelFormats: {
          hour: '%d.%m %H:%M',
          minute: '%H:%M',
          second: '%H:%M:%S'
        }
      },
      yAxis: [
        {
          title: { text: 'Temperature (°C)', style: { color: '#dedce0' } },
          labels: { style: { color: '#dedce0' } },
          gridLineColor: '#31373c'
        },
        {
          title: { text: 'Humidity (%)', style: { color: '#dedce0' } },
          labels: { style: { color: '#dedce0' } },
          max: 100,
          opposite: true,
          gridLineColor: '#31373c'
        }
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
          let tempPoint = visible.find(p => p.series.userOptions.id === 'temp');
          let humPoint = visible.find(p => p.series.userOptions.id === 'hum');
          const name = (self.summary?.name || ('Dryer ' + self.dryerId));
          html += `<tr>`;
          html += `<td style='padding:2px 8px 2px 0; white-space:nowrap; color:#fff;'>${name}</td>`;
          if (tempPoint) html += `<td style='padding:2px 8px; color:${tempPoint.color};'>T: <b>${tempPoint.y}</b>°C</td>`;
          else html += `<td style='padding:2px 8px; color:#555;'>T: -</td>`;
          if (humPoint) html += `<td style='padding:2px 0; color:${humPoint.color};'>H: <b>${humPoint.y}</b>%</td>`;
          else html += `<td style='padding:2px 0; color:#555;'>H: -</td>`;
          html += `</tr>`;
          html += `</table>`;
          return html;
        }
      },
      plotOptions: {
        series: {
          animation: { duration: 600 },
          turboThreshold: 5000
        }
      },
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
      for (let i = 0; i < data.length; i += stride) out.push(data[i]);
      if (out[out.length - 1][0] !== data[data.length - 1][0]) out.push(data[data.length - 1]);
      return out;
    }

    // Simple LTTB variant
    const threshold = limit;
    const sampled: [number, number][] = [];
    let a = 0;
    sampled.push(data[a]);
    let bucketSize = (data.length - 2) / (threshold - 2);

    for (let i = 0; i < threshold - 2; i++) {
      const rangeStart = Math.floor((i + 1) * bucketSize) + 1;
      const rangeEnd = Math.floor((i + 2) * bucketSize) + 1;
      const end = Math.min(rangeEnd, data.length);
      let avgX = 0, avgY = 0;
      const len = end - rangeStart;
      for (let j = rangeStart; j < end; j++) {
        avgX += data[j][0];
        avgY += data[j][1];
      }
      avgX /= (len || 1);
      avgY /= (len || 1);
      const rangeOffs = Math.floor(i * bucketSize) + 1;
      const rangeTo = Math.min(Math.floor((i + 1) * bucketSize) + 1, data.length - 1);
      let maxArea = -1, nextA = rangeOffs;
      for (let j = rangeOffs; j < rangeTo; j++) {
        const area = Math.abs(
          (data[a][0] - avgX) * (data[j][1] - data[a][1]) -
          (data[a][0] - data[j][0]) * (avgY - data[a][1])
        );
        if (area > maxArea) {
          maxArea = area;
          nextA = j;
        }
      }
      sampled.push(data[nextA]);
      a = nextA;
    }
    sampled.push(data[data.length - 1]);
    return sampled;
  }

  private updateChart(force = false) {
    if (!this.chart || !this.summary) return;

    let logs = this.summary.logs || [];

    // Ensure chronological order
    if (logs.length > 1) {
      const last = logs[logs.length - 1];
      const prev = logs[logs.length - 2];
      if ((last.epoch_ms ?? Date.parse(last.timestamp)) < (prev.epoch_ms ?? Date.parse(prev.timestamp))) {
        logs = [...logs].sort((a, b) =>
          (a.epoch_ms ?? Date.parse(a.timestamp)) - (b.epoch_ms ?? Date.parse(b.timestamp))
        );
      }
    }

    if (!logs.length) {
      if (this.chart.series.length) {
        while (this.chart.series.length) this.chart.series[0].remove(false);
        this.chart.redraw();
      }
      return;
    }

    const t0 = performance.now();
    const now = Date.now();
    const windows: Record<Exclude<TimeRangeKey, 'all'>, number> = {
      '5m': 5 * 60e3, '10m': 10 * 60e3, '1h': 3600e3, '6h': 6 * 3600e3, '12h': 12 * 3600e3
    };
    const cutoff = this.timeRange !== 'all' ? (now - windows[this.timeRange as Exclude<TimeRangeKey, 'all'>]) : 0;

    const tempSeries = this.chart.series.find(s => s.userOptions.id === 'temp');
    const humSeries = this.chart.series.find(s => s.userOptions.id === 'hum');

    const lastLog = logs[logs.length - 1];
    const lastEpoch = lastLog.epoch_ms ?? Date.parse(lastLog.timestamp);

    const needFullRedrawBecauseRangeChanged = this.lastRange && this.lastRange !== this.timeRange;
    const safetyElapsed = (now - this.lastFullRedrawAt) > this.FULL_REDRAW_INTERVAL_MS;

    let incrementalDone = false;
    if (!force && !needFullRedrawBecauseRangeChanged && !safetyElapsed &&
        tempSeries && humSeries && tempSeries.data.length && humSeries.data.length) {
      const lastPlottedX = tempSeries.data[tempSeries.data.length - 1].x as number;
      if (lastEpoch > lastPlottedX) {
        const newLogs = logs
          .filter(l => (l.epoch_ms ?? Date.parse(l.timestamp)) > lastPlottedX)
          .sort((a, b) => (a.epoch_ms ?? Date.parse(a.timestamp)) - (b.epoch_ms ?? Date.parse(b.timestamp)));

        if (newLogs.length > 0) {
          newLogs.forEach(l => {
            const x = l.epoch_ms ?? Date.parse(l.timestamp);
            tempSeries!.addPoint([x, l.temperature], false, false, false);
            humSeries!.addPoint([x, l.relative_humidity], false, false, false);
          });

          if (this.timeRange !== 'all') {
            while (tempSeries.data.length && (tempSeries.data[0].x as number) < cutoff)
              tempSeries.data[0].remove(false);
            while (humSeries.data.length && (humSeries.data[0].x as number) < cutoff)
              humSeries.data[0].remove(false);
          }
          this.chart.redraw();
          incrementalDone = true;
        }
      }
    }

    if (incrementalDone) {
      const dt = (performance.now() - t0).toFixed(1);
      this.logger.debug('DryerChartEmbed', 'updateChart incremental', {
        dryer: this.dryerId,
        seriesPoints: tempSeries?.data.length,
        dt
      });
      this.lastRange = this.timeRange;
      if (this.firstData) this.firstData = false;
      return;
    }

    // Full redraw
    let filtered = logs;
    if (this.timeRange !== 'all') {
      filtered = logs.filter(l => (l.epoch_ms ?? Date.parse(l.timestamp)) >= cutoff);
      if (!filtered.length) filtered = [logs[logs.length - 1]];
    }

    let tempData: [number, number][] = filtered.map(l =>
      [l.epoch_ms ?? Date.parse(l.timestamp), l.temperature]
    );
    let humData: [number, number][] = filtered.map(l =>
      [l.epoch_ms ?? Date.parse(l.timestamp), l.relative_humidity]
    );

    const limit = this.POINT_LIMITS[this.timeRange];
    tempData = this.adaptiveDownsample(tempData, limit);
    humData = this.adaptiveDownsample(humData, limit);

    const animate = this.firstData &&
      (tempData.length < this.NO_ANIMATION_LIMIT) &&
      (humData.length < this.NO_ANIMATION_LIMIT);

    if (tempSeries) tempSeries.setData(tempData, false, false, false);
    else this.chart.addSeries({
      id: 'temp',
      name: 'Temperature',
      type: 'spline',
      data: tempData,
      yAxis: 0,
      animation: animate
    }, false);

    if (humSeries) humSeries.setData(humData, false, false, false);
    else this.chart.addSeries({
      id: 'hum',
      name: 'Humidity',
      type: 'spline',
      data: humData,
      yAxis: 1,
      dashStyle: 'ShortDot',
      animation: animate
    }, false);

    this.chart.redraw();

    const dt = (performance.now() - t0).toFixed(1);
    this.logger.debug('DryerChartEmbed', 'updateChart fullRedraw', {
      dryer: this.dryerId,
      tempPoints: tempData.length,
      humPoints: humData.length,
      dt,
      range: this.timeRange
    });

    this.lastRange = this.timeRange;
    this.lastFullRedrawAt = now;
    if (this.firstData) this.firstData = false;
  }

  onRangeChange(r: TimeRangeKey) {
    if (r === this.timeRange) return;
    this.logger.info('DryerChartEmbed', 'Time range changed', { from: this.timeRange, to: r });
    // This will trigger reconnection in single mode with new start_time
    this.dashboard.setTimeRange(r);
    // timeRange will be updated via subscription to getTimeRange()
  }

  ngOnDestroy(): void {
    this.logger.debug('DryerChartEmbed', 'ngOnDestroy');
    this.subs.forEach(s => s.unsubscribe());
    try { this.chart?.destroy(); } catch {}
  }
}
