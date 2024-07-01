import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Role } from '../auth/role';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authService.user && this.authService.user.role === Role.Admin) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}