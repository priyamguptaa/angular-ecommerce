import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { PRODUCTS } from '../utils/product.util';


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private products: Product[] = [];

    getProducts(): Product[] {
        this.products = PRODUCTS;
        return this.products;
    }

    getProductById(id: number): Product | undefined {
        return this.products.find(p => p.id === id);
    }
}
