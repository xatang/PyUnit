import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast';
import { MoonrakerConfigService, MoonrakerConfig } from './moonraker-config.service';
import { LoggingService } from '../../../services/logging.service';

@Component({
  selector: 'app-moonraker-config',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './moonraker-config.html',
  styleUrl: './moonraker-config.scss'
})
export class MoonrakerConfigPage implements OnInit {
  configForm!: FormGroup;
  isLoading = false;
  isTesting = false;
  testResult: { success: boolean; message: string } | null = null;
  showApiKey = false;

  constructor(
    private fb: FormBuilder,
    private moonrakerConfigService: MoonrakerConfigService,
    private toastService: ToastService,
    private logger: LoggingService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadConfig();
  }

  private initForm(): void {
    this.configForm = this.fb.group({
      moonraker_api_method: ['http', Validators.required],
      moonraker_ip: ['', [Validators.required, Validators.pattern(/^([0-9]{1,3}\.){3}[0-9]{1,3}$/)]],
      moonraker_port: [7125, [Validators.required, Validators.min(1), Validators.max(65535)]],
      moonraker_api_key: ['']
    });
  }

  loadConfig(): void {
    this.isLoading = true;
    this.moonrakerConfigService.getConfig().subscribe({
      next: (data) => {
        this.configForm.patchValue(data);
        this.isLoading = false;
      },
      error: (error) => {
        this.logger.error('MoonrakerConfig', 'Error loading config', error);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.configForm.invalid) return;

    this.isLoading = true;
    this.moonrakerConfigService.saveConfig(this.configForm.value).subscribe({
      next: (response) => {
        this.logger.info('MoonrakerConfig', 'Config saved successfully', response);
        this.isLoading = false;
        this.toastService.show('Configuration saved successfully!', { classname: 'bg-success text-light', delay: 3000 });
      },
      error: (error) => {
        this.logger.error('MoonrakerConfig', 'Error saving config', error);
        this.isLoading = false;
        this.toastService.show('Error saving configuration.', { classname: 'bg-danger text-light', delay: 3000 });
      }
    });
  }

  testConnection(): void {
    if (this.configForm.invalid) return;

    this.isTesting = true;
    this.testResult = null;

    this.moonrakerConfigService.testConnection(this.configForm.value).subscribe({
      next: (response: any) => {
        this.isTesting = false;
        this.testResult = {
          success: response.success,
          message: response.message || 'Connection successful!'
        };
      },
      error: (error) => {
        this.isTesting = false;
        this.testResult = {
          success: false,
          message: error.error?.message || 'Connection failed!'
        };
      }
    });
  }

  toggleApiKeyVisibility(): void {
    this.showApiKey = !this.showApiKey;
  }
}
