import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoProp } from 'app/models/TipoProp';
import { TipoPropService } from 'app/services/tipo-prop.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-tipo-prop',
  templateUrl: './editar-tipo-prop.component.html',
  styleUrls: ['./editar-tipo-prop.component.scss']
})
export class EditarTipoPropComponent implements OnInit {
  modalTitle: string;
  modalAction: string;
  tipoPropiedad: TipoProp;

  constructor(
    private dialogRef: MatDialogRef<EditarTipoPropComponent>,
    @Inject(MAT_DIALOG_DATA) private data: TipoProp,
    private tipoPropiedadService: TipoPropService
  ) {
    this.tipoPropiedad = { ...data };
  }

  ngOnInit() {
    this.modalTitle = this.tipoPropiedad.id_tipoProp ? 'Editar Tipo de Propiedad' : 'Agregar Tipo de Propiedad';
    this.modalAction = this.tipoPropiedad.id_tipoProp ? 'Guardar Cambios' : 'Agregar';
  }

  guardarTipoPropiedad() {
    if (this.tipoPropiedad.id_tipoProp) {
      this.tipoPropiedadService.updateTipoProp(this.tipoPropiedad).subscribe((result) => {
        this.cerrarModal();
        Swal.fire('Éxito', 'Cambios guardados con éxito', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      });
    } else {
      this.tipoPropiedadService.addTipoProp(this.tipoPropiedad).subscribe((result) => {
        this.cerrarModal();
        Swal.fire('Éxito', 'Tipo de propiedad agregado con éxito', 'success');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      });
    }
  }

  cerrarModal() {
    this.dialogRef.close();
  }
}
