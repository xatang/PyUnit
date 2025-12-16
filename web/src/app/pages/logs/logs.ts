import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { LogsService } from './logs.service';
import { LoggingService } from '../../services/logging.service';
import { environment } from '../../../environments';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-logs',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './logs.html',
  styleUrl: './logs.scss'
})
export class LogsPage implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('logContainer') private logContainer!: ElementRef;

  private wsUrl = environment.wsUrl;

  // Форма
  logForm: FormGroup;

  // Данные логов
  appLogs: string[] = [];
  dryerLogs: string[] = [];

  // Состояние UI
  activeTab: 'app' | 'dryer' = 'dryer';
  isLoading = true;

  private shouldScrollToBottom = false;
  private appLogsSubscription: any;
  private dryerLogsSubscription: any;

  constructor(
    private fb: FormBuilder,
    private logsService: LogsService,
    private sanitizer: DomSanitizer,
    private logger: LoggingService
  ) {
    this.logForm = this.fb.group({
      searchTerm: [''],
      autoScroll: [true]
    });
  }

  ngOnInit() {
    this.connectToLogs();
  }

  ngAfterViewChecked() {
    if (this.shouldScrollToBottom && this.autoScroll) {
      this.scrollToBottom();
      this.shouldScrollToBottom = false;
    }
  }

  ngOnDestroy() {
    this.logsService.disconnectAll();
    if (this.appLogsSubscription) {
      this.appLogsSubscription.unsubscribe();
    }
    if (this.dryerLogsSubscription) {
      this.dryerLogsSubscription.unsubscribe();
    }
  }

  // Получение значения autoScroll из формы
  get autoScroll(): boolean {
    return this.logForm.get('autoScroll')?.value;
  }

  // Переключение автоскролла
  toggleAutoScroll(): void {
    const currentValue = this.autoScroll;
    this.logForm.get('autoScroll')?.setValue(!currentValue);

    // Если включаем автоскролл, сразу прокручиваем вниз
    if (!currentValue) {
      this.scrollToBottom();
    }
  }

  // Подключение к логам через сервис
  private connectToLogs() {
    this.isLoading = true;

    // Отпишемся от предыдущих подписок
    if (this.appLogsSubscription) {
      this.appLogsSubscription.unsubscribe();
    }
    if (this.dryerLogsSubscription) {
      this.dryerLogsSubscription.unsubscribe();
    }

    this.logsService.disconnectAll();

    // Подписка на логи приложения
    this.appLogsSubscription = this.logsService.appLogs$.subscribe({
      next: (log) => {
        this.isLoading = false;
        this.appLogs.push(log);
        if (this.activeTab === 'app') {
          this.shouldScrollToBottom = true;
        }
      },
      error: (error) => {
        this.logger.error('LogsPage', 'App logs error', error);
      }
    });

    // Подписка на логи dryer
    this.dryerLogsSubscription = this.logsService.dryerLogs$.subscribe({
      next: (log) => {
        this.isLoading = false;
        this.dryerLogs.push(log);
        if (this.activeTab === 'dryer') {
          this.shouldScrollToBottom = true;
        }
      },
      error: (error) => {
        this.logger.error('LogsPage', 'Dryer logs error', error);
      }
    });

    // Подключение к WebSocket
    try {
      this.logsService.connectToAppLogs(`${this.wsUrl}/logs/app`);
      this.logsService.connectToDryerLogs(`${this.wsUrl}/logs/dryer`);
    } catch (error) {
      this.logger.error('LogsPage', 'WebSocket connection failed', error);
    }
  }

  // Фильтрованные логи
  get filteredLogs(): string[] {
    const logs = this.activeTab === 'app' ? this.appLogs : this.dryerLogs;
    const searchTerm = this.logForm.get('searchTerm')?.value;

    if (!searchTerm) {
      return logs;
    }

    const searchLower = searchTerm.toLowerCase();
    return logs.filter(log => log.toLowerCase().includes(searchLower));
  }

  // Переключение вкладок
  switchTab(tab: 'app' | 'dryer') {
    this.activeTab = tab;
    this.shouldScrollToBottom = true;
  }

  // Прокрутка к нижней части логов (публичный метод для кнопки)
  scrollToBottom(): void {
    if (this.logContainer && this.logContainer.nativeElement) {
      try {
        const element = this.logContainer.nativeElement;
        element.scrollTop = element.scrollHeight;
      } catch (err) {
        this.logger.warn('LogsPage', 'Scroll error', err);
      }
    }
  }

  // Очистка логов
  clearLogs(): void {
    if (this.activeTab === 'app') {
      this.appLogs = [];
    } else {
      this.dryerLogs = [];
    }
  }

  // Подсветка результатов поиска
  highlightSearch(text: string): SafeHtml {
    const searchTerm = this.logForm.get('searchTerm')?.value;
    if (!searchTerm) return text;

    const pattern = new RegExp(this.escapeRegExp(searchTerm), 'gi');
    const highlighted = text.replace(pattern, match =>
      `<span style="background-color: #ffeb3b; color: #000; padding: 0 2px; border-radius: 3px; font-weight: bold;">${match}</span>`
    );

    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  }

  // Экранирование специальных символов для RegExp
  private escapeRegExp(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Текущее время для отображения
  get now(): Date {
    return new Date();
  }
}
