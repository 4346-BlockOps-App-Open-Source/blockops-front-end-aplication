import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-microlecciones-tecnico',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './microlecciones-tecnico.component.html',
  styleUrls: ['./microlecciones-tecnico.component.css']
})
export class MicroleccionesTecnicoComponent implements OnInit, OnDestroy {
  todasLasLecciones: any[] = [];
  lecciones: any[] = [];
  intervaloId: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8080/api/microlecciones')
      .pipe(
        catchError(error => {
          console.error('❌ Error al cargar las microlecciones:', error);
          alert('Error al cargar las microlecciones. Verifica que el backend esté corriendo.');
          return of([]); // Cambia por `of({ microlecciones: [] })` si el backend responde con objeto
        })
      )
      .subscribe(data => {
        console.log('📚 Microlecciones recibidas:', data);
        this.todasLasLecciones = data || []; // Si tu backend devuelve { microlecciones: [...] }, usa: data.microlecciones || []
        this.mostrarLeccionesAleatorias();

        // Actualiza cada 10 segundos
        this.intervaloId = setInterval(() => {
          this.mostrarLeccionesAleatorias();
        }, 10000);
      });
  }

  mostrarLeccionesAleatorias(): void {
    const copia = [...this.todasLasLecciones];
    this.shuffleArray(copia);
    this.lecciones = copia.slice(0, 3);
  }

  shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  ngOnDestroy(): void {
    if (this.intervaloId) {
      clearInterval(this.intervaloId);
    }
  }
}
