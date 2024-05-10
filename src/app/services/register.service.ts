import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'app/models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  BASE_URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  register(usuario: Usuario){
    return this.http.post<string>(`${this.BASE_URL}/api/register`, usuario);
  }
}
