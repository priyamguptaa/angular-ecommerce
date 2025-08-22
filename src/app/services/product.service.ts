import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product.interface';


@Injectable({
    providedIn: 'root'
})
export class ProductService {
    private products: Product[] = [
        { id: 1, name: 'Wireless Headphones', price: 120, image: './../../assets/img/headphones.jpg', description: 'High quality wireless headphones with noise cancellation.', category: 'Electronics' },
        { id: 2, name: 'Smart Watch', price: 200, image: './assets/img/smartwatch.jpg', description: 'Fitness tracking smart watch with notifications.', category: 'Electronics' },
        { id: 3, name: 'Sneakers', price: 80, image: './assets/img/sneakers.jpg', description: 'Comfortable and stylish sneakers for everyday wear.', category: 'Fashion' },
        { id: 4, name: 'Laptop Backpack', price: 60, image: './assets/img/backpack.jpg', description: 'Durable backpack with laptop compartment & USB charging port.', category: 'Accessories' },
        { id: 5, name: 'Sunglasses', price: 40, image: './assets/img/sunglasses.jpg', description: 'Stylish sunglasses with UV protection.', category: 'Fashion' },
        { id: 6, name: 'Bluetooth Speaker', price: 95, image: './assets/img/speaker.jpg', description: 'Portable Bluetooth speaker with rich sound.', category: 'Electronics' },
        { id: 7, name: 'Running Shoes', price: 110, image: './assets/img/runningshoes.jpg', description: 'Lightweight running shoes designed for performance.', category: 'Fashion' },
        { id: 8, name: 'DSLR Camera', price: 550, image: './assets/img/camera.jpg', description: 'Professional DSLR camera for photography lovers.', category: 'Electronics' },
        { id: 9, name: 'Leather Wallet', price: 35, image: './assets/img/wallet.jpg', description: 'Genuine leather wallet with multiple compartments.', category: 'Accessories' }
    ];

    getProducts(): Product[] {
        return this.products;
    }

    getProductById(id: number): Product | undefined {
        return this.products.find(p => p.id === id);
    }
}
