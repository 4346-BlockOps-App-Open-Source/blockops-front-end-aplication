import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PreferencesComponent {
  preferences = {
    activos: [] as string[],
    recibirNotificaciones: true
  };

  activosDisponibles = ['Cripto', 'Acciones', 'Bonos', 'Forex'];

  toggleActivo(activo: string) {
    const index = this.preferences.activos.indexOf(activo);
    if (index > -1) {
      this.preferences.activos.splice(index, 1);
    } else {
      this.preferences.activos.push(activo);
    }
  }

  savePreferences() {
    console.log('Preferencias guardadas:', this.preferences);
    // Guardar preferencias en la base de datos
    alert('Preferencias actualizadas');
  }
}
