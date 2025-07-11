import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'consejos-rapidos',
  standalone: true,
  templateUrl: './consejos-rapidos.component.html',
  styleUrls: ['./consejos-rapidos.component.css'],
  imports: [CommonModule, HttpClientModule]
})
export class ConsejosRapidosComponent implements OnInit, OnDestroy {
  todosLosConsejos: any[] = [];
  consejos: any[] = [];
  intervaloId: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any>('http://localhost:8080/api/consejos')
      .pipe(
        catchError(error => {
          console.error('❌ Error al cargar los consejos desde el backend:', error);
          alert('Error al cargar los consejos. Verifica que el backend esté corriendo.');
          return of([]); // asumimos que backend devuelve array directo
        })
      )
      .subscribe(data => {
        console.log('📦 Consejos recibidos del backend:', data);
        this.todosLosConsejos = data || [];
        this.mostrarConsejosAleatorios();

        this.intervaloId = setInterval(() => {
          this.mostrarConsejosAleatorios();
        }, 10000);
      });
  }

  mostrarConsejosAleatorios(): void {
    const copia = [...this.todosLosConsejos];
    this.shuffleArray(copia);
    this.consejos = copia.slice(0, 3);
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
