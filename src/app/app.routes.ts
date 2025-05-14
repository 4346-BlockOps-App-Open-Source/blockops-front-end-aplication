import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: 'Landing Page'
  },
  // Aquí puedes añadir nuevas rutas conforme vayas agregando más funcionalidades
  // Ejemplo:
  // {
  //   path: 'about',
  //   component: AboutComponent
  // },
];
