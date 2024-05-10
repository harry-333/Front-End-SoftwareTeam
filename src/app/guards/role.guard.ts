import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { Observable } from 'rxjs';

import { JwtPayload, jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  canActivate(route: ActivatedRouteSnapshot):boolean{
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');

    const data = jwtDecode(token);
    const id_rol = (data as any).role_id;

    //console.log(id_rol);

    if(!this.authService.isAuth() || id_rol !== expectedRole){
      console.log('Usuario no autorizado para la vista');
      if(id_rol == 2 || id_rol == 3){
        this.router.navigate(['/user/home']);
      }else{
        this.router.navigate(['/public/home']);
      }
      return false;
    }

    return true;
  }
  
}
