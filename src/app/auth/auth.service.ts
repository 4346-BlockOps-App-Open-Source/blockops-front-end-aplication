import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id?: number;
  email: string;
  password: string;
  name?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:8080/registroonboarding';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    // POST a /registroonboarding/registro
    return this.http.post<User>(`${this.apiUrl}/registro`, user);
  }

  login(email: string, password: string): Observable<User[]> {
    // GET a /registroonboarding/usuarios?email=...&password=...
    return this.http.get<User[]>(`${this.apiUrl}/usuarios?email=${email}&password=${password}`);
  }
}

