import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from 'app/models/Usuario';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

  singin(user: any) {
    return this.http.post(`${this.URL}/api/login`, user);
  }

  validarMFA(id: number, token: string): Observable<any>{
    return this.http.post(`${this.URL}/api/validateOTP`, {id, token});
  }

  isAuth(): boolean {
    const token = localStorage.getItem('token');
    if (this.jwtHelper.isTokenExpired(token) || !localStorage.getItem('token')) {
      return false;
    }
    return true;
  }

  cerrarSesion() {
    // Elimina el token del almacenamiento local
    localStorage.removeItem('token');
  }

  getUsuarioId(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const data = jwtDecode(token);
      // El ID del usuario se encuentra en el payload del token
      return (data as any).id;
    }
    return null;
  }

  getUserRole(){
    const token = localStorage.getItem('token');
    if (token) {
      const data = jwtDecode(token);
      // El ID del usuario se encuentra en el payload del token
      return (data as any).role_id;
    }
    return null;
  }


}
