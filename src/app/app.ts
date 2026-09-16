import { Component } from '@angular/core';
import { ProductSearch } from './components/product-search/product-search';

@Component({
  imports: [ ProductSearch ],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
