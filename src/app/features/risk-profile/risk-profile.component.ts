import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-risk-profile',
  templateUrl: './risk-profile.component.html',
  styleUrls: ['./risk-profile.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RiskProfileComponent {
  riskProfile: 'conservador' | 'moderado' | 'agresivo' | null = null;

  constructor(private router: Router) {}

  submitProfile() {
    if (this.riskProfile) {
      console.log('Perfil de riesgo seleccionado:', this.riskProfile);
      // Aquí guardarías el perfil en la base de datos
      this.router.navigate(['/preferences']);
    }
  }
}
