// Dashboard service: connects to dryers stats WebSocket and exposes structured streams.
// Text/comments in English as requested.
import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { LoggingService } from '../../services/logging.service';
import { environment } from '../../../environments';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';

// Backend DryerShort (from /api/common/units)
export interface DryerShort {
  id: number;
  name: string;
}

// Interface representing a single dryer log entry coming from backend (mirrors DryerLog schema)
export interface DryerLog {
  id: number;
  dryer_id: number;
  timestamp: string; // ISO string
  status: string;
  heater_temperature: number; // renamed (backend previously had typo heater_temperatute)
  heater_is_on: boolean;
  heater_fan_is_run: boolean;
  temperature: number;
  servo_is_open: boolean;
  absolute_humidity: number;
  relative_humidity: number;
  current_preset_id?: number | null; // newly provided by backend WS
  // Added field from backend (seconds remaining in drying phase or null)
  time_left_drying?: number | null;
  // Added derived field (not from backend) for faster filtering
  epoch_ms?: number;
}

export interface DryerStateSummary {
  dryerId: number;
  name?: string;
  lastLog?: DryerLog;
  status?: string;
  temperature?: number;
  humidity?: number; // relative_humidity
  heaterOn?: boolean;
  servoOpen?: boolean;
  updatedAt?: string; // timestamp of last log
  currentPresetId?: number | null;
  currentPresetName?: string;
  // Exposed remaining time in seconds if provided by backend
  timeLeftDryingSeconds?: number | null;
  logs: DryerLog[]; // full timeline (pruned)
}

// Preset interfaces for mapping
export interface PresetShort {
  id: number;
  name: string;
  dryers?: { id: number; name?: string }[]; // from backend (list of dryers this preset is attached to)
}

export type TimeRangeKey = '5m' | '10m' | '1h' | '6h' | '12h' | 'all';

const TIME_RANGE_WINDOWS_MS: Record<Exclude<TimeRangeKey, 'all'>, number> = {
  '5m': 5 * 60 * 1000,
  '10m': 10 * 60 * 1000,
  '1h': 60 * 60 * 1000,
  '6h': 6 * 60 * 60 * 1000,
  '12h': 12 * 60 * 60 * 1000
};

interface InternalState {
  dryers: DryerShort[];
  summaries: Map<number, DryerStateSummary>;
  timeRange: TimeRangeKey;
}

@Injectable({ providedIn: 'root' })
export class DashboardService implements OnDestroy {
  private ws?: WebSocket;
  private reconnectAttempts = 0;
  private readonly maxReconnectDelay = 15000;
  private lifecycleDestroyed = false; // Angular service destroyed
  private shouldReconnect = false;    // Only true while logically connected
  private reconnectTimeout?: any;
  private unitsRefreshInterval?: any;
  private readonly UNITS_REFRESH_INTERVAL_MS = 15_000; // 15 seconds (more responsive syncing)

  private state: InternalState = {
    dryers: [],
    summaries: new Map<number, DryerStateSummary>(),
    timeRange: '1h'
  };

  private dryers$ = new BehaviorSubject<DryerShort[]>([]);
  private summaries$ = new BehaviorSubject<DryerStateSummary[]>([]);
  private timeRange$ = new BehaviorSubject<TimeRangeKey>('1h');
  private connectionStatus$ = new BehaviorSubject<'connecting' | 'open' | 'closed' | 'error'>('closed');
  // Throttling for summaries emission
  private summariesDirty = false;
  private summariesThrottleTimer?: any;
  private readonly SUMMARIES_THROTTLE_MS = 400; // adjust for smoother UI vs freshness
  private presetsCache: Map<number, string> = new Map();
  private presetsLoaded = false;
  private presetsAll: PresetShort[] = [];
  private presets$ = new BehaviorSubject<PresetShort[]>([]);

  constructor(private zone: NgZone, private logger: LoggingService) {}
  private initialUnitsLoaded = false;
  private initialUnitsAttempts = 0;
  private readonly INITIAL_UNITS_MAX_ATTEMPTS = 5;
  private initialUnitsRetryTimer?: any;

  /** Explicitly initiate data + websocket connection. Safe to call multiple times. */
  connect() {
    if (this.shouldReconnect && this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return; // already connecting/connected
    }
    // Full reset to avoid duplicated historical data when returning to page
    this.state.dryers = [];
    this.state.summaries.clear();
    this.pushSummaries(); // emit empty to allow UI to clear instantly

    this.shouldReconnect = true;
    this.reconnectAttempts = 0;
    this.connectionStatus$.next('connecting');
  this.logger.info('DashboardSvc', 'connect(): fetching units...');
  this.fetchDryers(false, true); // treat as initial fetch with retry support
    this.fetchPresets();
    this.openWebSocket();
    this.startUnitsRefreshTimer();
  }

  /** Stop websocket + timers and prevent automatic reconnection until connect() called again. */
  disconnect() {
    this.shouldReconnect = false;
    this.clearReconnectTimeout();
    this.clearUnitsRefreshTimer();
    try { this.ws?.close(); } catch {}
    this.ws = undefined;
    this.connectionStatus$.next('closed');
  }

  // Public observables
  getDryers(): Observable<DryerShort[]> { return this.dryers$.asObservable(); }
  getSummaries(): Observable<DryerStateSummary[]> { return this.summaries$.asObservable(); }
  getTimeRange(): Observable<TimeRangeKey> { return this.timeRange$.asObservable(); }
  getConnectionStatus(): Observable<'connecting' | 'open' | 'closed' | 'error'> { return this.connectionStatus$.asObservable(); }
  getPresets(): Observable<PresetShort[]> { return this.presets$.asObservable(); }

  /** Stop (cancel preset) for a dryer: POST /dashboard/control/set-preset/{id} without preset id */
  async stopDryer(dryerId: number): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${environment.apiUrl}/dashboard/control/set-preset/${dryerId}`, {
        method: 'POST'
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Failed to stop dryer ${dryerId}`);
      }
      const json = await res.json();
      this.logger.info('DashboardSvc', 'stopDryer success', { dryerId, response: json });
      // Optimistic local state update: set status to pending if we already track the dryer
      const summary = this.state.summaries.get(dryerId);
      if (summary) {
        summary.status = 'pending';
        summary.lastLog = undefined; // will be replaced by next real log
        this.markSummariesDirty();
      }
      return json;
    } catch (err: any) {
      this.logger.error('DashboardSvc', 'stopDryer failed', { dryerId, error: err });
      throw err;
    }
  }

  /** Start dryer with given preset id */
  async startDryer(dryerId: number, presetId: number): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch(`${environment.apiUrl}/dashboard/control/set-preset/${dryerId}?preset_id=${presetId}`, { method: 'POST' });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Failed to start dryer ${dryerId}`);
      }
      const json = await res.json();
      this.logger.info('DashboardSvc', 'startDryer success', { dryerId, presetId, response: json });
      const summary = this.state.summaries.get(dryerId);
      if (summary) {
        // optimistic: reflect drying status & preset (actual log will confirm)
        summary.status = 'drying';
        summary.currentPresetId = presetId;
        if (this.presetsCache.has(presetId)) summary.currentPresetName = this.presetsCache.get(presetId);
        this.markSummariesDirty();
      }
      return json;
    } catch (err: any) { throw err; }
  }

  setTimeRange(range: TimeRangeKey) {
    this.state.timeRange = range;
    this.timeRange$.next(range);
    // Immediate push on range change (no throttle) for responsive UX
    this.flushSummaries();
  }

  private async fetchDryers(silent = false, isInitial = false) {
    try {
      const t0 = performance.now();
      const res = await fetch(`${environment.apiUrl}/common/units`);
      if (!res.ok) throw new Error('Failed to load dryers');
      const data: DryerShort[] = await res.json();
      this.state.dryers = data;
      // Update names of existing summaries only (don't create phantom entries until logs arrive)
      data.forEach(d => {
        const existing = this.state.summaries.get(d.id);
        if (existing) existing.name = d.name;
      });
      // Pre-create placeholder summaries so UI can show named cards even before first log
      data.forEach(d => {
        if (!this.state.summaries.has(d.id)) {
          this.state.summaries.set(d.id, { dryerId: d.id, name: d.name, logs: [] });
        }
      });
      if (!this.initialUnitsLoaded && data.length > 0) {
        this.initialUnitsLoaded = true;
        if (this.initialUnitsRetryTimer) { clearTimeout(this.initialUnitsRetryTimer); this.initialUnitsRetryTimer = undefined; }
      }
      // Prune summaries that no longer exist (stale after deletion)
      const currentIds = new Set(data.map(d => d.id));
      let pruned = false;
      Array.from(this.state.summaries.keys()).forEach(id => {
        if (!currentIds.has(id)) {
          this.state.summaries.delete(id);
          pruned = true;
        }
      });
      this.dryers$.next(data);
      // Always push summaries when we fetched (even silent) if names were potentially updated
      // so that UI reflects dryer names immediately rather than waiting for new logs.
      if (!silent || pruned) {
        this.pushSummaries();
      } else {
        // For silent refresh where only names may have changed, emit without throttling.
        this.flushSummaries();
      }
      const dt = (performance.now() - t0).toFixed(0);
  this.logger.debug('DashboardSvc', `/common/units loaded count=${data.length} dt=${dt}ms silent=${silent} initial=${isInitial}`);
    } catch (e) {
  this.logger.error('DashboardSvc', 'units fetch failed', e);
    } finally {
      if (isInitial && !this.initialUnitsLoaded) {
        this.initialUnitsAttempts++;
        if (this.initialUnitsAttempts < this.INITIAL_UNITS_MAX_ATTEMPTS) {
          if (this.initialUnitsRetryTimer) clearTimeout(this.initialUnitsRetryTimer);
          this.initialUnitsRetryTimer = setTimeout(() => {
            if (this.shouldReconnect && !this.initialUnitsLoaded) {
              this.logger.info('DashboardSvc', `retry units fetch attempt ${this.initialUnitsAttempts+1}`);
              this.fetchDryers(false, true);
            }
          }, 2000);
        } else {
          this.logger.warn('DashboardSvc', 'max initial units fetch attempts reached');
        }
      }
    }
  }

  private async fetchPresets() {
    try {
      const res = await fetch(`${environment.apiUrl}/common/presets`);
      if (!res.ok) throw new Error('Failed to load presets');
      const data: any[] = await res.json();
      this.presetsCache.clear();
      this.presetsAll = [];
  data.forEach(p => { if (p && typeof p.id === 'number') this.presetsCache.set(p.id, p.name); });
  data.forEach(p => { if (p && typeof p.id === 'number') this.presetsAll.push({ id: p.id, name: p.name, dryers: p.dryers }); });
      this.presets$.next([...this.presetsAll]);
      this.presetsLoaded = true;
      // Attempt to backfill any existing summaries missing names
      let updated = false;
      this.state.summaries.forEach(s => {
        if (s.currentPresetId && !s.currentPresetName) {
          const nm = this.presetsCache.get(s.currentPresetId);
          if (nm) { s.currentPresetName = nm; updated = true; }
        }
      });
      if (updated) this.flushSummaries();
    } catch (e) {
  this.logger.warn('DashboardSvc', 'fetchPresets failed', e);
    }
  }

  private openWebSocket() {
    if (!this.shouldReconnect) return; // guard
    const url = `${environment.wsUrl}/dashboard/dryers`.replace('http', 'ws');
    this.connectionStatus$.next('connecting');
    this.ws = new WebSocket(url);

    this.ws.onopen = () => {
      this.zone.run(() => {
        this.connectionStatus$.next('open');
        this.reconnectAttempts = 0;
      });
    };

    this.ws.onclose = () => {
      this.zone.run(() => {
        this.connectionStatus$.next('closed');
        if (!this.lifecycleDestroyed && this.shouldReconnect) this.scheduleReconnect();
      });
    };

    this.ws.onerror = () => {
      this.zone.run(() => {
        this.connectionStatus$.next('error');
      });
    };

    this.ws.onmessage = (ev) => {
      // Payload can be either {history:[...]} or an array '[{...},{...}]'
      this.zone.run(() => {
        try {
          const text = ev.data;
          const parsed = JSON.parse(text);
          if (parsed && parsed.history) {
            // Initial history load
            const arr: DryerLog[] = parsed.history;
            this.ingestLogs(arr, true);
          } else if (Array.isArray(parsed)) {
            const arr: DryerLog[] = parsed;
            this.ingestLogs(arr, false);
          }
        } catch (err) {
          this.logger.warn('DashboardSvc', 'WS message parse error', err);
        }
      });
    };
  }

  private scheduleReconnect() {
    this.reconnectAttempts++;
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), this.maxReconnectDelay);
    this.clearReconnectTimeout();
    this.logger.warn('DashboardSvc', 'scheduleReconnect', { attempt: this.reconnectAttempts, delay });
    this.reconnectTimeout = setTimeout(() => {
      if (!this.lifecycleDestroyed && this.shouldReconnect) this.openWebSocket();
    }, delay);
  }

  private clearReconnectTimeout() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = undefined;
    }
  }

  private startUnitsRefreshTimer() {
    this.clearUnitsRefreshTimer();
    this.unitsRefreshInterval = setInterval(() => {
      if (this.shouldReconnect) this.fetchDryers(true);
    }, this.UNITS_REFRESH_INTERVAL_MS);
  }

  private clearUnitsRefreshTimer() {
    if (this.unitsRefreshInterval) {
      clearInterval(this.unitsRefreshInterval);
      this.unitsRefreshInterval = undefined;
    }
  }

  private ingestLogs(logs: DryerLog[], isHistory: boolean) {
    if (!logs || logs.length === 0) return;
    const batchSize = logs.length;
    this.logger.debug('DashboardSvc', 'ingestLogs batch', { batchSize, isHistory });
    const now = Date.now();
    // Track which summaries became unsorted (out-of-order timestamps) to re-sort once.
    const unsortedSummaries = new Set<number>();

    logs.forEach(raw => {
      // Normalize timestamp to local epoch
      let ts = raw.timestamp;
      // If timestamp lacks timezone designator assume UTC then shift to local
      if (!/[zZ]|[+\-]\d{2}:?\d{2}$/.test(ts)) {
        // treat as UTC explicitly
        ts = ts + 'Z';
      }
      const epoch = Date.parse(ts);
      const log: DryerLog = { ...raw, timestamp: ts, epoch_ms: epoch };

      if (isNaN(epoch)) return; // skip malformed

      // Accept only if dryer is known from current API list
      if (!this.state.dryers.find(d => d.id === log.dryer_id)) {
        return; // ignore logs for non-existent / removed dryer (prevents phantom card)
      }
      let summary = this.state.summaries.get(log.dryer_id);
      if (!summary) {
        const dryer = this.state.dryers.find(d => d.id === log.dryer_id);
        summary = { dryerId: log.dryer_id, logs: [], name: dryer?.name };
        this.state.summaries.set(log.dryer_id, summary);
      }
      // De-duplication: skip if last log id or timestamp matches
      const last = summary.logs[summary.logs.length - 1];
      if (last && (last.id === log.id || (last.epoch_ms === log.epoch_ms && last.status === log.status))) {
        return; // duplicate
      }
      // Detect out-of-order before push
      const prevLast = summary.logs[summary.logs.length - 1];
      if (prevLast && prevLast.epoch_ms !== undefined && log.epoch_ms !== undefined && log.epoch_ms < prevLast.epoch_ms) {
        unsortedSummaries.add(summary.dryerId);
      }
      summary.logs.push(log);
      // Determine if this log is out-of-order (older than current last)
      const isOutOfOrder = prevLast && prevLast.epoch_ms !== undefined && log.epoch_ms !== undefined && log.epoch_ms < prevLast.epoch_ms;

      // Only promote to summary.lastLog if not out-of-order (final ordering handled later for unsorted summaries)
      if (!isOutOfOrder) {
        summary.lastLog = log;
        summary.status = log.status;
        summary.temperature = log.temperature;
        summary.humidity = log.relative_humidity;
        summary.heaterOn = log.heater_is_on;
        summary.servoOpen = log.servo_is_open;
        summary.updatedAt = new Date(log.epoch_ms!).toISOString();

        // Preserve previous preset id/name to avoid UI flicker when transient nulls arrive
        const incomingPresetId = log.current_preset_id ?? null;
        const statusKeep = ['drying','timer_drying','humidity_storage','temperature_storage'];
        const activeState = statusKeep.includes((summary.status || '').toLowerCase());
        const haveExisting = !!summary.currentPresetId;
        // If we are still in an active state and new log lost preset id, keep previous id/name
        if (incomingPresetId === null && activeState && haveExisting) {
          // do nothing -> retain existing id/name
        } else {
          summary.currentPresetId = incomingPresetId;
          if (incomingPresetId && this.presetsCache.has(incomingPresetId)) {
            summary.currentPresetName = this.presetsCache.get(incomingPresetId);
          }
          if (incomingPresetId === null && !activeState) {
            summary.currentPresetName = undefined; // real reset
          }
        }
        summary.timeLeftDryingSeconds = log.time_left_drying ?? null;
      }

      const cutoff = now - 24 * 60 * 60 * 1000;
      if (summary.logs.length > 5000) {
        summary.logs = summary.logs.filter(l => (l.epoch_ms ?? 0) >= cutoff);
        this.logger.debug('DashboardSvc', 'pruned logs for dryer', { dryerId: summary.dryerId, remaining: summary.logs.length });
      }
    });

    // Normalize ordering & dedupe by epoch if any unsorted detected.
    if (unsortedSummaries.size) {
      unsortedSummaries.forEach(id => {
        const s = this.state.summaries.get(id);
        if (!s || s.logs.length < 2) return;
        // Sort ascending by epoch_ms (fallback to Date.parse if missing)
        s.logs.sort((a,b) => (a.epoch_ms ?? Date.parse(a.timestamp)) - (b.epoch_ms ?? Date.parse(b.timestamp)));
        // Dedupe identical epoch_ms keeping last occurrence (latest data)
        const dedup: DryerLog[] = [];
        for (let i=0;i<s.logs.length;i++) {
          const cur = s.logs[i];
            if (dedup.length && (dedup[dedup.length-1].epoch_ms === cur.epoch_ms)) {
              // Replace previous with current (assume current newer arrival has most accurate values)
              dedup[dedup.length-1] = cur;
            } else {
              dedup.push(cur);
            }
        }
        s.logs = dedup;
        s.lastLog = s.logs[s.logs.length - 1];
        this.logger.warn('DashboardSvc', 'corrected out-of-order logs', { dryerId: id, count: s.logs.length });
      });
    }

    this.markSummariesDirty();
  }

  private pushSummaries() {
    const range = this.state.timeRange;
    const now = Date.now();
    const windowMs = range === 'all' ? undefined : TIME_RANGE_WINDOWS_MS[range as Exclude<TimeRangeKey, 'all'>];

    const out: DryerStateSummary[] = [];
    this.state.summaries.forEach((summary, key) => {
      // If dryer no longer in current list, remove summary (hard sync)
      if (!this.state.dryers.find(d => d.id === summary.dryerId)) {
        this.state.summaries.delete(key);
        return;
      }
      if (!windowMs || summary.logs.length === 0) {
        out.push(summary);
      } else {
        const filtered = summary.logs.filter(l => (l.epoch_ms ? now - l.epoch_ms <= windowMs : false));
        if (filtered.length === 0 && summary.logs.length > 0) {
          const last = summary.logs[summary.logs.length - 1];
          out.push({ ...summary, logs: [last] });
        } else {
          out.push({ ...summary, logs: filtered });
        }
      }
    });
    this.summaries$.next(out);
    this.summariesDirty = false;
    this.logger.debug('DashboardSvc', 'pushSummaries emitted', { count: out.length, range });
  }

  private markSummariesDirty() {
    if (!this.summariesDirty) this.summariesDirty = true;
    if (!this.summariesThrottleTimer) {
      this.summariesThrottleTimer = setTimeout(() => {
        this.summariesThrottleTimer = undefined;
        if (this.summariesDirty) this.pushSummaries();
      }, this.SUMMARIES_THROTTLE_MS);
      this.logger.debug('DashboardSvc', 'markSummariesDirty scheduled flush');
    }
  }

  private flushSummaries() {
    if (this.summariesThrottleTimer) {
      clearTimeout(this.summariesThrottleTimer);
      this.summariesThrottleTimer = undefined;
    }
    this.pushSummaries();
  }

  ngOnDestroy(): void {
    this.lifecycleDestroyed = true;
    this.disconnect();
    if (this.initialUnitsRetryTimer) { clearTimeout(this.initialUnitsRetryTimer); this.initialUnitsRetryTimer = undefined; }
    if (this.summariesThrottleTimer) {
      clearTimeout(this.summariesThrottleTimer);
      this.summariesThrottleTimer = undefined;
    }
  }
}
