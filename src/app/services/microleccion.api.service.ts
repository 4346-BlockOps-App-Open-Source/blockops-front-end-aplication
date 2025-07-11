import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MicroleccionApiService {
  private readonly apiUrl = 'http://localhost:8080/api/microlecciones';

  constructor(private http: HttpClient) {}

  getMicrolecciones(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
