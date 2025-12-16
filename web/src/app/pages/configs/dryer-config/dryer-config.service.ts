import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments';

export interface HeaterConfig {
  name: string;
  fan_name: string;
  dryer_id?: number;
}

export interface LedConfig {
  name: string;
  brightness: number;
  dryer_id?: number;
}

export interface HumidityConfig {
  open_threshold: number;
  close_threshold: number;
  plateau_duration: number;
  plateau_window_size: number;
  timer_drying_range: number;
  dryer_id?: number;
}

export interface TemperatureConfig {
  sensor_name: string;
  dryer_id?: number;
}

export interface ServoConfig {
  name: string;
  close_angle: number;
  open_angle: number;
  dryer_id?: number;
  // Mandatory smooth movement & cooldown parameters
  soft_step: number;
  soft_sleep: number;
  min_interval: number;
}

export interface DryerConfig {
  heater: HeaterConfig;
  led: LedConfig;
  humidity: HumidityConfig;
  temperature: TemperatureConfig;
  servo: ServoConfig;
}

export interface Dryer {
  id: number;
  name: string;
  config: DryerConfig;
}

export interface MoonrakerObjectsResponse {
  success: boolean;
  data: {
    result: {
      objects: string[];
    };
  };
}

@Injectable({
  providedIn: 'root'
})
export class DryersService {
  private get apiUrl(): string {
    return environment.apiUrl;
  }

  constructor(private http: HttpClient) {}

  getDryers(): Observable<Dryer[]> {
    return this.http.get<Dryer[]>(`${this.apiUrl}/common/units`);
  }

  getDryer(id: number): Observable<Dryer> {
    return this.http.get<Dryer>(`${this.apiUrl}/config/unit?dryer_id=${id}`);
  }

  createDryer(dryer: Omit<Dryer, 'id'>): Observable<any> {
    return this.http.post(`${this.apiUrl}/config/unit`, dryer);
  }

  updateDryer(id: number, dryer: Omit<Dryer, 'id'>): Observable<any> {
    return this.http.put(`${this.apiUrl}/config/unit?dryer_id=${id}`, dryer);
  }

  deleteDryer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/config/unit?dryer_id=${id}`);
  }

  getMoonrakerObjects(): Observable<MoonrakerObjectsResponse> {
    return this.http.get<MoonrakerObjectsResponse>(`${this.apiUrl}/config/moonraker/get-objects-list`);
  }

  getHeaters(objects: string[]): string[] {
    return objects ? objects.filter(obj =>
      obj && (obj.startsWith('heater_generic') || obj.startsWith('heater_bed'))
    ) : [];
  }

  getFans(objects: string[]): string[] {
    return objects ? objects.filter(obj =>
      obj && (obj.startsWith('heater_fan') || obj.startsWith('fan_generic'))
    ) : [];
  }

  getTemperatureSensors(objects: string[]): string[] {
    return objects ? objects.filter(obj =>
      obj && (
        obj.startsWith('temperature_sensor') ||
        obj.startsWith('sht3x') ||
        obj.startsWith('bme280') ||
        obj.startsWith('htu21d') ||
        obj.startsWith('aht10')
      )
    ) : [];
  }

  getLeds(objects: string[]): string[] {
    return objects ? objects.filter(obj =>
      obj && (
        obj.startsWith('neopixel') ||
        obj.startsWith('led') ||
        obj.startsWith('rgb_led')
      )
    ) : [];
  }

  getServos(objects: string[]): string[] {
    return objects ? objects.filter(obj => obj && obj.startsWith('servo')) : [];
  }
}
