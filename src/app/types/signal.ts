export interface Signal {
  date: string;
  type: 'buy' | 'sell';
  symbol: string;
  price: number;
  reason?: string;
}
