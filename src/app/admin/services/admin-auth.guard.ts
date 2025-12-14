import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AdminAuthService } from './admin-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  
  constructor(
    private authService: AdminAuthService,
    private router: Router
  ) {}
  
  canActivate(): boolean {
    // Geçici olarak kimlik doğrulamayı devre dışı bırakıyoruz
    // Gerçek ortamda bu kod kaldırılmalı ve gerçek kimlik doğrulama kullanılmalıdır
    return true;
    
    // Normalde bu kod çalışmalı:
    /*
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/admin/login']);
      return false;
    }
    */
  }
}