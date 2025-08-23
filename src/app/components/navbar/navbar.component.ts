import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { map, Subscription } from 'rxjs';
import { ThemeService } from '../../services/theme.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterModule, MatSnackBarModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  cartCount$: any;
  cartBump = false;
  subscriptions = new Subscription();

  constructor(public cartService: CartService, public themeService: ThemeService, private snackbarService: MatSnackBar) { }

  ngOnInit(): void {
    this.cartCount$ = this.cartService.items$.pipe(map(items => items.reduce((s, p) => s + (p.quantity || 0), 0)));

    this.subscriptions.add(this.cartService.bumped$.subscribe(() => {
      this.cartBump = true;
      setTimeout(() => (this.cartBump = false), 2000);
    }));
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    const message = this.themeService.isDarkMode()
      ? '🌙 Dark mode enabled'
      : '☀️ Light mode enabled';

    this.snackbarService.open(message, 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      panelClass: this.themeService.isDarkMode() ? 'snack-dark' : 'snack-light'
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
