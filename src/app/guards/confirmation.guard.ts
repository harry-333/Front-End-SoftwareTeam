import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // Verifica si el correo está presente en los queryParams de la ruta
    const correo = next.queryParams.correo;
    console.log(correo);

    if (correo) {
      // El usuario tiene acceso, permite la navegación
      return true;
    } else {
      // El usuario no proporcionó el correo, redirige a la página de inicio 
      this.router.navigate(['/public/home']);
      return false;
    }
  }
}
