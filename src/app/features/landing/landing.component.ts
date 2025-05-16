import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Signal } from '../../dashboard/models/signal.model';
import { SignalsService } from '../../dashboard/services/signals.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  contact = {
    name: '',
    email: '',
    message: ''
  };

  signals: Signal[] = [];
  selectedSignal?: Signal;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private signalsService: SignalsService
  ) {
    // Configurar idiomas soportados
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang?.match(/en|es/) ? browserLang : 'en');
  }

  ngOnInit(): void {
    this.signalsService.signals$.subscribe((data: Signal[]) => {
      this.signals = data;
      if (this.signals.length > 0) {
        this.translate.get('ALERTS.NEW_SIGNALS').subscribe(msg => alert(msg));
      }
    });
  }

  changeLang(lang: string): void {
    this.translate.use(lang);
  }

  onStartNow(): void {
    this.translate.get('ALERTS.START_NOW').subscribe(message => {
      alert(message);
    });
  }

  scrollToSection(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onContactSubmit(): void {
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

  openWhatsApp(): void {
    const phoneNumber = '51999999999'; // Cambiar por tu número real
    const message = encodeURIComponent('¡Hola! Quiero más información sobre Capitalent.');
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  }

  selectPricingPlan(plan: string): void {
    const translationKey = plan === 'free' ? 'ALERTS.PLAN_FREE' : 'ALERTS.PLAN_PRO';
    this.translate.get(translationKey).subscribe(message => {
      alert(message);
    });
  }

  // Función para navegar a la página de registro
  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  // Función para navegar a la página de inicio de sesión
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
  navigateToEducacionFinanciera() {
    this.router.navigate(['/educacionf']);
  }
}
