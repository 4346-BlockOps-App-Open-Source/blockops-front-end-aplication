import { Component, OnInit } from '@angular/core';
import { SignalsService } from './services/signals.service';
import { Signal } from './models/signal.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dailySummary: Signal[] = [];
  signals: Signal[] = [];
  selectedSignal: Signal | null = null;

  constructor(private signalsService: SignalsService) {}

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
}
