import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../interfaces/product.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  // cart: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'All';
  categories: string[] = [];
  subscriptions = new Subscription();

  constructor(
    public cartService: CartService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();

    // Keep a separate subscription if you need cart info, but don’t overwrite products
    // this.subscriptions.add(this.cartService.items$.subscribe(() => {
    // Nothing to update here for products; quantity is derived dynamically
    // }));

    this.filteredProducts = [...this.products];
    this.categories = ['All', ...new Set(this.products.map(p => p.category))];
  }

  getQuantity(productId: number): number {
    const item = this.cartService.getCart().find(p => p.id === productId);
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

  filterProducts() {
    this.filteredProducts = this.products.filter(p => {
      const matchesSearch =
        !this.searchTerm ||
        p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory =
        this.selectedCategory === 'All' || p.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
