import { Component } from '@angular/core';
import { CryptoService } from '../services/crypto.service'; 
import { CryptoCardComponent } from '../crypto-card/crypto-card.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CryptoCardComponent, CurrencyPipe], // Supprimez NgFor, ajoutez CurrencyPipe si nécessaire
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  coins = this.crypto.coins;
  total = this.crypto.totalPortfolio;
  isRich = this.crypto.isRich;

  constructor(public crypto: CryptoService) {}

  // Si vous utilisez des signals dans votre service
  coinSignal = (coin: any) => coin;
}
