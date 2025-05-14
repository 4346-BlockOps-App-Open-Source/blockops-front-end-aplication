import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private router: Router) {}

  registerUser() {
    if (this.user.name && this.user.email && this.user.password) {
      // Simula el guardado en base de datos
      console.log('Usuario registrado:', this.user);
      // Redirige a la selección de perfil de riesgo
      this.router.navigate(['/risk-profile']);
    }
  }
}
