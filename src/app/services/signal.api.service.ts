import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SignalApiService {
  private readonly apiUrl = 'http://localhost:8080/api/signals';

  constructor(private http: HttpClient) {}

  getSignals(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createSignal(payload: any): Observable<any> {
    return this.http.post(this.apiUrl, payload);
  }
}
