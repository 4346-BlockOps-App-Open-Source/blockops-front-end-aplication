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
  private apiUrl = 'https://blockops-back-end-application-production.up.railway.app/api/v1/authentication';

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    // POST a /authentication/sign-up
    return this.http.post(`${this.apiUrl}/sign-up`, user);
  }

  login(username: string, password: string): Observable<any> {
    // POST a /authentication/sign-in (por username, no email)
    return this.http.post(`${this.apiUrl}/sign-in`, { username, password });
  }

  // Si quieres login opcional por email en el futuro:
  loginByEmail(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/sign-in-email`, { email, password });
  }
}

