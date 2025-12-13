import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AdminUser } from '../models/admin-user.model';
import { FirebaseService } from '../../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private isLoggedIn = false;
  private adminUser: AdminUser | null = null;
  private isBrowser: boolean;

  constructor(
    private router: Router,
    private firebaseService: FirebaseService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    // Check if user is already logged in
    if (this.isBrowser) {
      const storedUser = localStorage.getItem('adminUser');
      if (storedUser) {
        this.adminUser = JSON.parse(storedUser);
        this.isLoggedIn = true;
      }
    }
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      // Firebase authentication
      const user = await this.firebaseService.login(username, password);
      
      // Create admin user object
      this.adminUser = {
        id: user.uid,
        username: user.email,
        email: user.email,
        createdAt: new Date()
      };
      
      this.isLoggedIn = true;
      if (this.isBrowser) {
        localStorage.setItem('adminUser', JSON.stringify(this.adminUser));
      }
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  logout(): void {
    this.firebaseService.logout();
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