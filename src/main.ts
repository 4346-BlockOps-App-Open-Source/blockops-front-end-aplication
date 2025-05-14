import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslations } from './app/translation.provider';
import { appConfig } from './app/app.config';  // Importamos la configuración del appConfig

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideTranslations(),  // 👈 Añadimos el provider de traducción
    appConfig.providers      // 👈 Añadimos el provider de rutas y ZoneChangeDetection desde appConfig
  ]
}).catch(err => console.error(err));
