import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];
  private lastShown: Map<string, number> = new Map();
  private readonly DEDUP_WINDOW_MS = 1500; // window to suppress duplicate messages

  show(message: string, options: any = {}) {
    const now = Date.now();
    const key = options.dedupKey || message;
    const last = this.lastShown.get(key) || 0;
    if (now - last < this.DEDUP_WINDOW_MS) return; // suppress duplicate
    this.lastShown.set(key, now);
    const toast = { message, ...options };
    this.toasts.push(toast);

    if (!options.delay) {
      setTimeout(() => this.remove(toast), 5000);
    } else {
      setTimeout(() => this.remove(toast), options.delay);
    }
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  clear() {
    this.toasts = [];
    this.lastShown.clear();
  }
}
