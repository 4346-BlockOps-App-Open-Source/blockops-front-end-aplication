import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-biblioteca-recursos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './biblioteca-recursos.component.html',
  styleUrls: ['./biblioteca-recursos.component.css']
})
export class BibliotecaRecursosComponent implements OnInit {
  recursos: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('assets/educacionf.json')
      .pipe(
        map(data => data.biblioteca || []),
        catchError(error => {
          console.error('Error al cargar los recursos:', error);
          return of([]);
        })
      )
      .subscribe(recursos => {
        this.recursos = recursos;
      });
  }
}
