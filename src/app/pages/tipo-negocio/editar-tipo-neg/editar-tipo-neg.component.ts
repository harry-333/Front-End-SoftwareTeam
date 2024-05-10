import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoNeg } from 'app/models/TipoNeg';
import { TipoNegService } from 'app/services/tipo-neg.service';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-editar-tipo-neg',
  templateUrl: './editar-tipo-neg.component.html',
  styleUrls: ['./editar-tipo-neg.component.scss']
})
export class EditarTipoNegComponent implements OnInit {

  modalTitle: string;
  modalAction: string;
  tipoNegocio: TipoNeg;

  constructor(
    private dialogRef: MatDialogRef<EditarTipoNegComponent>,
    @Inject(MAT_DIALOG_DATA) private data: TipoNeg,
    private tipoNegocioService: TipoNegService
  ) {
    this.tipoNegocio = { ...data };
  }

  ngOnInit() {
    this.modalTitle = this.tipoNegocio.id_tipoNeg ? 'Editar Tipo de Negocio' : 'Agregar Tipo de Negocio';
    this.modalAction = this.tipoNegocio.id_tipoNeg ? 'Guardar Cambios' : 'Agregar';
  }

  guardarTipoNegocio() {
    if (this.tipoNegocio.id_tipoNeg) {
      // Lógica para editar el tipo de negocio
      this.tipoNegocioService.updateTipoNeg(this.tipoNegocio).subscribe((result) => {
        this.cerrarModal();
        
        Swal.fire('Éxito', 'Cambios guardados con éxito', 'success'); // Mostrar una alerta de éxito
        // Recargar la página
        setTimeout(() => {
          window.location.reload();
        }, 1500); // Recargar la página después de 1.5 segundos
      });
    } else {
      // Lógica para agregar un nuevo tipo de negocio
      this.tipoNegocioService.addTipoNeg(this.tipoNegocio).subscribe((result) => {
        this.cerrarModal();
        
        Swal.fire('Éxito', 'Tipo de negocio agregado con éxito', 'success'); // Mostrar una alerta de éxito
        // Recargar la página
        setTimeout(() => {
          window.location.reload();
        }, 1500); // Recargar la página después de 1.5 segundos
      });
    }
  }

  cerrarModal() {
    this.dialogRef.close();
  }

}
