import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AdminUser } from '../models/admin-user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private isLoggedIn = false;
  private adminUser: AdminUser | null = null;
  private isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Check if user is already logged in (from localStorage)
    if (this.isBrowser) {
      const storedUser = localStorage.getItem('adminUser');
      if (storedUser) {
        this.adminUser = JSON.parse(storedUser);
        this.isLoggedIn = true;
      }
    }
  }

  login(username: string, password: string): boolean {
    // In a real application, this would be an API call
    // For demo purposes, we'll use a simple check
    if (username === 'admin' && password === 'admin123') {
      this.adminUser = {
        id: '1',
        username: 'admin',
        password: 'admin123',
        email: 'admin@example.com',
        createdAt: new Date()
      };
      
      this.isLoggedIn = true;
      if (this.isBrowser) {
        localStorage.setItem('adminUser', JSON.stringify(this.adminUser));
      }
      return true;
    }
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
    this.adminUser = null;
    if (this.isBrowser) {
      localStorage.removeItem('adminUser');
    }
    this.router.navigate(['/admin/login']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getAdminUser(): AdminUser | null {
    return this.adminUser;
  }
}