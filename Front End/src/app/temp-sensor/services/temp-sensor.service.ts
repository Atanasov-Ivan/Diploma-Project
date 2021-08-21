import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ITempSensor } from '../model/ITempSensor';
import { Observable } from 'rxjs';
import { ServerConfiguration } from '../config/constants';

@Injectable({
  providedIn: 'root'
})
export class TempSensorService {
  
  readonly baseUrl = ServerConfiguration.backEndBaseUrl;
  constructor(private http: HttpClient) { }


  fetchLatestTempSensor(): Observable<ITempSensor>{
    return this.http.get<ITempSensor>(`${this.baseUrl}`)
  }
  

}
