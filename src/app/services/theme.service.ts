import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class ThemeService {
  private storageKey = 'theme';

  constructor() {
    this.init();
  }

  toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem(this.storageKey, isDark ? 'dark' : 'light');
  }

  init() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved === 'dark') {
      document.body.classList.add('dark');
    }
  }

  isDarkMode(): boolean {
    return document.body.classList.contains('dark');
  }
}
