import { Component, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {

  protected readonly title = signal('ecommerce-app');

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
}
