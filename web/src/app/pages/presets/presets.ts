import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ToastService } from '../../services/toast';
import { PresetsService, Preset, Dryer, DryerLinkRequest } from './presets.service';
import { LoggingService } from '../../services/logging.service';

@Component({
  selector: 'app-presets',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './presets.html',
  styleUrl: './presets.scss'
})
export class PresetsPage implements OnInit {
  presets: Preset[] = [];
  presetForm: FormGroup;
  editingPreset: Preset | null = null;
  availableDryers: Dryer[] = [];
  selectedDryerIds: number[] = [];

  isLoading = false;
  isSaving = false;
  isDryersLoading = false;

  constructor(
    private presetsService: PresetsService,
    private toastService: ToastService,
    private fb: FormBuilder,
    private logger: LoggingService
  ) {
    this.presetForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadPresets();
    this.loadAvailableDryers();
    this.setupStorageTypeListener();
  }

  createForm(): FormGroup {
    return this.fb.group({
      id: [0],
      name: ['', Validators.required],
      temperature: [60, [Validators.required, Validators.min(0)]],
      max_temperature_delta: [20, [Validators.required, Validators.min(0)]],
      humidity: [10, [Validators.required, Validators.min(0), Validators.max(100)]],
      dry_time: [60, [Validators.required, Validators.min(0)]],
      storage_type: ['none'],
      storage_temperature: [50, [Validators.min(0)]],
      humidity_storage_dry_time: [10, [Validators.min(0)]],
      humidity_storage_range: [3, [Validators.min(0), Validators.max(100)]]
    });
  }

  setupStorageTypeListener(): void {
    this.presetForm.get('storage_type')?.valueChanges.subscribe(type => {
      this.updateStorageValidators(type);
    });
  }

  updateStorageValidators(storageType: string): void {
    const storageTempControl = this.presetForm.get('storage_temperature');
    const humidityDryTimeControl = this.presetForm.get('humidity_storage_dry_time');
    const humidityRangeControl = this.presetForm.get('humidity_storage_range');

    if (storageType === 'temperature') {
      storageTempControl?.setValidators([Validators.required, Validators.min(0)]);
      humidityDryTimeControl?.clearValidators();
      humidityRangeControl?.clearValidators();
    } else if (storageType === 'humidity') {
      storageTempControl?.clearValidators();
      humidityDryTimeControl?.setValidators([Validators.required, Validators.min(0)]);
      humidityRangeControl?.setValidators([Validators.required, Validators.min(0), Validators.max(100)]);
    } else {
      storageTempControl?.clearValidators();
      humidityDryTimeControl?.clearValidators();
      humidityRangeControl?.clearValidators();
    }

    storageTempControl?.updateValueAndValidity();
    humidityDryTimeControl?.updateValueAndValidity();
    humidityRangeControl?.updateValueAndValidity();
  }

  loadPresets(): void {
    this.isLoading = true;
    this.presetsService.getPresets().subscribe({
      next: (data) => {
        this.presets = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.logger.error('PresetsPage', 'Error loading presets', error);
        this.isLoading = false;
        this.toastService.show('Error loading presets.', { classname: 'bg-danger text-light', delay: 3000 });
      }
    });
  }

  loadAvailableDryers(): void {
    this.isDryersLoading = true;
    this.presetsService.getAvailableDryers().subscribe({
      next: (data) => {
        this.availableDryers = data;
        this.isDryersLoading = false;
      },
      error: (error) => {
        this.logger.error('PresetsPage', 'Error loading dryers', error);
        this.isDryersLoading = false;
        this.toastService.show('Error loading available dryers.', { classname: 'bg-danger text-light', delay: 3000 });
      }
    });
  }

  getDryerNames(dryers: Dryer[] | undefined | null): string {
    if (!dryers || dryers.length === 0) {
      return 'None';
    }
    return dryers.map(d => d.name).join(', ');
  }

  getDryerCount(dryers: Dryer[] | undefined | null): number {
    return dryers?.length || 0;
  }

  isDryerSelected(dryerId: number): boolean {
    return this.selectedDryerIds.includes(dryerId);
  }

  async onSubmit(): Promise<void> {
    if (this.presetForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isSaving = true;
    const formValue = this.presetForm.value;

    // Очищаем неиспользуемые поля
    this.cleanUnusedFields(formValue);

    try {
      if (this.editingPreset) {
        await this.updatePresetWithDryers(formValue);
      } else {
        await this.createPresetWithDryers(formValue);
      }

      this.isSaving = false;
      this.toastService.show(
        this.editingPreset ? 'Preset updated successfully!' : 'Preset created successfully!',
        { classname: 'bg-success text-light', delay: 3000 }
      );
      this.resetForm();
      this.loadPresets();
    } catch (error: any) {
      this.isSaving = false;
      this.toastService.show(
        error.error?.message || 'Error saving preset!',
        { classname: 'bg-danger text-light', delay: 3000 }
      );
    }
  }

  private async updatePresetWithDryers(presetData: any): Promise<void> {
    // Сначала обновляем пресет
    await this.presetsService.updatePreset(presetData).toPromise();

    // Затем обновляем связи с сушилками
    await this.updateDryerLinks(presetData.id);
  }

  private async createPresetWithDryers(presetData: any): Promise<void> {
    // Создаем пресет
    const response: any = await this.presetsService.createPreset(presetData).toPromise();
    const newPresetId = response.id || presetData.id;

    // Затем создаем связи с сушилками
    await this.updateDryerLinks(newPresetId);
  }

  private async updateDryerLinks(presetId: number): Promise<void> {
    try {
      // Получаем текущие связи пресета
      const currentPreset = await this.presetsService.getPreset(presetId).toPromise();

      if (!currentPreset) {
        throw new Error('Failed to get preset information');
      }

      const currentDryerIds = currentPreset.dryers?.map(d => d.id) || [];

      // Удаляем связи, которые больше не выбраны
      for (const dryerId of currentDryerIds) {
        if (!this.selectedDryerIds.includes(dryerId)) {
          await this.presetsService.unlinkPresetFromDryer(presetId, dryerId).toPromise();
        }
      }

      // Добавляем новые связи
      for (const dryerId of this.selectedDryerIds) {
        if (!currentDryerIds.includes(dryerId)) {
          const linkRequest: DryerLinkRequest = {
            preset_id: presetId,
            dryer_id: dryerId
          };
          await this.presetsService.linkPresetToDryer(linkRequest).toPromise();
        }
      }
    } catch (error) {
      this.logger.error('PresetsPage', 'Error updating dryer links', error);
      throw error;
    }
  }

  toggleDryerSelection(dryerId: number): void {
    const index = this.selectedDryerIds.indexOf(dryerId);

    if (index > -1) {
      // Если сушилка уже выбрана - удаляем из массива
      this.selectedDryerIds.splice(index, 1);
    } else {
      // Если сушилка не выбрана - добавляем в массив
      this.selectedDryerIds.push(dryerId);
    }
  }


  cleanUnusedFields(preset: Partial<Preset>): void {
    if (preset.storage_type === 'none') {
      preset.storage_temperature = 0;
      preset.humidity_storage_dry_time = 0;
      preset.humidity_storage_range = 0;
    } else if (preset.storage_type === 'temperature') {
      preset.humidity_storage_dry_time = 0;
      preset.humidity_storage_range = 0;
    } else if (preset.storage_type === 'humidity') {
      preset.storage_temperature = 0;
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.presetForm.controls).forEach(key => {
      this.presetForm.get(key)?.markAsTouched();
    });
  }

  editPreset(preset: Preset): void {
    this.editingPreset = preset;
    this.presetForm.patchValue(preset);
    this.updateStorageValidators(preset.storage_type);

    // Загружаем выбранные сушилки для редактирования
    this.selectedDryerIds = preset.dryers?.map(d => d.id) || [];

    setTimeout(() => {
      const formElement = document.getElementById('PresetForm');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  deletePreset(presetId: number): void {
    if (confirm('Are you sure you want to delete this preset?')) {
      this.presetsService.deletePreset(presetId).subscribe({
        next: () => {
          this.toastService.show('Preset deleted successfully!', {
            classname: 'bg-success text-light',
            delay: 3000
          });
          this.loadPresets();
        },
        error: (error) => {
          this.logger.error('PresetsPage', 'Error deleting preset', error);
          this.toastService.show('Error deleting preset.', {
            classname: 'bg-danger text-light',
            delay: 3000
          });
        }
      });
    }
  }

  resetForm(): void {
    this.presetForm.reset({
      id: 0,
      name: '',
      temperature: 60,
      max_temperature_delta: 20,
      humidity: 10,
      dry_time: 60,
      storage_type: 'none',
      storage_temperature: 50,
      humidity_storage_dry_time: 10,
      humidity_storage_range: 3
    });
    this.editingPreset = null;
    this.selectedDryerIds = [];
    this.updateStorageValidators('none');
  }
}
