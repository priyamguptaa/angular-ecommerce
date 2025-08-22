import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  total = 0;

  customer = {
    name: '',
    email: '',
    address: ''
  };

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    this.total = this.cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
  }

  placeOrder() {
    if (!this.customer.name || !this.customer.email || !this.customer.address) {
      alert('Please fill in all fields.');
      return;
    }
    this.cartService.clearCart();
    this.router.navigate(['/success']); // ✅ redirect instead of alert
  }

}
