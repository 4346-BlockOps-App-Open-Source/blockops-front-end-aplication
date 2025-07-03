import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, DatePipe, UpperCasePipe, NgFor, NgIf, NgClass } from '@angular/common';
import { SignalsService } from './services/signals.service';
import { Signal } from './models/signal.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, NgClass, DatePipe, UpperCasePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dailySummary: Signal[] = [];
  signals: Signal[] = [];
  selectedSignal: Signal | null = null;

  constructor(private signalsService: SignalsService, public router: Router) {}

  ngOnInit(): void {
    this.signalsService.requestNotificationPermission();

    this.signalsService.getDailySummary().subscribe(data => {
      this.dailySummary = data.slice(0, 5); // resumen top 5
    });

    this.signalsService.signals$.subscribe(signals => {
      this.signals = signals;
    });
  }

  selectSignal(signal: Signal) {
    this.selectedSignal = signal;
  }

  closeExplanation() {
    this.selectedSignal = null;
  }

  logout() {
    // Aquí podrías limpiar el token y/o manejar lógica necesaria
    localStorage.clear();
    this.router.navigate(['']); // Navega al landing, que es la ruta raíz
  }
}
