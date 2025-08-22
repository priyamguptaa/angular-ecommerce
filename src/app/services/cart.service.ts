import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from '../interfaces/product.interface';

@Injectable({ providedIn: 'root' })
export class CartService {
    private _items = new BehaviorSubject<Product[]>([]);
    items$ = this._items.asObservable();
    bumped$ = new Subject<void>();

    addToCart(product: Product) {
        const items = [...this._items.value];
        const index = items.findIndex(p => p.id === product.id);

        if (index !== -1) {
            items[index].quantity += 1;
        } else {
            items.push({ ...product, quantity: 1 });
        }

        this._items.next(items);
        this.bumped$.next();
    }

    removeFromCart(id: number) {
        this._items.next(this._items.value.filter(p => p.id !== id));
    }

    increaseQuantity(productId: number) {
        const items = this._items.value.map(p =>
            p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
        );
        this._items.next(items);
    }

    decreaseQuantity(productId: number) {
        const items = this._items.value
            .map(p =>
                p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
            )
            .filter(p => p.quantity > 0);

        this._items.next(items);
    }

    clearCart() {
        this._items.next([]);
    }

    getCart(): Product[] {
        return this._items.value;
    }
}
