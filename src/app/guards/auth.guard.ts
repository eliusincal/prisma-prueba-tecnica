import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router:Router) {}
  canActivate(): boolean {
    if(!this.authService.isAuht()){
      console.log('Token no válido y expiró');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
