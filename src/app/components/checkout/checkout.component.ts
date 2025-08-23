import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, FormsModule, MatSnackBarModule],
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

  constructor(private cartService: CartService, private router: Router, private snackbarService: MatSnackBar, private themeService: ThemeService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCart();
    this.total = this.cartItems.reduce((sum, item) => sum + (item.price || 0), 0);
  }

  placeOrder() {
    if (!this.customer.name || !this.customer.email || !this.customer.address) {
      this.snackbarService.open('Please fill in all fields.', 'Close', {
        duration: 3000,
        verticalPosition: 'top',
        panelClass: this.themeService.isDarkMode() ? 'snack-dark' : 'snack-light'
      });
      return;
    }
    this.cartService.clearCart();
    this.router.navigate(['/success']);
  }

}
