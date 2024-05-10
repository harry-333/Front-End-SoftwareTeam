import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoNeg } from 'app/models/TipoNeg';

@Injectable({
  providedIn: 'root'
})
export class TipoNegService {

  BASE_URL = 'https://back-end-softwareteam.onrender.com'

  constructor(private http: HttpClient) { }

  getTipoNegs(){
    return this.http.get<TipoNeg[]>(`${this.BASE_URL}/tiponeg`);
  }

  getTipoNeg(id: string){
    return this.http.get<TipoNeg[]>(`${this.BASE_URL}/tiponeg/${id}`);
  }

  addTipoNeg(tipoNeg: TipoNeg){
    return this.http.post<string>(`${this.BASE_URL}/tiponeg`, tipoNeg);
  }

  updateTipoNeg(tipoNeg: TipoNeg){
    return this.http.put<string>(`${this.BASE_URL}/tiponeg/${tipoNeg.id_tipoNeg}`, tipoNeg);
  }
}
