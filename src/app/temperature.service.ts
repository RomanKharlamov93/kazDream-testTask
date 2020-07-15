import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TemperatureService {
  private precipitationUrl = 'api/precipitation';
  private temperatureUrl = 'api/temperature';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getAllTemperatures(): Observable<any[]> {
    return this.http.get<any[]>(this.temperatureUrl)
  }

  getAllPrecipitation(): Observable<any[]> {
    return this.http.get<any[]>(this.precipitationUrl)
  }
}
