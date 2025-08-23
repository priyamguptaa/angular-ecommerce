import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
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
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'All';
  categories: string[] = [];
  subscriptions = new Subscription();
  sortOption: string = 'default';
  // Infinite scroll
  itemsPerLoad = 8;
  visibleProducts: Product[] = [];
  loading = false;
  allLoaded = false;

  constructor(
    public cartService: CartService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.filteredProducts = [...this.products];
    this.categories = ['All', ...new Set(this.products.map(p => p.category))];
    this.loadMore();
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

    this.visibleProducts = [];
    this.allLoaded = false;
    this.loadMore();
  }

  sortProducts() {
    switch (this.sortOption) {
      case 'priceLow':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'nameAsc':
        this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'nameDesc':
        this.filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        this.filteredProducts = [...this.products];
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !this.loading &&
      !this.allLoaded
    ) {
      this.loadMore();
    }
  }

  loadMore() {
    this.loading = true;

    setTimeout(() => {
      const start = this.visibleProducts.length;
      const next = this.filteredProducts.slice(start, start + this.itemsPerLoad);

      if (next.length > 0) {
        this.visibleProducts = [...this.visibleProducts, ...next];
      } else {
        this.allLoaded = true;
      }

      this.loading = false;
    }, 800);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
