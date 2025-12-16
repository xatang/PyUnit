import { Injectable } from '@angular/core';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'off';

interface LogEntry {
  ts: string;
  level: LogLevel;
  scope?: string;
  message: any[];
}

@Injectable({ providedIn: 'root' })
export class LoggingService {
  private level: LogLevel = 'info';
  private readonly LS_KEY = 'app.log.level';
  private history: LogEntry[] = [];
  private maxHistory = 500;

  constructor() {
    const stored = localStorage.getItem(this.LS_KEY) as LogLevel | null;
    if (stored && ['debug','info','warn','error','off'].includes(stored)) {
      this.level = stored;
    }
  }

  setLevel(l: LogLevel) {
    this.level = l;
    localStorage.setItem(this.LS_KEY, l);
    this.internal('info', 'Logger', ['Log level set to', l]);
  }

  getLevel(): LogLevel { return this.level; }

  debug(scope: string, ...args: any[]) { this.internal('debug', scope, args); }
  info(scope: string, ...args: any[]) { this.internal('info', scope, args); }
  warn(scope: string, ...args: any[]) { this.internal('warn', scope, args); }
  error(scope: string, ...args: any[]) { this.internal('error', scope, args); }

  private passes(level: LogLevel): boolean {
    const order: LogLevel[] = ['debug','info','warn','error','off'];
    const currentIdx = order.indexOf(this.level);
    const msgIdx = order.indexOf(level);
    if (this.level === 'off') return false;
    return msgIdx >= currentIdx;
  }

  private internal(level: LogLevel, scope: string, args: any[]) {
    if (!this.passes(level)) return;
    const ts = new Date().toISOString();
    const prefix = `[${ts}] [${level.toUpperCase()}]${scope? ' ['+scope+']' : ''}`;
    switch(level) {
      case 'debug': console.debug(prefix, ...args); break;
      case 'info': console.info(prefix, ...args); break;
      case 'warn': console.warn(prefix, ...args); break;
      case 'error': console.error(prefix, ...args); break;
    }
    this.history.push({ ts, level, scope, message: args });
    if (this.history.length > this.maxHistory) this.history.shift();
  }

  getHistory(): LogEntry[] { return [...this.history]; }
}
