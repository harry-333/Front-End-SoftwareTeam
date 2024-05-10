import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class VerifytokenGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = route.params.token; // Obtiene el token de los parámetros de la URL

    try {
      const decoded: any = jwtDecode(token);

      // Verifica si el token ha expirado
      const currentTimestamp = Math.floor(Date.now() / 1000); // Fecha y hora actuales en segundos
      if (decoded.exp < currentTimestamp) {
        // El token ha expirado, redirigir a una página de error o a otra ruta
        this.router.navigate(['/public/login']); 
        return false;
      }

      // El token es válido y no ha expirado, permitir el acceso a la ruta
      return true;
    } catch (error) {
      // Error al decodificar el token, redirigir a una página de error o a otra ruta
      this.router.navigate(['/public/login']); 
      return false;
    }
  }
}
