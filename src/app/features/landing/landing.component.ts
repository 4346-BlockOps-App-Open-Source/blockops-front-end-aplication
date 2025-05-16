import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Signal } from '../../dashboard/models/signal.model'; // o donde tengas el modelo
import { SignalsService } from '../../dashboard/services/signals.service'; // o donde esté el servicio



@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  contact = {
    name: '',
    email: '',
    message: ''
  };
  signals: Signal[] = [];
  selectedSignal?: Signal;
  
  constructor(private translate: TranslateService, private signalsService: SignalsService) {
    // Configure supported languages
    translate.addLangs(['en', 'es']);

    // Set default language
    translate.setDefaultLang('en');

    // Detect browser language (optional)
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
    const phoneNumber = '51999999999'; // Change to your real number
    const message = encodeURIComponent('¡Hola! Quiero más información sobre Capitalent.');
    const url = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(url, '_blank');
  }

  selectPricingPlan(plan: string) {
    const translationKey = plan === 'free' ? 'ALERTS.PLAN_FREE' : 'ALERTS.PLAN_PRO';
    this.translate.get(translationKey).subscribe(message => {
      alert(message);
    });
  }
}
