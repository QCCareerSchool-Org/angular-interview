import { Component, OnInit, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { ProductCatalog, Product } from '../../services/product-catalog';

@Component({
  selector: 'app-product-search',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './product-search.html',
  styleUrl: './product-search.css',
})
export class ProductSearch implements OnInit {
  searchControl = new FormControl('');
  results = signal<Product[]>([]);
  loading = signal(false);

  constructor(private productCatalog: ProductCatalog) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe(term => {
      this.loading.set(true);

      this.productCatalog.search(term ?? '').subscribe((products) => {
        this.results.set(products);
        this.loading.set(false);
      });
    });
  }
}