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

  onStartNow() {
    alert('Bienvenido a Capitalent, empieza gratis ahora.');
  }

  scrollToSection(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onContactSubmit() {
    const { name, email, message } = this.contact;
    if (name && email && message) {
      alert(`Gracias ${name}, recibimos tu mensaje:\n\n"${message}"\n\nTe responderemos a ${email}.`);
      this.contact = { name: '', email: '', message: '' };
    } else {
      alert('Por favor completa todos los campos.');
    }
  }

  openWhatsApp() {
    const phoneNumber = '51999999999'; // Cambia al tuyo real
    const message = encodeURIComponent('¡Hola! Quiero más información sobre Capitalent.');
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  }

  selectPricingPlan(plan: string) {
    if (plan === 'free') {
      alert('Seleccionaste el plan Free. ¡Empieza ahora gratis!');
    } else if (plan === 'pro') {
      alert('Seleccionaste el plan Pro. Accede a todas las funciones avanzadas.');
    }
  }
}
