import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { RegisterComponent } from './features/register/register.component';
import { RiskProfileComponent } from './features/risk-profile/risk-profile.component';
import { PreferencesComponent } from './features/preferences/preferences.component';
import { EducacionfComponent } from './features/educacionf/educacionf.component';
export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    title: 'Landing Page'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Registro de Usuario'
  },
  {
    path: 'risk-profile',
    component: RiskProfileComponent,
    title: 'Selección de Perfil de Riesgo'
  },
  {
    path: 'preferences',
    component: PreferencesComponent,
    title: 'Personalización de Señales'
  },
  {
    path: 'educacionf',
    component: EducacionfComponent,
    title: 'Educación Financiera'
  }
];
