import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { ConsejosRapidosComponent } from './consejos-rapidos/consejos-rapidos.component';
import { BibliotecaRecursosComponent } from './biblioteca-recursos/biblioteca-recursos.component';
import { MicroleccionesTecnicoComponent } from './microlecciones-tecnico/microlecciones-tecnico.component';
import { QuizInteractivoComponent } from './quiz-interactivo/quiz-interactivo.component';

import { SignalApiService } from '../services/signal.api.service';
import { QuizApiService } from '../services/quiz.api.service';
import { MicroleccionApiService } from '../services/microleccion.api.service';
import { ConsejoApiService } from '../services/consejo.api.service';
import { BibliotecaApiService } from '../services/biblioteca.api.service';

@Component({
  selector: 'app-educacion-financiera',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    RouterModule,
    ConsejosRapidosComponent,
    BibliotecaRecursosComponent,
    MicroleccionesTecnicoComponent,
    QuizInteractivoComponent
  ],
  templateUrl: './educacion-financiera.component.html',
  styleUrls: ['./educacion-financiera.component.css']
})
export class EducacionFinancieraComponent {
  idiomaSeleccionado: string = 'es';

  signals: any[] = [];
  quizzes: any[] = [];
  microlecciones: any[] = [];
  consejos: any[] = [];
  biblioteca: any[] = [];

  constructor(
    private translate: TranslateService,
    private signalApi: SignalApiService,
    private quizApi: QuizApiService,
    private microleccionApi: MicroleccionApiService,
    private consejoApi: ConsejoApiService,
    private bibliotecaApi: BibliotecaApiService
  ) {
    const idiomasDisponibles = ['es', 'en'];
    const idiomaGuardado = localStorage.getItem('idioma');
    const idiomaNavegador = this.translate.getBrowserLang();

    this.idiomaSeleccionado = idiomaGuardado && idiomasDisponibles.includes(idiomaGuardado)
      ? idiomaGuardado
      : (idiomasDisponibles.includes(idiomaNavegador || '') ? idiomaNavegador! : 'es');

    this.translate.setDefaultLang('es');
    this.translate.use(this.idiomaSeleccionado);
  }

  ngOnInit(): void {
    this.signalApi.getSignals().subscribe({
      next: (data: any) => { this.signals = Array.isArray(data) ? data : []; },
      error: err => { this.signals = []; }
    });
    this.quizApi.getQuizzes().subscribe({
      next: (data: any) => { this.quizzes = Array.isArray(data) ? data : []; },
      error: err => { this.quizzes = []; }
    });
    this.microleccionApi.getMicrolecciones().subscribe({
      next: (data: any) => { this.microlecciones = Array.isArray(data) ? data : []; },
      error: err => { this.microlecciones = []; }
    });
    this.consejoApi.getConsejos().subscribe({
      next: (data: any) => { this.consejos = Array.isArray(data) ? data : []; },
      error: err => { this.consejos = []; }
    });
    this.bibliotecaApi.getBiblioteca().subscribe({
      next: (data: any) => { this.biblioteca = Array.isArray(data) ? data : []; },
      error: err => { this.biblioteca = []; }
    });
  }

  cambiarIdioma(idioma: string): void {
    if (idioma !== this.idiomaSeleccionado) {
      this.idiomaSeleccionado = idioma;
      this.translate.use(idioma).subscribe(() => {
        localStorage.setItem('idioma', idioma);
      });
    }
  }
}
