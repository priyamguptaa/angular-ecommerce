import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: Product[] = [];
  total: number = 0;
  subscriptions = new Subscription();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.subscriptions.add(this.cartService.items$.subscribe(items => {
      this.cartItems = items;
      this.total = this.getTotal();
    }));
  }

  increaseQuantity(productId: number) {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  getTotal(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
