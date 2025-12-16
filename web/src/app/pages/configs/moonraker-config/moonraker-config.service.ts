import { environment } from '../../../../environments';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface MoonrakerConfig {
  moonraker_api_method: string;
  moonraker_ip: string;
  moonraker_port: number;
  moonraker_api_key: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoonrakerConfigService {
  private get apiUrl(): string {
    return environment.apiUrl;
  }

  constructor(private http: HttpClient) {}

  getConfig(): Observable<MoonrakerConfig> {
    return this.http.get<MoonrakerConfig>(`${this.apiUrl}/config/moonraker`);
  }

  saveConfig(config: MoonrakerConfig): Observable<any> {
    return this.http.post(`${this.apiUrl}/config/moonraker`, config);
  }

  testConnection(config: MoonrakerConfig): Observable<any> {
    return this.http.post(`${this.apiUrl}/config/moonraker/test-connection`, config);
  }
}
