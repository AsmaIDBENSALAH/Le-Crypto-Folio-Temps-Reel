import { Component, output, input, model } from '@angular/core';
import { Coin } from '../models/crypto.model';
@Component({
  selector: 'app-crypto-card',
  standalone: true,
  imports: [],
  templateUrl: './crypto-card.component.html',
  styleUrl: './crypto-card.component.css'
})
export class CryptoCardComponent {
coin= input.required<Coin>();

  updateQuantity = output<number>(); // Output pour événements
  
  onUpdateQuantity(amount: number) {
    this.updateQuantity.emit(amount);
  }
}
