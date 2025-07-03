import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslations } from './app/translation.provider';
import { appConfig } from './app/app.config';  // Asegúrate de que esta importación sea correcta

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideTranslations(),
    ...appConfig.providers  // Añadir correctamente los providers
  ]
}).catch(err => console.error(err));
