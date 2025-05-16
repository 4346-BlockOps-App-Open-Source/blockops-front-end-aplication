import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { Signal } from '../models/signal.model';

@Injectable({
  providedIn: 'root'
})
export class SignalsService {

  private signalsSubject = new BehaviorSubject<Signal[]>([]);
  signals$ = this.signalsSubject.asObservable();

  constructor() {
    // Simula recepción de señales cada 15 segundos
    timer(0, 15000).subscribe(() => {
      const newSignal = this.generateRandomSignal();
      const currentSignals = this.signalsSubject.value;
      this.signalsSubject.next([newSignal, ...currentSignals]);
      this.notifyUser(newSignal);
    });
  }

private generateRandomSignal(): Signal {
  const types: ('buy' | 'sell')[] = ['buy', 'sell'];
  const symbols = ['BTC', 'ETH', 'SOL', 'USDT'];
  const type = types[Math.floor(Math.random() * types.length)];
  const symbol = symbols[Math.floor(Math.random() * symbols.length)];
  const price = +(Math.random() * 30000 + 1000).toFixed(2);
  const reason = type === 'buy'
    ? 'Tendencia alcista detectada con volumen creciente.'
    : 'Señal de sobreventa detectada en indicadores técnicos.';

  const title = type === 'buy' ? `¡Oportunidad de compra en ${symbol}!` : `¡Atención: señal de venta en ${symbol}!`;
  const description = `${type === 'buy' ? 'Compra' : 'Venta'} sugerida para ${symbol} a $${price}.\nMotivo: ${reason}`;

  return {
    id: Math.random().toString(36).substring(2),
    type,
    symbol: `${symbol}/USD`,
    price,
    reason,
    date: new Date(),
 title: 'SIGNALS.SAMPLE_TITLE', // ← clave para traducir
  description: 'SIGNALS.SAMPLE_DESC', // ← clave para traducir
  };
}

  private notifyUser(signal: Signal) {
    const action = signal.type === 'buy' ? 'Comprar' : 'Vender';
    if (Notification.permission === 'granted') {
      new Notification(`Señal de ${action}`, {
        body: `${signal.symbol} a $${signal.price}\nMotivo: ${signal.reason}`,
        icon: signal.type === 'buy' ? 'assets/icons/buy.png' : 'assets/icons/sell.png'
      });
    }
  }

  requestNotificationPermission() {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }

  getDailySummary(): Observable<Signal[]> {
    // Aquí podrías llamar a backend para resumen real.
    // Por ahora devuelve señales actuales
    return this.signals$;
  }
}
