import { Component } from '@angular/core';
import { AuthService, User as BaseUser } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  perfilRiesgo: 'Conservador' | 'Moderado' | 'Agresivo';
  preferencias: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    perfilRiesgo: 'Moderado',
    preferencias: 'Cripto'
  };
  registerError: string = '';
  loading = false;

  riskProfiles = ['Conservador', 'Moderado', 'Agresivo'];
  preferenceChoices = ['Cripto', 'Acciones', 'Bonos', 'Forex'];

  constructor(private auth: AuthService, private router: Router) {}

  // Ya no hace falta togglePreference porque solo puede seleccionar una preferencia (no es array)

  onRegister(event: Event) {
    event.preventDefault();

    // Validación sencilla para requerir perfil y al menos una preferencia
    if (!this.user.perfilRiesgo || !this.user.preferencias) {
      this.registerError = 'Selecciona un perfil de riesgo y una preferencia.';
      return;
    }

    this.loading = true;
    this.registerError = '';
    this.auth.register(this.user).subscribe({
      next: (resp) => {
        this.loading = false;
        // Si hay registro exitoso podrías almacenar token o sólo redirigir
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loading = false;
        this.registerError = 'Error al registrar.';
      }
    });
  }
}
