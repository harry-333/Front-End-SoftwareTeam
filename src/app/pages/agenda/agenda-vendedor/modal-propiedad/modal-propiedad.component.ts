import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Propiedad } from 'app/models/Propiedad';
import { AuthService } from 'app/services/auth.service';
import { PropiedadService } from 'app/services/propiedad.service';


@Component({
  selector: 'app-modal-propiedad',
  templateUrl: './modal-propiedad.component.html',
  styleUrls: ['./modal-propiedad.component.scss']
})
export class ModalPropiedadComponent implements OnInit {

  displayedColumns: string[] = ['id', 'titulo', 'ciudad','direccion', 'precio', 'accion'];
  dataSource: Propiedad[] = [];

  usuarioId: number | null;

  constructor(
    public dialogRef: MatDialogRef<ModalPropiedadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Propiedad[],
    private propiedadService: PropiedadService,
    private authService : AuthService
  ) {
    this.dataSource = data;
  }

  ngOnInit(): void {
    this.usuarioId = this.authService.getUsuarioId();
    this.cargarPropiedades();
  }

  cargarPropiedades() {
    // Llama al servicio para obtener las propiedades del usuario logueado
    this.propiedadService.getMisPropiedades(this.usuarioId).subscribe((data: Propiedad[]) => {
      this.dataSource = data;
    }, (error) => {
      console.error('Error al obtener la lista de propiedades del usuario:', error);
    });
  }

  seleccionarPropiedad(event: Event, propiedad: Propiedad): void {
    //console.log('Propiedad seleccionada:', propiedad);
    event.stopPropagation();
    this.dialogRef.close(propiedad);
  }
  

  cerrarModal(): void {
    this.dialogRef.close();
  }

}
