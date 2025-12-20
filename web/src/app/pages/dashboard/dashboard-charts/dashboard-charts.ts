import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as Highcharts from 'highcharts';
// Set locale once (24h, European day-month-year ordering). Could be moved globally.
Highcharts.setOptions({
  time: { useUTC: false } as any,
  lang: {
    months: ['January','February','March','April','May','June','July','August','September','October','November','December'],
    weekdays: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
    shortMonths: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  }
});
import { DashboardService, DryerStateSummary, TimeRangeKey } from '../dashboard.service';
import { LoggingService } from '../../../services/logging.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-charts',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-charts.html',
  styleUrl: './dashboard-charts.scss'
})
export class DashboardChartsPage implements OnInit, OnDestroy {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  private chart?: Highcharts.Chart;
  private subs: Subscription[] = [];
  private firstData = true;
  private boostLoaded = false;
  private readonly RANGE_POINT_LIMITS: Record<TimeRangeKey, number> = {
    '5m': 400,
    '10m': 600,
    '1h': 1500,
    '6h': 1100,
    '12h': 950,
    'all': 800
  };
  private readonly BOOST_TOTAL_THRESHOLD = 2500; // total visible points threshold to load boost
  private readonly NO_ANIMATION_LIMIT = 1200; // disable animation when series exceeds this post-sampling
  private seriesCache = new Map<string, string>(); // id -> signature for change detection

  private ensureBoostLoaded() {
    if (this.boostLoaded) return;
    import('highcharts/modules/boost')
      .then(mod => { (mod as any).default?.(Highcharts); this.boostLoaded = true; })
      .catch(() => {});
  }

  // LTTB downsampling (simplified, adequate for visual smoothing)
  private lttb(data: [number, number][], threshold: number): [number, number][] {
    if (threshold >= data.length || threshold === 0) return data;
    const sampled: [number, number][] = [];
    let bucketSize = (data.length - 2) / (threshold - 2);
    let a = 0;
    sampled.push(data[a]);
    for (let i = 0; i < threshold - 2; i++) {
      const rangeStart = Math.floor((i + 1) * bucketSize) + 1;
      const rangeEnd = Math.floor((i + 2) * bucketSize) + 1;
      const end = Math.min(rangeEnd, data.length);
      let avgX = 0, avgY = 0;
      const len = end - rangeStart;
      for (let j = rangeStart; j < end; j++) { avgX += data[j][0]; avgY += data[j][1]; }
      avgX /= (len || 1); avgY /= (len || 1);
      const rangeOffs = Math.floor(i * bucketSize) + 1;
      const rangeTo = Math.min(Math.floor((i + 1) * bucketSize) + 1, data.length - 1);
      let maxArea = -1; let nextA = rangeOffs;
      for (let j = rangeOffs; j < rangeTo; j++) {
        const area = Math.abs((data[a][0] - avgX) * (data[j][1] - data[a][1]) - (data[a][0] - data[j][0]) * (avgY - data[a][1]));
        if (area > maxArea) { maxArea = area; nextA = j; }
      }
      sampled.push(data[nextA]);
      a = nextA;
    }
    sampled.push(data[data.length - 1]);
    return sampled;
  }

  private adaptiveDownsample(data: [number, number][], limit: number): [number, number][] {
    if (data.length <= limit) return data;
    // For moderately larger sets, simple stride; for much larger, LTTB
    const factor = data.length / limit;
    if (factor < 1.6) {
      const stride = Math.ceil(factor);
      const out: [number, number][] = [];
      for (let i = 0; i < data.length; i += stride) out.push(data[i]);
      if (out[out.length - 1][0] !== data[data.length - 1][0]) out.push(data[data.length - 1]);
      return out;
    }
    return this.lttb(data, limit);
  }

  timeRange: TimeRangeKey = '1h';
  timeRangeOptions: { key: TimeRangeKey; label: string }[] = [
    { key: '5m', label: '5m' },
    { key: '10m', label: '10m' },
    { key: '1h', label: '1h' },
    { key: '6h', label: '6h' },
    { key: '12h', label: '12h' },
    { key: 'all', label: 'All' },
  ];
  connectionStatus: 'connecting' | 'open' | 'reconnecting' | 'closed' | 'error' = 'connecting';
  summaries: DryerStateSummary[] = [];
  hasChartData = false; // Track if chart has been populated with data
  isLoadingNewData = false; // Track when user changes time range

  constructor(private dashboard: DashboardService, private logger: LoggingService) {}

  ngOnInit(): void {
    this.logger.debug('DashboardCharts', 'ngOnInit');
    this.initChart();
    this.subs.push(
      this.dashboard.getConnectionStatus().subscribe(status => {
        this.logger.debug('DashboardCharts', 'connection status', { status });
        this.connectionStatus = status;
      }),
      this.dashboard.getSummaries().subscribe(sums => {
        this.logger.debug('DashboardCharts', 'summaries update', { count: sums.length });
        this.summaries = sums;
        this.updateSeries(sums);
        // Don't stop loading indicator here - let updateSeries handle it
      }),
      this.dashboard.getTimeRange().subscribe(r => {
        this.logger.debug('DashboardCharts', 'time range changed', { from: this.timeRange, to: r });
        this.timeRange = r;
        this.redrawXAxis();
      })
    );
  }

  private initChart() {
    // Cast to any to bypass strict Highcharts type mismatch for zoomType
  this.logger.debug('DashboardCharts', 'initChart');
  this.chartOptions = {
      chart: { zoomType: 'x', backgroundColor: 'transparent' } as any,
      title: { text: undefined },
      credits: { enabled: false },
      legend: { align: 'center', verticalAlign: 'bottom', itemStyle: { color: '#dedce0' }, itemHoverStyle: { color: '#ffffff' }, itemHiddenStyle: { color: '#6d6f73' } },
      xAxis: { type: 'datetime', labels: { style: { color: '#dedce0' } }, lineColor: '#3a4247', tickColor: '#3a4247', dateTimeLabelFormats: { hour: '%d.%m %H:%M', day: '%d.%m %H:%M', minute: '%H:%M', second: '%H:%M:%S' } },
      yAxis: [
        { title: { text: 'Temperature (°C)', style: { color: '#dedce0' } }, labels: { style: { color: '#dedce0' } }, opposite: false, gridLineColor: '#31373c', lineColor: '#3a4247', tickColor: '#3a4247' },
        { title: { text: 'Humidity (%)', style: { color: '#dedce0' } }, labels: { style: { color: '#dedce0' } }, max: 100, opposite: true, gridLineColor: '#31373c', lineColor: '#3a4247', tickColor: '#3a4247' }
      ],
      tooltip: {
        shared: true,
        useHTML: true,
        hideDelay: 50,
        followPointer: true,
        backgroundColor: 'rgba(25,25,30,0.95)',
        borderColor: '#3a3a40',
        style: { color: '#f0f0f2' },
        formatter: function() {
          const points = (this as any).points as Highcharts.Point[] | undefined;
          if (!points || points.length === 0) return '';
          const visiblePoints = points.filter(p => p.series.visible);
          if (visiblePoints.length === 0) return '';
          interface Row { dryerId: string; name: string; temp?: number; hum?: number; colorT?: string; colorH?: string; }
          const map = new Map<string, Row>();
          visiblePoints.forEach(p => {
            const sid = p.series.options.id as string; // format <id>:temp|hum
            const [dryerId, kind] = sid.split(':');
            if (!map.has(dryerId)) {
              map.set(dryerId, { dryerId, name: p.series.name.split(/\s+(T|H)$/)[0] });
            }
            const row = map.get(dryerId)!;
            if (kind === 'temp') { row.temp = p.y as number; row.colorT = p.color as string; }
            if (kind === 'hum') { row.hum = p.y as number; row.colorH = p.color as string; }
          });
          const dt = Highcharts.dateFormat('%d.%m.%Y %H:%M:%S', (this as any).x as number);
          let html = `<div style='font-size:11px;margin-bottom:6px;color:#fff;'>${dt}</div>`;
          html += `<table style='border-collapse:collapse;font-size:11px;color:#e2e2e5;'>`;
          map.forEach(r => {
            html += `<tr>`;
            html += `<td style='padding:2px 8px 2px 0; white-space:nowrap; color:#fff;'>${r.name}</td>`;
            if (r.temp !== undefined) html += `<td style='padding:2px 8px; color:${r.colorT};'>T: <b>${r.temp}</b>°C</td>`; else html += `<td style='padding:2px 8px; color:#555;'>T: -</td>`;
            if (r.hum !== undefined) html += `<td style='padding:2px 0; color:${r.colorH};'>H: <b>${r.hum}</b>%</td>`; else html += `<td style='padding:2px 0; color:#555;'>H: -</td>`;
            html += `</tr>`;
          });
          html += `</table>`;
          return html;
        }
      },
      plotOptions: { series: { animation: { duration: 600 }, showInLegend: true, turboThreshold: 5000 } },
      series: []
    };
    setTimeout(() => {
      const el = document.getElementById('dryersHighchart');
      if (el) { this.chart = Highcharts.chart(el, this.chartOptions); }
    });
  }

  private seriesKey(dryerId: number, type: 'temp' | 'hum'): string {
    return `${dryerId}:${type}`;
  }

  private updateSeries(summaries: DryerStateSummary[]) {
    if (!this.chart) return;
    const t0 = performance.now();

    const existing = new Map<string, Highcharts.Series>();
    this.chart.series.forEach(s => existing.set(s.options.id as string, s));

    const desiredIds: string[] = [];

    let totalPoints = 0;
    const limit = this.RANGE_POINT_LIMITS[this.timeRange];

    summaries.forEach(s => {
      const tempId = this.seriesKey(s.dryerId, 'temp');
      const humId = this.seriesKey(s.dryerId, 'hum');
      desiredIds.push(tempId, humId);

      // Build unified paired arrays so that tooltip rows always have both metrics when original sample had them.
      // We form a base list of points with both values; if humidity or temperature missing, keep undefined to allow placeholder.
      let raw: { x: number; t: number; h: number }[] = s.logs.map(l => ({ x: l.epoch_ms ?? Date.parse(l.timestamp), t: l.temperature, h: l.relative_humidity }));
      if (raw.length > 1 && raw[raw.length-1].x < raw[raw.length-2].x) {
        raw = [...raw].sort((a,b) => a.x - b.x);
        this.logger.warn('DashboardCharts', 'corrected out-of-order log sequence', { dryer: s.dryerId, count: raw.length });
      }

      let paired: { x: number; t: number; h: number }[] = raw;

      // Paired adaptive sampling: choose indices once (based on combined importance of both series) then project to two series.
      if ((['1h','6h','12h','all'].includes(this.timeRange) || raw.length > limit)) {
        // Use simplified LTTB-like selection on combined metric: average normalized variance of t & h.
        const threshold = Math.min(limit, raw.length);
        if (threshold < raw.length) {
          // Precompute min/max for normalization
          let minT = Infinity, maxT = -Infinity, minH = Infinity, maxH = -Infinity;
            raw.forEach(p => { if (p.t < minT) minT = p.t; if (p.t > maxT) maxT = p.t; if (p.h < minH) minH = p.h; if (p.h > maxH) maxH = p.h; });
          const norm = (v: number, min: number, max: number) => (max - min) === 0 ? 0 : (v - min) / (max - min);
          const data: [number, number][] = raw.map(r => [r.x, (norm(r.t, minT, maxT) + norm(r.h, minH, maxH)) / 2]);
          // Reuse existing lttb on combined metric to get indices
          const sampled = this.lttb(data, threshold);
          const keep = new Set(sampled.map(p => p[0]));
          paired = raw.filter(p => keep.has(p.x));
          // Ensure last point included
          if (paired[paired.length - 1]?.x !== raw[raw.length - 1].x) paired.push(raw[raw.length - 1]);
        }
      }

      // Project paired into separate arrays
      let tempData: [number, number][] = paired.map(p => [p.x, p.t]);
      let humData: [number, number][] = paired.map(p => [p.x, p.h]);

      totalPoints += tempData.length + humData.length;

      // Build a signature to avoid unnecessary setData (count + last x)
      const sigTemp = `${tempData.length}|${tempData.length?tempData[tempData.length-1][0]:0}|${this.timeRange}`;
      const sigHum = `${humData.length}|${humData.length?humData[humData.length-1][0]:0}|${this.timeRange}`;

      if (existing.has(tempId)) {
        const prevSig = this.seriesCache.get(tempId);
        if (prevSig !== sigTemp) {
          existing.get(tempId)!.setData(tempData, false, false, false);
          this.seriesCache.set(tempId, sigTemp);
          this.logger.debug('DashboardCharts', 'updated temp series', { dryer: s.dryerId, points: tempData.length });
        }
        existing.delete(tempId);
      } else {
        this.chart!.addSeries({ id: tempId, name: `${s.name || 'Dryer ' + s.dryerId} T`, type: 'spline', data: tempData, yAxis: 0, animation: (this.firstData && tempData.length < this.NO_ANIMATION_LIMIT) }, false);
        this.seriesCache.set(tempId, sigTemp);
        this.logger.debug('DashboardCharts', 'added temp series', { dryer: s.dryerId, points: tempData.length });
      }

      if (existing.has(humId)) {
        const prevSig = this.seriesCache.get(humId);
        if (prevSig !== sigHum) {
          existing.get(humId)!.setData(humData, false, false, false);
          this.seriesCache.set(humId, sigHum);
          this.logger.debug('DashboardCharts', 'updated hum series', { dryer: s.dryerId, points: humData.length });
        }
        existing.delete(humId);
      } else {
        this.chart!.addSeries({ id: humId, name: `${s.name || 'Dryer ' + s.dryerId} H`, type: 'spline', data: humData, yAxis: 1, dashStyle: 'ShortDot', animation: (this.firstData && humData.length < this.NO_ANIMATION_LIMIT) }, false);
        this.seriesCache.set(humId, sigHum);
        this.logger.debug('DashboardCharts', 'added hum series', { dryer: s.dryerId, points: humData.length });
      }
    });

    existing.forEach((series, id) => { if (!desiredIds.includes(id)) series.remove(false); });

    if (totalPoints > this.BOOST_TOTAL_THRESHOLD) {
      this.ensureBoostLoaded();
      // Highcharts will auto pick boost when threshold met; force a redraw after load
    }

    this.chart.redraw();
    const dt = (performance.now() - t0).toFixed(1);
    this.logger.debug('DashboardCharts', 'updateSeries complete', { totalPoints, series: this.chart.series.length, dt });

    // Only mark as having data if we actually rendered something
    if (this.firstData && summaries.length > 0 && totalPoints > 0) {
      // Disable animation for subsequent incremental updates
      this.firstData = false;
      this.hasChartData = true; // Mark that chart has been populated with data
    }

    // Stop loading indicator after successful render with data
    if (summaries.length > 0 && totalPoints > 0) {
      this.isLoadingNewData = false;
    }
  }

  onTimeRangeChange() {
    this.dashboard.setTimeRange(this.timeRange);
  }

  setRange(r: TimeRangeKey) {
    if (r === this.timeRange) return;
    this.logger.info('DashboardCharts', 'user setRange', { to: r });
    this.isLoadingNewData = true; // Show loading immediately
    this.timeRange = r;
    this.dashboard.setTimeRange(r);
  }

  private redrawXAxis() {
    if (!this.chart) return;
    this.chart.xAxis[0].update({}, false);
    this.chart.redraw();
    this.logger.debug('DashboardCharts', 'redrawXAxis');
  }

  ngOnDestroy(): void {
    this.logger.debug('DashboardCharts', 'ngOnDestroy');
    this.subs.forEach(s => s.unsubscribe());
    try { this.chart?.destroy(); } catch {}
  }
}
