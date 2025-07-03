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
  email = '';
  password = '';
  loginError: string = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) { }

  onLogin(event: Event) {
    event.preventDefault();
    this.loading = true;
    this.loginError = '';
    this.auth.login(this.email, this.password).subscribe({
      next: users => {
        this.loading = false;
        if (users.length > 0) {
          // Login exitoso
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

