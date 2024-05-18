import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agenda } from 'app/models/Agenda';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  BASE_URL = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  getAgendas(idUsuario: number){
    return this.http.get<Agenda[]>(`${this.BASE_URL}/agenda/misAgendas/${idUsuario}`);
  }

  getAgenda(id: string){
    return this.http.get<Agenda[]>(`${this.BASE_URL}/agenda/${id}`);
  }

  addAgenda(agenda: Agenda){
    return this.http.post<string>(`${this.BASE_URL}/agenda`, agenda);
  }

  updateAgenda(agenda: Agenda){
    return this.http.put<string>(`${this.BASE_URL}/agenda/${agenda.id_agenda}`, agenda);
  }

  //Informes

  // Obtener el informe completo de vendedores
  getInformeVendedores() {
    return this.http.get<Agenda[]>(`${this.BASE_URL}/agenda/informeVendedores`);
  }

  // Obtener el informe por vendedor y periodo de tiempo
  getInformeVendedor(vend: string, f1: string, f2: string) {
    return this.http.get<Agenda[]>(`${this.BASE_URL}/agenda/informeVendedor/${vend}/${f1}/${f2}`);
  }

  getInformePropiedades() {
    return this.http.get<Agenda[]>(`${this.BASE_URL}/agenda/informePropiedades`);
  }

  getInformePropiedad(tit: string, a1: string, a2: string) {
    return this.http.get<Agenda[]>(`${this.BASE_URL}/agenda/informePropiedad/${tit}/${a1}/${a2}`);
  }
  
}
