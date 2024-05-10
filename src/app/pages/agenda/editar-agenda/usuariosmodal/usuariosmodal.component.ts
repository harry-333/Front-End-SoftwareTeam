import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from 'app/models/Usuario';
import { UsuarioService } from 'app/services/usuario.service';

@Component({
  selector: 'app-usuariosmodal',
  templateUrl: './usuariosmodal.component.html',
  styleUrls: ['./usuariosmodal.component.scss']
})
export class UsuariosModalComponent implements OnInit {

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'accion'];
  dataSource: Usuario[] = [];

  constructor(public dialogRef: MatDialogRef<UsuariosModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario[], private usuarioService: UsuarioService) { 
      this.dataSource = data;
    }

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      (usuarios: Usuario[]) => {
        this.dataSource = usuarios;
      },
      error => {
        console.error('Error cargando usuarios', error);
      }
    );
  }

  seleccionarUsuario(event: Event, usuario: Usuario): void {
    event.stopPropagation();
    this.dialogRef.close(usuario);
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }

}
