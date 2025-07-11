import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BibliotecaApiService {
  private readonly apiUrl = 'http://localhost:8080/api/biblioteca';

  constructor(private http: HttpClient) {}

  getBiblioteca(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
