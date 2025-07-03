import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

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
    this.http.get<any>('assets/educacionf.json').subscribe(data => {
      this.todasLasPreguntas = data.quiz || [];
      this.seleccionarPreguntas();
    });
  }

  seleccionarPreguntas(): void {
    const copia = [...this.todasLasPreguntas];
    this.shuffleArray(copia);
    this.preguntas = copia.slice(0, 4);
    this.respuestasUsuario = new Array(4).fill(null);
    this.estadoPreguntas = new Array(4).fill(false);
    this.recomendaciones = new Array(4).fill('');
    this.puntajeFinal = null;
  }

  verificarRespuesta(index: number, opcion: string): void {
    if (this.estadoPreguntas[index]) return;

    const correcta = this.preguntas[index].correcta;
    if (opcion === correcta) {
      this.respuestasUsuario[index] = '✅ ¡Correcto!';
      this.estadoPreguntas[index] = true;
    } else {
      this.respuestasUsuario[index] = '❌ Incorrecto';
      this.recomendaciones[index] = this.preguntas[index].recomendacion || 'Intenta nuevamente y recuerda el concepto.';
    }

    // Verifica si todas fueron respondidas correctamente
    if (this.estadoPreguntas.every(estado => estado)) {
      this.calcularPuntaje();
    }
  }

  calcularPuntaje(): void {
    const puntos = this.estadoPreguntas.filter(e => e).length;
    this.puntajeFinal = puntos;
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
