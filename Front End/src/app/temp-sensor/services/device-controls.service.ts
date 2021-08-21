import { Injectable } from '@angular/core';
import { IToggle } from '../model/IToggle';
import { HttpClient } from '@angular/common/http';
import { ServerConfiguration } from '../config/constants';
import { IControls } from '../model/IControls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeviceControlsService {

  getAllDevices(): Observable<IControls[]> {
    return this.http.get<IControls[]>(`${this.baseUrl}/controls/devices`);
  }
  readonly baseUrl = ServerConfiguration.backEndBaseUrl;
  constructor(private http:HttpClient) { }

  controlDevice(iToggle:IToggle) {
    return this.http.post<IToggle>(`${this.baseUrl}/controls`, iToggle);
  }
}
