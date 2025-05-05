import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideTranslations } from './app/translation.provider';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideTranslations()  // 👈 añadimos nuestro provider de traducción
  ]
});
