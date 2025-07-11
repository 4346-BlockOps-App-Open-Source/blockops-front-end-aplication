import { Routes } from '@angular/router';
import { LandingComponent } from './features/landing/landing.component';
import { RegisterComponent } from './features/register/register.component';
import { RiskProfileComponent } from './features/risk-profile/risk-profile.component';
import { PreferencesComponent } from './features/preferences/preferences.component';
import { EducacionFinancieraComponent } from './educacion-financiera/educacion-financiera.component';
import { ComunidadComponent } from './community/community.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { LoginComponent } from './auth/login.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'risk-profile', component: RiskProfileComponent },
  { path: 'preferences', component: PreferencesComponent },
  { path: 'educacion', component: EducacionFinancieraComponent },
  { path: 'comunidad', component: ComunidadComponent },
  { path: 'dashboard', component: DashboardComponent },
{ path: 'signal-list', loadComponent: () => import('./signal-list/signal-list').then(m => m.SignalListComponent) },
  { path: 'notificaciones', component: NotificationsComponent },
  { path: 'login', component: LoginComponent },
];
