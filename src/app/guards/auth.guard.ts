import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate():boolean{

    if(!this.authService.isAuth()){
      console.log('Token no valido o ya expiró');
      this.router.navigate(['/public/login']);
      return false;
    }
    return true;
  }
  
}
