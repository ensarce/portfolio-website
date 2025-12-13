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
    { name: 'Ana Sayfa', path: '/', icon: 'fas fa-home' },
    { name: 'Hakkımda', path: '/about', icon: 'fas fa-user' },
    { name: 'Yetenekler', path: '/skills', icon: 'fas fa-tools' },
    { name: 'Projeler', path: '/projects', icon: 'fas fa-project-diagram' },
    { name: 'İletişim', path: '/contact', icon: 'fas fa-envelope' }
  ];
}