import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'app/models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  BASE_URL = 'https://back-end-softwareteam.onrender.com'

  constructor(private http: HttpClient) { }

  register(usuario: Usuario){
    return this.http.post<string>(`${this.BASE_URL}/api/register`, usuario);
  }
}
