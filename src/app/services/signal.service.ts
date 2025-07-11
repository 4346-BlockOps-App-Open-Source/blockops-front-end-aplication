import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Signal } from '../types/signal';

@Injectable({
  providedIn: 'root'
})
export class SignalService {
  private signals: Signal[] = [
    {
      date: new Date().toISOString(),
      type: 'buy',
      symbol: 'BTC',
      price: 50000,
      reason: 'Crecimiento del mercado'
    }
  ];

  getSignals(): Observable<Signal[]> {
    return of(this.signals);
  }

  createSignal(symbol: string, newPrice: number, oldPrice: number): Observable<void> {
    this.signals.unshift({
      date: new Date().toISOString(),
      type: newPrice > oldPrice ? 'buy' : 'sell',
      symbol,
      price: newPrice,
      reason: 'Ejemplo generado'
    });
    return of(undefined);
  }
}
