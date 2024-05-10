import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  BASE_URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  resetPassword(token: string, data: { contrasena: string }): Observable<{ success: boolean }> {
    console.log(token, data);
    return this.http.post<{ success: boolean }>(`${this.BASE_URL}/api/reset-password/${token}`, data);
  }

  forgetPassword(data: { correo: string }) {
    //console.log(correo); //Llega correctamente el correo
    return this.http.post<string>(`${this.BASE_URL}/api/forget-password`, data);
  }

}
