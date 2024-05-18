import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'app/models/Usuario';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  BASE_URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getUsuarios(){
    return this.http.get<Usuario[]>(`${this.BASE_URL}/usuario`);
  }

  getUsuario(id: number){
    return this.http.get<Usuario[]>(`${this.BASE_URL}/usuario/${id}`);
  }

  addUsuario(usuario: Usuario){
    return this.http.post<string>(`${this.BASE_URL}/usuario`, usuario);
  }

  updateUsuario(usuario: Usuario){
    return this.http.put<string>(`${this.BASE_URL}/usuario/${usuario.id}`, usuario);
  }

  actualizarInformacionBasica(usuario: Usuario){
    return this.http.post(`${this.BASE_URL}/profile/${usuario.id}`, usuario);
  }

  actualizarContrasena(usuario: Usuario) {
    const contrasena = { contrasena: usuario.contrasena };
    return this.http.post<string>(`${this.BASE_URL}/profile/password/${usuario.id}`, contrasena);
  }

  habilitarMFA(id: number): Observable<any> {
    //console.log(id);
    return this.http.post<any>(`${this.BASE_URL}/usuario/2fa/${id}`, {});
  }

  verificarMFA(id: number, token: string): Observable<any> {

    return this.http.post<any>(`${this.BASE_URL}/usuario/verifyOTP`, { id, token });
  }

  deshabilitarMFA(id: number): Observable<any> {
    //console.log(id);
    return this.http.post<any>(`${this.BASE_URL}/usuario/disabledOTP`, { id });
  }
}
