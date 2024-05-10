import { Component, OnInit } from '@angular/core';
import { TipoProp } from 'app/models/TipoProp';
import { TipoPropService } from 'app/services/tipo-prop.service';
import { EditarTipoPropComponent } from '../editar-tipo-prop/editar-tipo-prop.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-listar-tipo-prop',
  templateUrl: './listar-tipo-prop.component.html',
  styleUrls: ['./listar-tipo-prop.component.scss']
})
export class ListarTipoPropComponent implements OnInit {
  tiposPropiedad: TipoProp[] = [];

  constructor(private tipoPropiedadService: TipoPropService, public dialog: MatDialog) {}

  ngOnInit() {
    this.getTiposPropiedad();
  }

  getTiposPropiedad() {
    this.tipoPropiedadService.getTipoProps().subscribe((data) => {
      this.tiposPropiedad = data;
    });
  }

  openTipoPropiedadModal(tipoPropiedad?: TipoProp) {
    const dialogRef = this.dialog.open(EditarTipoPropComponent, {
      width: '400px',
      data: tipoPropiedad || new TipoProp(),
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getTiposPropiedad();
      }
    });
  }

  editarTipoPropiedad(tipoPropiedad: TipoProp) {
    this.openTipoPropiedadModal(tipoPropiedad);
  }
}
