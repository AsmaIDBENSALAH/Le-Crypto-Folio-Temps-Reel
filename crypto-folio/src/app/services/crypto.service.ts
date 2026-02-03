import { signal } from '@angular/core';
import type {Coin} from '../models/crypto.model.ts';

export class CryptoService{

  public coins = signal<Coin[]>([
    {id: 'btc', name:  'BITCOIN', price: 50000, quantity: 3, change24h: 0, lastUpdate: new Date(), },
    {id: 'eth', name:  'ETHEREUM', price: 3000, quantity: 5, change24h: 0, lastUpdate: new Date(), },
    {id: 'sol', name:  'SOLANA', price: 400, quantity: 20, change24h: 0, lastUpdate: new Date(), },

]);

// update the qty of a specific crypto coin
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

  // variation aléatoire ±5% 
  simulateMarket(): void {
    this.coins.update((list) => { 
      const now = new Date();
      const next = list.map((c) => {
        // variation aléatoire de ±5%
        const delta = (Math.random() * 10 - 5) / 100; 
        const newPrice = +(c.price * (1 + delta)).toFixed(2);

        // changement de 24h ~ approx..
        const change24h = +(newPrice - c.price).toFixed(2);

        return {
          ...c,
          price: newPrice,
          change24h,
          lastUpdate: now,
        };
      });
      return next;
    });
  }

  updateQuantity1(id : string, amount: number){
    this.coins.update(list => 
        list.map(coin =>
            coin.id === id 
            ? {...coin, quantity: coin.quantity+amount}
            :coin

        ))
  }
    
}


