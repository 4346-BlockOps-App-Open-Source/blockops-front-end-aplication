import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConsejoApiService {
  private readonly apiUrl = 'http://localhost:8080/api/consejos';

  constructor(private http: HttpClient) {}

  getConsejos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
