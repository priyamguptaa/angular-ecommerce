import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({ providedIn: 'root' })

export class CartService {
    private _items = new BehaviorSubject<Product[]>([]);
    items$ = this._items.asObservable();
    bumped$ = new Subject<void>();

    addToCart(product: Product) {
        this._items.next([...this._items.value, product]);
        this.bumped$.next();
    }

    removeFromCart(id: number) {
        this._items.next(this._items.value.filter(p => p.id !== id));
    }

    clearCart() { this._items.next([]); }

    getCart(): Product[] { return this._items.value; }
}
