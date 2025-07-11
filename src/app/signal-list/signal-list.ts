import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignalService } from '../services/signal.service';
import { Signal } from '../types/signal';

@Component({
  selector: 'app-signal-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signal-list.html',
  styleUrls: ['./signal-list.css']
})
export class SignalListComponent implements OnInit {
  signals: Signal[] = [];
  cryptoName: string = '';
  newPrice: number = 0;
  oldPrice: number = 0;

  constructor(private signalService: SignalService) {}

  ngOnInit(): void {
    this.loadSignals();
  }

  loadSignals(): void {
    this.signalService.getSignals().subscribe((data: Signal[]) => {
      this.signals = data.reverse();
    });
  }

  createSignal(): void {
    if (!this.cryptoName || !this.newPrice || !this.oldPrice) return;

    this.signalService.createSignal(this.cryptoName, this.newPrice, this.oldPrice)
      .subscribe({
        next: () => {
          this.cryptoName = '';
          this.newPrice = 0;
          this.oldPrice = 0;
          this.loadSignals();
        },
        error: (err: any) => {
          console.error('❌ Error al enviar la señal:', err);
          alert('Error al guardar la señal. Verifica que el backend esté corriendo.');
        }
      });
  }
}
