import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  isMenuOpen = false;
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  
  navItems = [
    { name: 'Ana Sayfa', path: '/' },
    { name: 'Hakkımda', path: '/about' },
    { name: 'Yetenekler', path: '/skills' },
    { name: 'Projeler', path: '/projects' },
    { name: 'İletişim', path: '/contact' }
  ];
}