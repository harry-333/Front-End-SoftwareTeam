import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Propiedad } from 'app/models/Propiedad';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {

  BASE_URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getPropiedads(){
    return this.http.get<Propiedad[]>(`${this.BASE_URL}/propiedad`);
  }

  getPropiedad(id: string){
    return this.http.get<Propiedad[]>(`${this.BASE_URL}/propiedad/${id}`);
  }

  getMisPropiedades(id: number){
    return this.http.get<Propiedad[]>(`${this.BASE_URL}/propiedad/misProps/${id}`);
  }

  addPropiedad(propiedad: Propiedad){
    return this.http.post<string>(`${this.BASE_URL}/propiedad`, propiedad);
  }

  updatePropiedad(propiedad: Propiedad){
    return this.http.put<string>(`${this.BASE_URL}/propiedad/${propiedad.id_propiedad}`, propiedad);
  }

  getPropsNoAuth(){
    return this.http.get<Propiedad[]>(`${this.BASE_URL}/noAuth`);
  }
}
