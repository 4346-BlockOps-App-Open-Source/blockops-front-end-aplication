import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PreferencesComponent implements OnInit {
  preferences = {
    userId: 1, // Valor fijo para pruebas, en real obtendrías el userId logueado
    activos: [] as string[],
    recibirNotificaciones: true
  };

  activosDisponibles = ['Cripto', 'Acciones', 'Bonos', 'Forex'];
  readonly apiUrl = 'http://localhost:3000/preferences';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadPreferences();
  }

  loadPreferences() {
    this.http.get<any[]>(`${this.apiUrl}?userId=${this.preferences.userId}`).subscribe({
      next: (prefs) => {
        if (prefs && prefs.length > 0) {
          this.preferences = prefs[0];
        }
      },
      error: () => {
        // Si no hay preferencias, usar por defecto las que ya tenemos
      }
    });
  }

  toggleActivo(activo: string) {
    const index = this.preferences.activos.indexOf(activo);
    if (index > -1) {
      this.preferences.activos.splice(index, 1);
    } else {
      this.preferences.activos.push(activo);
    }
  }

  savePreferences() {
    // Busca si hay preferencias ya creadas para este userId
    this.http.get<any[]>(`${this.apiUrl}?userId=${this.preferences.userId}`).subscribe({
      next: (prefs) => {
        if (prefs && prefs.length > 0) {
          // Hay preferencias, hacer PUT (update)
          const prefId = prefs[0].id;
          this.http.put(`${this.apiUrl}/${prefId}`, this.preferences).subscribe(() => {
            alert('Preferencias actualizadas');
          });
        } else {
          // No hay preferencias, hacer POST (create)
          this.http.post(this.apiUrl, this.preferences).subscribe(() => {
            alert('Preferencias actualizadas');
          });
        }
      },
      error: () => {
        // Por fallback solo hace POST
        this.http.post(this.apiUrl, this.preferences).subscribe(() => {
          alert('Preferencias actualizadas');
        });
      }
    });
  }
}
