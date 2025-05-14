import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private translate: TranslateService, private router: Router) {
    // Configurar los idiomas soportados
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|es/) ? browserLang : 'en');
  }

  changeLang(lang: string): void {
    this.translate.use(lang);
  }

  onStartNow() {
    this.translate.get('ALERTS.START_NOW').subscribe(message => {
      alert(message);
    });
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
      this.translate.get('ALERTS.CONTACT_SUCCESS', { name, message, email }).subscribe(alertMessage => {
        alert(alertMessage);
      });
      this.contact = { name: '', email: '', message: '' };
    } else {
      this.translate.get('ALERTS.FILL_ALL_FIELDS').subscribe(message => {
        alert(message);
      });
    }
  }

  openWhatsApp() {
    const phoneNumber = '51999999999'; // Cambiar por tu número real
    const message = encodeURIComponent('¡Hola! Quiero más información sobre Capitalent.');
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  }

  selectPricingPlan(plan: string) {
    const planName = plan === 'free' ? 'Standard' : 'Pro';
    this.translate.get('ALERTS.PRICING_SELECTED', { plan: planName }).subscribe(alertMessage => {
      alert(alertMessage);
    });
  }

  // Función para navegar a la página de registro
  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  // Función para navegar a la página de inicio de sesión
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
