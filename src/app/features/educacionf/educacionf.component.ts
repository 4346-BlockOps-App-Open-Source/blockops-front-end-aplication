import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Recurso {
  titulo: string;
  nivel: string;
  tipo: string;
}

interface OpcionQuiz {
  texto: string;
  correct: boolean;
}

interface Leccion {
  titulo: string;
  nivel: string;
  pregunta: string;
  opciones: OpcionQuiz[];
}

@Component({
  selector: 'app-educacionf',
  templateUrl: './educacionf.component.html',
  styleUrls: ['./educacionf.component.css']
})
export class EducacionfComponent {
  recursos: Recurso[] = [
    { titulo: '¿Qué es el presupuesto personal?', nivel: 'basico', tipo: 'articulo' },
    { titulo: 'Cómo funcionan los fondos mutuos', nivel: 'intermedio', tipo: 'video' },
    { titulo: 'Entendiendo los mercados financieros', nivel: 'avanzado', tipo: 'podcast' },
  ];
  recursosFiltrados: Recurso[] = [...this.recursos];
  selectedNivel = '';
  selectedTipo = '';

  microlecciones: Leccion[] = [
    {
      titulo: 'Soporte y resistencia',
      nivel: 'basico',
      pregunta: '¿Qué representa una zona de soporte?',
      opciones: [
        { texto: 'Una zona donde el precio tiende a detenerse al subir', correct: false },
        { texto: 'Una zona donde el precio tiende a detenerse al bajar', correct: true },
        { texto: 'Un punto de entrada obligatorio', correct: false },
      ]
    },
    {
      titulo: 'Medias móviles',
      nivel: 'intermedio',
      pregunta: '¿Para qué se usan las medias móviles?',
      opciones: [
        { texto: 'Para medir la volatilidad', correct: false },
        { texto: 'Para identificar tendencias', correct: true },
        { texto: 'Para calcular volumen', correct: false },
      ]
    },
    {
      titulo: 'Indicadores RSI y MACD',
      nivel: 'avanzado',
      pregunta: '¿Qué indica un RSI alto?',
      opciones: [
        { texto: 'Condición de sobrecompra', correct: true },
        { texto: 'Condición de sobreventa', correct: false },
        { texto: 'Tendencia lateral', correct: false },
      ]
    }
  ];
  microleccionesFiltradas: Leccion[] = [...this.microlecciones];
  selectedMicroNivel = '';
  leccionSeleccionada: Leccion | null = null;
  respuestaSeleccionada: OpcionQuiz | null = null;
  feedback: string = '';

  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']);
  }

  filterRecursos() {
    this.recursosFiltrados = this.recursos.filter(r => {
      return (this.selectedNivel === '' || r.nivel === this.selectedNivel)
        && (this.selectedTipo === '' || r.tipo === this.selectedTipo);
    });
  }

  verRecurso(recurso: Recurso) {
    alert(`Abriendo recurso: ${recurso.titulo}`);
  }

  filtrarMicrolecciones() {
    this.microleccionesFiltradas = this.microlecciones.filter(m => {
      return this.selectedMicroNivel === '' || m.nivel === this.selectedMicroNivel;
    });
    this.leccionSeleccionada = null;
    this.respuestaSeleccionada = null;
    this.feedback = '';
  }

  seleccionarLeccion(leccion: Leccion) {
    this.leccionSeleccionada = leccion;
    this.respuestaSeleccionada = null;
    this.feedback = '';
  }

  responderQuiz(opcion: OpcionQuiz) {
    if (this.respuestaSeleccionada) return;
    this.respuestaSeleccionada = opcion;
    this.feedback = opcion.correct ? '¡Correcto! Excelente trabajo.' : 'Incorrecto, intenta nuevamente.';
  }
}
