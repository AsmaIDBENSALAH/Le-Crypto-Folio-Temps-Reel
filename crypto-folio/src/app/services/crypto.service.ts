import { Injectable, signal, computed, effect } from '@angular/core';
import type { Coin } from '../models/crypto.model';

@Injectable({ providedIn: 'root' })
export class CryptoService {

  public coins = signal<Coin[]>([
    { id: 'btc', name: 'BITCOIN', price: 50000, quantity: 3, change24h: 0, lastUpdate: new Date() },
    { id: 'eth', name: 'ETHEREUM', price: 3000, quantity: 5, change24h: 0, lastUpdate: new Date() },
    { id: 'sol', name: 'SOLANA', price: 400, quantity: 20, change24h: 0, lastUpdate: new Date() },
  ]);

  //  LOGIC-03 
  totalPortfolio = computed(() =>
    this.coins().reduce(
      (sum, c) => sum + c.price * c.quantity,
      0
    )
  );

  //  UX-04 : Alerte Baleine
  isRich = signal(false);

  constructor() {
    effect(() => {
      console.log('⚡ Marché mis à jour !');

      this.isRich.set(this.totalPortfolio() > 50000);
    });
  }

  updateQuantity(id: string, amount: number): void {
    this.coins.update(list =>
      list.map(c =>
        c.id === id
          ? { ...c, quantity: c.quantity + amount }
          : c
      )
    );
  }

  simulateMarket(): void {
    this.coins.update(list => {
      const now = new Date();

      return list.map(c => {
        const delta = (Math.random() * 10 - 5) / 100;
        const newPrice = +(c.price * (1 + delta)).toFixed(2);
        const change24h = +(newPrice - c.price).toFixed(2);

        return {
          ...c,
          price: newPrice,
          change24h,
          lastUpdate: now,
        };
      });
    });
  }
}
