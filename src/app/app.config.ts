import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';  // Asegúrate de que las rutas estén definidas correctamente

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),  // Para optimización de rendimiento
    provideRouter(routes)  // Proporciona las rutas configuradas
  ]
};
