import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoProp } from 'app/models/TipoProp';

@Injectable({
  providedIn: 'root'
})
export class TipoPropService {

  BASE_URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getTipoProps(){
    return this.http.get<TipoProp[]>(`${this.BASE_URL}/tipoprop`);
  }

  getTipoProp(id: string){
    return this.http.get<TipoProp[]>(`${this.BASE_URL}/tipoprop/${id}`);
  }

  addTipoProp(tipoProp: TipoProp){
    return this.http.post<string>(`${this.BASE_URL}/tipoprop`, tipoProp);
  }

  updateTipoProp(tipoProp: TipoProp){
    return this.http.put<string>(`${this.BASE_URL}/tipoprop/${tipoProp.id_tipoProp}`, tipoProp);
  }
}
