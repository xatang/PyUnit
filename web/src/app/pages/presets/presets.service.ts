import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments';

export interface Dryer {
  id: number;
  name: string;
}

export interface Preset {
  id: number;
  name: string;
  temperature: number;
  max_temperature_delta: number;
  humidity: number;
  dry_time: number;
  storage_type: 'none' | 'temperature' | 'humidity';
  storage_temperature: number;
  humidity_storage_dry_time: number;
  humidity_storage_range: number;
  dryers: Dryer[];
}

export interface DryerLinkRequest {
  dryer_id: number;
  preset_id: number;
}

@Injectable({
  providedIn: 'root'
})
export class PresetsService {
  private get apiUrl(): string {
    return environment.apiUrl;
  }

  constructor(private http: HttpClient) {}

  getPresets(): Observable<Preset[]> {
    return this.http.get<Preset[]>(`${this.apiUrl}/common/presets`);
  }

  getPreset(id: number): Observable<Preset> {
    return this.http.get<Preset>(`${this.apiUrl}/presets/preset?preset_id=${id}`);
  }

  createPreset(preset: Preset): Observable<any> {
    return this.http.post(`${this.apiUrl}/presets/preset`, preset);
  }

  updatePreset(preset: Preset): Observable<any> {
    return this.http.put(`${this.apiUrl}/presets/preset?preset_id=${preset.id}`, preset);
  }

  deletePreset(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/presets/preset?preset_id=${id}`);
  }

  linkPresetToDryer(request: DryerLinkRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/presets/preset/link`, request);
  }

  unlinkPresetFromDryer(presetId: number, dryerId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/presets/preset/link?preset_id=${presetId}&dryer_id=${dryerId}`);
  }

  getAvailableDryers(): Observable<Dryer[]> {
    return this.http.get<Dryer[]>(`${this.apiUrl}/common/units`);
  }
}
