import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

interface Produto{
  nome: string;
  valor: number;
  imagem: string;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  produtos: Produto[] = [
    {
      nome: 'Camisa Angular',
      valor: 79.90,
      imagem: 'https://gcp-images.majestic.ink.rsvcloud.com/images/product_art/final_image/91314d5dea17408a9e7ddd14e712abd4.webp'
    },
    {
      nome: 'Caneca Programador',
      valor: 49.90,
      imagem: 'https://http2.mlstatic.com/D_NQ_NP_758375-MLA100083116809_122025-O.webp'
    },
    {
      nome: 'Mouse Gamer RGB',
      valor: 129.90,
      imagem: 'https://http2.mlstatic.com/D_NQ_NP_977554-MLA118323419098_102026-O.webp'
    },
    {
      nome: 'Teclado Mecânico',
      valor: 299.00,
      imagem: 'https://acdn-us.mitiendanube.com/stores/006/127/972/products/2-e279bbd60ac17629ab17848791224687-1024-1024.webp'
    },
    {
      nome: 'Headset Bluetooth',
      valor: 199.90,
      imagem: 'https://edifier.com.br/pub/media/catalog/product/f/o/fone-bluetooth-edifier-w600bt-pret_1.jpg'
    }
  ];
}
