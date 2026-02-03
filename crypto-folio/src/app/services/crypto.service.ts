import { Injectable, signal, computed, effect } from '@angular/core';
import type { Coin } from '../models/crypto.model';

@Injectable({ providedIn: 'root' })
export class CryptoService {

  public coins = signal<Coin[]>([
    { id: 'btc', name: 'BITCOIN', price: 50000, quantity: 3, change24h: 0, lastUpdate: new Date() },
    { id: 'eth', name: 'ETHEREUM', price: 3000, quantity: 5, change24h: 0, lastUpdate: new Date() },
    { id: 'sol', name: 'SOLANA', price: 400, quantity: 20, change24h: 0, lastUpdate: new Date() },
  ]);

 
  totalPortfolio = computed(() =>
    this.coins().reduce(
      (sum, c) => sum + c.price * c.quantity,
      0
    )
  );

  isRich = signal(false);

  constructor() {
    effect(() => {
      console.log('⚡ Marché mis à jour !');

      this.isRich.set(this.totalPortfolio() > 50000);
    });
  }

  updateQuantity(id: string, amount: number): void {
    this.coins.update((list) => {
      return list.map((c) => {if (c.id === id) {
          return {
            ...c,
            quantity: c.quantity + amount,
          };
        }
        return c;
      });
    });
  }

  simulateMarket() {
    this.coins.update(list =>
      list.map(c => {
        const variation = (Math.random() * 10 - 5);
        const newPrice = c.price * (1 + variation / 100);

        return {
          ...c,
          price: newPrice,
          change24h: variation,
          lastUpdate: new Date()
        };
      })
    );
  }

  
    
}
  


