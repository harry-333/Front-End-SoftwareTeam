import { Component, OnInit } from '@angular/core';
import { Agenda } from 'app/models/Agenda';
import { AgendaService } from 'app/services/agenda.service';

@Component({
  selector: 'app-informe-propiedad',
  templateUrl: './informe-propiedad.component.html',
  styleUrls: ['./informe-propiedad.component.scss']
})
export class InformePropiedadComponent implements OnInit {
  selectedPropiedad: string = ''; // Variable para almacenar la propiedad seleccionada
  fechaInicial: Date;
  fechaFinal: Date;
  informe: Agenda[] = []; // Variable para almacenar los datos del informe

  constructor(private agendaService: AgendaService) {}

  ngOnInit(): void {
    // Lógica para obtener la lista de propiedades
    this.agendaService.getInformePropiedades().subscribe((data) => {
      this.informe = data;
    });
  }

  // Método para cargar el informe según los filtros seleccionados
  loadInforme() {
    if (this.selectedPropiedad && this.fechaInicial && this.fechaFinal) {
      // Formatear las fechas en formato YYYY-MM-DD para la solicitud al backend
      const fechaInicio = this.formatDate(this.fechaInicial);
      const fechaFin = this.formatDate(this.fechaFinal);

      // Llamar al servicio para obtener el informe por propiedad y período
      this.agendaService.getInformePropiedad(this.selectedPropiedad, fechaInicio, fechaFin).subscribe((data) => {
        this.informe = data;
      });
    }
  }

  // Método para formatear una fecha en formato YYYY-MM-DD
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Los meses en JavaScript son de 0 a 11
    const day = date.getDate();

    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  }
}
