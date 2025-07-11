import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-quiz-interactivo',
  standalone: true,
  templateUrl: './quiz-interactivo.component.html',
  styleUrls: ['./quiz-interactivo.component.css'],
  imports: [CommonModule, HttpClientModule]
})
export class QuizInteractivoComponent implements OnInit {
  todasLasPreguntas: any[] = [];
  preguntas: any[] = [];
  respuestasUsuario: (string | null)[] = [];
  estadoPreguntas: boolean[] = [];
  recomendaciones: string[] = [];
  puntajeFinal: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarPreguntas();
  }

  cargarPreguntas(): void {
    this.http.get<any[]>('http://localhost:8080/api/quizzes')
      .pipe(
        catchError(error => {
          console.error('❌ Error al cargar el quiz:', error);
          alert('No se pudo cargar el quiz. Verifica que el backend esté funcionando.');
          return of([]);
        })
      )
      .subscribe(data => {
        console.log('📋 Preguntas recibidas:', data);
        this.todasLasPreguntas = data ?? [];
        this.seleccionarPreguntas();
      });
  }

  seleccionarPreguntas(): void {
    const copia = [...this.todasLasPreguntas];
    this.shuffleArray(copia);
    const cantidad = Math.min(4, copia.length);
    this.preguntas = copia.slice(0, cantidad);
    this.respuestasUsuario = new Array(cantidad).fill(null);
    this.estadoPreguntas = new Array(cantidad).fill(false);
    this.recomendaciones = new Array(cantidad).fill('');
    this.puntajeFinal = null;
  }

  verificarRespuesta(index: number, opcion: string): void {
    if (this.estadoPreguntas[index]) return;

    const correcta = this.preguntas[index].correcta;
    if (opcion === correcta) {
      this.respuestasUsuario[index] = '✅ ¡Correcto!';
    } else {
      this.respuestasUsuario[index] = '❌ Incorrecto';
      this.recomendaciones[index] = this.preguntas[index].recomendacion || 'Intenta nuevamente y recuerda el concepto.';
    }

    this.estadoPreguntas[index] = true;

    if (this.estadoPreguntas.every(e => e)) {
      this.calcularPuntaje();
    }
  }

  calcularPuntaje(): void {
    this.puntajeFinal = this.respuestasUsuario.filter(r => r === '✅ ¡Correcto!').length;
  }

  reiniciarQuiz(): void {
    this.seleccionarPreguntas();
  }

  private shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
