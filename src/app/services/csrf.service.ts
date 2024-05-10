import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CsrfService {
  private URL = 'https://back-end-softwareteam.onrender.com';
  constructor(private http: HttpClient) { }

  getCsrfToken() {
    
    return this.http.get(`${this.URL}/csrfEndpoint`, {withCredentials: true});
  }
}
