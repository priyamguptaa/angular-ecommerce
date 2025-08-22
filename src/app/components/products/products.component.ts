import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  cart: Product[] = [];

  constructor(
    public cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();

    // Subscribe to cart changes
    this.cartService.items$.subscribe(items => {
      this.cart = items;
    });
  }

  getQuantity(productId: number): number {
    const item = this.cart.find(p => p.id === productId);
    return item ? item.quantity : 0;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  increaseQuantity(productId: number) {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number) {
    this.cartService.decreaseQuantity(productId);
  }
}
