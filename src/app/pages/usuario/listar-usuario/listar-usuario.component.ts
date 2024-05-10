import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioService } from 'app/services/usuario.service';
import { Usuario } from 'app/models/Usuario';

declare const $: any;

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.scss']
})
export class ListarUsuarioComponent implements OnInit {

  usuarios: Usuario[] = [];
  dtOptions: DataTables.Settings = {};

  constructor(private usuarioService: UsuarioService) { 
    this.usuarioService.getUsuarios().subscribe((data: Usuario[]) => {
      this.usuarios = data;
    }, (error) => {
      console.error('Error al obtener la lista de usuarios:', error);
    });
  }

  ngOnInit() : void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

}
