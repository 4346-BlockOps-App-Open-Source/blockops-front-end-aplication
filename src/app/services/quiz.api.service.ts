import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuizApiService {
  private readonly apiUrl = 'http://localhost:8080/api/quizzes';

  constructor(private http: HttpClient) {}

  getQuizzes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
