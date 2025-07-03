import { Component } from '@angular/core';
import { AuthService, User } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = { email: '', password: '', name: '' };
  registerError: string = '';
  loading = false;

  constructor(private auth: AuthService, private router: Router) {}

  onRegister(event: Event) {
    event.preventDefault();
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
