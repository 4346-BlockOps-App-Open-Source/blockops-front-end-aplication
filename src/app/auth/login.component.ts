import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  loginError: string = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) { }

  onLogin(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.loginError = '';
    this.auth.login(this.username, this.password).subscribe({
      next: (resp) => {
        this.loading = false;
        // Suponemos que la respuesta trae un token al hacer login correcto:
        if (resp && resp.token) {
          localStorage.setItem('token', resp.token);
          this.router.navigate(['/dashboard']);
        } else {
          this.loginError = 'Credenciales incorrectas.';
        }
      },
      error: () => {
        this.loading = false;
        this.loginError = 'Error al intentar iniciar sesión.';
      }
    });
  }
}

