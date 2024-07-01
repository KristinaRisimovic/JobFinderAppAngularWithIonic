import { Injectable } from '@angular/core';
import { CanActivate,Route, Router, UrlSegment, UrlTree} from '@angular/router';
//import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router:Router) {
  }
  canActivate(): boolean {
    if (this.authService.isUserAuthenticated) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
  /* canActivate(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(!this.authService.isUserAuthenticated) {
      this.router.navigateByUrl('login-or-register');
    }
    return this.authService.isUserAuthenticated;
  }
}  */
  /* import {inject} from "@angular/core";
  import {AuthService} from "./auth.service";
  import {Router} from "@angular/router";
  
  export const AuthGuard = () => {
    const authService = inject(AuthService);
    const router = inject(Router);
  
    if(!authService.isUserAuthenticated) {
        router.navigateByUrl('/login-or-register');
    }
  
    return authService.isUserAuthenticated;
  }
 */