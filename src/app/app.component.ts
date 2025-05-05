import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  onStartFree() {
    alert('¡Bienvenido a Capitalent! Empieza gratis hoy.');
  }

  onSubmitContact() {
    const { name, email, message } = this.contact;
    if (name && email && message) {
      alert(`Gracias ${name}, recibimos tu mensaje:\n\n"${message}"\n\nTe responderemos a ${email}`);
      this.contact = { name: '', email: '', message: '' };
    } else {
      alert('Por favor completa todos los campos');
    }
  }

  openWhatsApp() {
    const phoneNumber = '51999999999'; // Cambia al tuyo real
    const message = encodeURIComponent('¡Hola! Quiero más información sobre Capitalent.');
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  }

  selectPlan(plan: string) {
    if (plan === 'Free') {
      alert('Seleccionaste el Plan Gratis. Empieza a explorar.');
    } else if (plan === 'Pro') {
      alert('Seleccionaste el Plan Pro. ¡Disfruta todos los beneficios!');
    }
  }
}
