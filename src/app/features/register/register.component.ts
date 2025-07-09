import { Component } from '@angular/core';
import { AuthService, User as BaseUser } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface User extends BaseUser {
  riskProfile?: 'conservador' | 'moderado' | 'agresivo';
  preferences?: string[];
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = { email: '', password: '', name: '', riskProfile: undefined, preferences: [] };
  registerError: string = '';
  loading = false;

  riskProfiles = ['conservador', 'moderado', 'agresivo'];
  preferenceChoices = ['Cripto', 'Acciones', 'Bonos', 'Forex'];

  constructor(private auth: AuthService, private router: Router) {}

  togglePreference(pref: string) {
    const idx = this.user.preferences?.indexOf(pref);
    if (idx !== undefined && idx > -1) {
      this.user.preferences?.splice(idx, 1);
    } else {
      this.user.preferences = this.user.preferences ?? [];
      this.user.preferences.push(pref);
    }
  }

  onRegister(event: Event) {
    event.preventDefault();

    // Validación sencilla para requerir perfil y al menos una preferencia
    if (!this.user.riskProfile || !this.user.preferences || this.user.preferences.length === 0) {
      this.registerError = 'Selecciona un perfil de riesgo y al menos una preferencia.';
      return;
    }

    this.loading = true;
    this.registerError = '';
    this.auth.register(this.user).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loading = false;
        this.registerError = 'Error al registrar.';
      }
    });
  }
}
