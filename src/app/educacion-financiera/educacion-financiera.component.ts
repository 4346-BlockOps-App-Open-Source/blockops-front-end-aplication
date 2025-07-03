import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConsejosRapidosComponent } from './consejos-rapidos/consejos-rapidos.component';
import { BibliotecaRecursosComponent } from './biblioteca-recursos/biblioteca-recursos.component';
import { MicroleccionesTecnicoComponent } from './microlecciones-tecnico/microlecciones-tecnico.component';
import { QuizInteractivoComponent } from './quiz-interactivo/quiz-interactivo.component';

@Component({
  selector: 'app-educacion-financiera',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
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

  constructor(private translate: TranslateService) {
    // Idiomas disponibles
    const idiomasDisponibles = ['es', 'en'];

    // Detectar idioma en localStorage o navegador
    const idiomaGuardado = localStorage.getItem('idioma');
    const idiomaNavegador = this.translate.getBrowserLang();

    this.idiomaSeleccionado = idiomaGuardado && idiomasDisponibles.includes(idiomaGuardado)
      ? idiomaGuardado
      : (idiomasDisponibles.includes(idiomaNavegador || '') ? idiomaNavegador! : 'es');

    // Establecer idioma
    this.translate.setDefaultLang('es');
    this.translate.use(this.idiomaSeleccionado);
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
