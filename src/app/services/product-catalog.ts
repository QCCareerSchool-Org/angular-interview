import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Product {
  id: number;
  name: string;
  price: number;
}

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Running Shoes', price: 89.99 },
  { id: 2, name: 'Hiking Boots', price: 129.99 },
  { id: 3, name: 'Sandals', price: 34.99 },
  { id: 4, name: 'Sneakers', price: 64.99 },
  { id: 5, name: 'Dress Shoes', price: 149.99 },
];

@Injectable({
  providedIn: 'root',
})
export class ProductCatalog {
  /**
   * Simulates a network call with variable latency, so that
   * out-of-order responses are reproducible (e.g. typing "sh" then
   * quickly "shoe" can resolve out of order).
   */
  search(term: string): Observable<Product[]> {
    const results = term
      ? MOCK_PRODUCTS.filter((p) =>
          p.name.toLowerCase().includes(term.toLowerCase())
        )
      : MOCK_PRODUCTS;

    // Random latency between 100ms and 1500ms to simulate real
    // network variability and make the race condition visible.
    const simulatedLatency = 100 + Math.random() * 1400;

    return of(results).pipe(delay(simulatedLatency));
  }
}