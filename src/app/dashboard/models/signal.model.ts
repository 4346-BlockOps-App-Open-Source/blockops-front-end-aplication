export interface Signal {
  id: string;
  type: 'buy' | 'sell';
  symbol: string;
  price: number;
  reason: string;
  date: Date;
    title: string;
  description: string;

}
