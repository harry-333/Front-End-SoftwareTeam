import { Component, OnInit } from '@angular/core';
import { TipoNeg } from 'app/models/TipoNeg';
import { TipoNegService } from 'app/services/tipo-neg.service';
import { EditarTipoNegComponent } from '../editar-tipo-neg/editar-tipo-neg.component';
import { MatDialog  } from '@angular/material/dialog';

@Component({
  selector: 'app-listar-tipo-neg',
  templateUrl: './listar-tipo-neg.component.html',
  styleUrls: ['./listar-tipo-neg.component.scss']
})
export class ListarTipoNegComponent implements OnInit {

  tiposNegocio: TipoNeg[] = [];

  constructor(
    private tipoNegocioService: TipoNegService,
    public dialog: MatDialog
    ) {}

  ngOnInit() {
    this.getTiposNegocio();
  }

  getTiposNegocio() {
    this.tipoNegocioService.getTipoNegs().subscribe((data) => {
      this.tiposNegocio = data;
    });
  }

  openTipoNegocioModal(tipoNegocio?: TipoNeg) {
    const dialogRef = this.dialog.open(EditarTipoNegComponent, {
      width: '400px', // Ajusta el ancho según tus necesidades
      data: tipoNegocio || new TipoNeg(), // Si se proporciona un tipo de negocio, se utilizará para la edición; de lo contrario, se creará uno nuevo.
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Lógica para manejar los resultados después de cerrar el modal (puede ser la actualización de la lista, etc.).
        this.getTiposNegocio(); // Actualizar la lista después de cerrar el modal
      }
    });
  }

  editarTipoNegocio(tipoNegocio: TipoNeg) {
    this.openTipoNegocioModal(tipoNegocio);
  }

}
