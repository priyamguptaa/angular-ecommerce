import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',

  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
  cartCount$: any;
  cartBump = false;
  private sub?: Subscription;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.cartCount$ = this.cartService.items$.pipe(map(items => items.length));

    this.sub = this.cartService.bumped$.subscribe(() => {
      this.cartBump = true;
      setTimeout(() => (this.cartBump = false), 2000);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
