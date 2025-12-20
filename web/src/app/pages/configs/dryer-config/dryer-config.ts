import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../services/toast';
import { DryersService, Dryer, MoonrakerObjectsResponse } from './dryer-config.service';
import { LoggingService } from '../../../services/logging.service';

@Component({
  selector: 'app-dryer-config',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './dryer-config.html',
  styleUrl: './dryer-config.scss'
})
export class DryerConfigPage implements OnInit {
  dryerForm!: FormGroup;
  dryers: Dryer[] = [];
  editingDryer: Dryer | null = null;
  isFromWelcome = false;

  // Данные для выпадающих списков
  heaters: string[] = [];
  fans: string[] = [];
  temperatureSensors: string[] = [];
  leds: string[] = [];
  servos: string[] = [];

  isLoading = false;
  isSaving = false;
  isLoadingObjects = false;
  isLoadingConfig = false;

  constructor(
    private dryersService: DryersService,
    private toastService: ToastService,
    private fb: FormBuilder,
    private logger: LoggingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadDryers();
    this.loadMoonrakerObjects();
    // Check if coming from welcome page
    this.isFromWelcome = this.route.snapshot.queryParamMap.get('from') === 'welcome';
  }

  initForm(): void {
    this.dryerForm = this.fb.group({
      name: ['', [Validators.required]],
      config: this.fb.group({
        heater: this.fb.group({
          name: ['', [Validators.required]],
          fan_name: ['', [Validators.required]]
        }),
        led: this.fb.group({
          name: ['', [Validators.required]],
          brightness: [100, [Validators.required, Validators.min(0), Validators.max(100)]]
        }),
        humidity: this.fb.group({
          open_threshold: [0.1, [Validators.required, Validators.min(0)]],
          close_threshold: [0.2, [Validators.required, Validators.min(0)]],
          plateau_duration: [30, [Validators.required, Validators.min(0)]],
          plateau_window_size: [5, [Validators.required, Validators.min(1)]],
          timer_drying_range: [1, [Validators.required, Validators.min(0)]]
        }),
        temperature: this.fb.group({
          sensor_name: ['', [Validators.required]]
        }),
        servo: this.fb.group({
          name: ['', [Validators.required]],
          close_angle: [125, [Validators.required, Validators.min(0), Validators.max(360)]],
          open_angle: [30, [Validators.required, Validators.min(0), Validators.max(360)]],
          // Initialize as null so that editing existing dryer shows backend values explicitly
          // and required validators still trigger if user hasn't provided them.
          soft_step: [3, [Validators.required, Validators.min(1)]],
          soft_sleep: [0.3, [Validators.required, Validators.min(0.01)]],
          min_interval: [10, [Validators.required, Validators.min(1)]]
        })
      })
    });
  }

  get formControls() {
    return this.dryerForm.controls;
  }

  get heaterControls() {
    return (this.dryerForm.get('config.heater') as FormGroup).controls;
  }

  get ledControls() {
    return (this.dryerForm.get('config.led') as FormGroup).controls;
  }

  get humidityControls() {
    return (this.dryerForm.get('config.humidity') as FormGroup).controls;
  }

  get temperatureControls() {
    return (this.dryerForm.get('config.temperature') as FormGroup).controls;
  }

  get servoControls() {
    return (this.dryerForm.get('config.servo') as FormGroup).controls;
  }

  loadDryers(): void {
    this.isLoading = true;
    this.dryersService.getDryers().subscribe({
      next: (data) => {
        this.dryers = data;
        this.isLoading = false;
        this.checkEditingDryerExists();
      },
      error: (error) => {
        this.logger.error('DryerConfig', 'Error loading dryers', error);
        this.isLoading = false;
        this.toastService.show('Error loading dryers.', { classname: 'bg-danger text-light', delay: 3000 });
      }
    });
  }

  checkEditingDryerExists(): void {
    if (this.editingDryer) {
      const dryerStillExists = this.dryers.some(dryer => dryer.id === this.editingDryer!.id);
      if (!dryerStillExists) {
        this.toastService.show('The dryer being edited was deleted.', {
          classname: 'bg-warning text-dark',
          delay: 3000
        });
        this.resetForm();
      }
    }
  }

  loadDryerConfig(dryerId: number): void {
    this.isLoadingConfig = true;
    this.dryersService.getDryer(dryerId).subscribe({
      next: (dryerConfig) => {
        // Debug log to verify backend payload
        this.logger.info('DryerConfig', 'Loaded dryer config', dryerConfig);

        const cfg: any = { ...dryerConfig.config };

        // Set top-level name early
        this.dryerForm.get('name')?.setValue(dryerConfig.name);

        // Patch non-servo groups normally
        const groupsToPatch = ['heater', 'led', 'humidity', 'temperature'];
        for (const grp of groupsToPatch) {
          if (cfg[grp]) {
            (this.dryerForm.get(`config.${grp}`) as FormGroup)?.patchValue(cfg[grp]);
          }
        }

        // Explicitly set servo subgroup to avoid any leftover defaults
        if (cfg.servo) {
          const servoGroup = this.dryerForm.get('config.servo') as FormGroup;
          servoGroup.setValue({
            name: cfg.servo.name ?? '',
            close_angle: cfg.servo.close_angle ?? null,
            open_angle: cfg.servo.open_angle ?? null,
            soft_step: cfg.servo.soft_step ?? null,
            soft_sleep: cfg.servo.soft_sleep ?? null,
            min_interval: cfg.servo.min_interval ?? null
          });
        }
        this.isLoadingConfig = false;

        setTimeout(() => {
          const formElement = document.getElementById('dryerForm');
          if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      },
      error: (error) => {
        this.logger.error('DryerConfig', 'Error loading dryer config', error);
        this.isLoadingConfig = false;

        if (error.status === 404) {
          this.toastService.show('Dryer not found. It may have been deleted.', {
            classname: 'bg-warning text-dark',
            delay: 3000
          });
          this.resetForm();
        } else {
          this.toastService.show('Error loading dryer configuration.', {
            classname: 'bg-danger text-light',
            delay: 3000
          });
        }
      }
    });
  }

  loadMoonrakerObjects(): void {
    this.isLoadingObjects = true;
    this.dryersService.getMoonrakerObjects().subscribe({
      next: (response: MoonrakerObjectsResponse) => {
        if (response.success) {
          this.filterObjects(response.data.result.objects);
        }
        this.isLoadingObjects = false;
      },
      error: (error) => {
        this.logger.error('DryerConfig', 'Error loading Moonraker objects', error);
        this.isLoadingObjects = false;
        this.toastService.show('Error loading available components.', {
          classname: 'bg-warning text-dark',
          delay: 3000
        });
      }
    });
  }

  filterObjects(objects: string[]): void {
    this.heaters = this.dryersService.getHeaters(objects);
    this.fans = this.dryersService.getFans(objects);
    this.temperatureSensors = this.dryersService.getTemperatureSensors(objects);
    this.leds = this.dryersService.getLeds(objects);
    this.servos = this.dryersService.getServos(objects);
  }

  refreshObjects(): void {
    this.loadMoonrakerObjects();
    this.toastService.show('Refreshing available components...', {
      classname: 'bg-info text-light',
      delay: 2000
    });
  }

  onSubmit(): void {
    if (this.dryerForm.invalid) {
      this.markAllAsTouched();
      return;
    }

    if (this.editingDryer) {
      const dryerStillExists = this.dryers.some(dryer => dryer.id === this.editingDryer!.id);
      if (!dryerStillExists) {
        this.toastService.show('Cannot update: the dryer was deleted.', {
          classname: 'bg-warning text-dark',
          delay: 3000
        });
        this.resetForm();
        return;
      }
    }

    this.isSaving = true;

    const formValue = this.dryerForm.value;
    const operation = this.editingDryer
      ? this.dryersService.updateDryer(this.editingDryer.id, formValue)
      : this.dryersService.createDryer(formValue);

    operation.subscribe({
      next: () => {
        this.isSaving = false;
        this.toastService.show(
          this.editingDryer ? 'Dryer updated successfully!' : 'Dryer created successfully!',
          { classname: 'bg-success text-light', delay: 3000 }
        );
        this.resetForm();
        this.loadDryers();

        // If coming from welcome page, redirect back after saving
        if (this.isFromWelcome && !this.editingDryer) {
          setTimeout(() => {
            this.router.navigate(['/welcome']);
          }, 1000);
        }
      },
      error: (error) => {
        this.isSaving = false;

        if (error.status === 404 && this.editingDryer) {
          this.toastService.show('Dryer not found. It may have been deleted.', {
            classname: 'bg-warning text-dark',
            delay: 3000
          });
          this.resetForm();
          this.loadDryers();
        } else {
          this.toastService.show(error.error?.message || 'Error saving dryer!', {
            classname: 'bg-danger text-light',
            delay: 3000
          });
        }
      }
    });
  }

  markAllAsTouched(): void {
    Object.keys(this.dryerForm.controls).forEach(key => {
      const control = this.dryerForm.get(key);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(nestedKey => {
          control.get(nestedKey)?.markAsTouched();
        });
      } else {
        control?.markAsTouched();
      }
    });
  }

  editDryer(dryer: Dryer): void {
    this.editingDryer = dryer;
    this.loadDryerConfig(dryer.id);
  }

  deleteDryer(dryerId: number): void {
    if (!confirm('Are you sure you want to delete this dryer?')) {
      return;
    }

    this.dryersService.deleteDryer(dryerId).subscribe({
      next: () => {
        this.toastService.show('Dryer deleted successfully!', {
          classname: 'bg-success text-light',
          delay: 3000
        });

        if (this.editingDryer?.id === dryerId) {
          this.resetForm();
        }

        this.loadDryers();
      },
      error: (error) => {
        this.logger.error('DryerConfig', 'Error deleting dryer', error);
        this.toastService.show(error.error?.message || 'Error deleting dryer!', {
          classname: 'bg-danger text-light',
          delay: 3000
        });

        if (error.status === 404) {
          this.loadDryers();
        }
      }
    });
  }

  resetForm(): void {
    this.dryerForm.reset({
      name: '',
      config: {
        heater: { name: '', fan_name: '' },
        led: { name: '', brightness: 100 },
        humidity: {
          open_threshold: 0.1,
          close_threshold: 0.2,
          plateau_duration: 30,
          plateau_window_size: 5,
          timer_drying_range: 1
        },
        temperature: { sensor_name: '' },
        servo: { name: '', close_angle: 125, open_angle: 30, soft_step: 3, soft_sleep: 0.3, min_interval: 10 }
      }
    });
    this.editingDryer = null;
  }

  backToWelcome(): void {
    this.router.navigate(['/welcome']);
  }
}
