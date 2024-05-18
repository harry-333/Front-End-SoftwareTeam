import { Component, OnInit } from '@angular/core';
import { AgendaService } from 'app/services/agenda.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { logoBase64 } from 'assets/img/logoBase64';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-informe-vendedor',
  templateUrl: './informe-vendedor.component.html',
  styleUrls: ['./informe-vendedor.component.scss']
})
export class InformeVendedorComponent implements OnInit {
  selectedVendedor: string = ''; // Variable para almacenar el vendedor seleccionado
  fechaInicial: Date;
  fechaFinal: Date;
  informe: any[] = []; // Variable para almacenar los datos del informe
  vendedores: any[] = []; // Variable para almacenar la lista de vendedores

  constructor(private agendaService: AgendaService) {}

  ngOnInit(): void {
    // Lógica para obtener la lista de vendedores
    this.agendaService.getInformeVendedores().subscribe((data) => {
      this.informe = data;
      console.log(data);
    });
  }

  // Método para cargar el informe según los filtros seleccionados
  loadInforme() {
    if (this.selectedVendedor && this.fechaInicial && this.fechaFinal) {
      // Formatear las fechas en formato YYYY-MM-DD para la solicitud al backend
      const fechaInicio = this.formatDate(this.fechaInicial);
      const fechaFin = this.formatDate(this.fechaFinal);

      // Llamar al servicio para obtener el informe por vendedor y período
      this.agendaService.getInformeVendedor(this.selectedVendedor, fechaInicio, fechaFin).subscribe((data) => {
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

  // Método para generar el PDF
  generatePDF() {
    const docDefinition = {
      content: [
        {
          columns: [
            {
              image: logoBase64,
              width: 30,
            },
            {
              text: 'Control de Inmobiliarias de Citas',
              style: 'header',
              margin: [10, 0, 0, 0],
            }
          ]
        },
        {
          text: 'Informe de Vendedores',
          style: 'subheader',
          margin: [0, 10, 0, 10],
          alignment: 'center'
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', 'auto', '*', 'auto', '*'],
            body: [
              [
                { text: 'ID', style: 'tableHeader' },
                { text: 'Nombre', style: 'tableHeader' },
                { text: 'Apellido', style: 'tableHeader' },
                { text: 'Descripción', style: 'tableHeader' },
                { text: 'Fecha y Hora', style: 'tableHeader' },
                { text: 'Comentarios', style: 'tableHeader' }
              ],
              ...this.informe.map(registro => [
                { text: registro.id_usuario, style: 'tableBody' },
                { text: registro.nombre, style: 'tableBody' },
                { text: registro.apellido, style: 'tableBody' },
                { text: registro.descripcion, style: 'tableBody' },
                { text: registro.fecha_hora, style: 'tableBody' },
                { text: registro.comentarios, style: 'tableBody' }
              ])
            ]
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
              return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
            }
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 14,
          bold: true,
        },
        tableHeader: {
          bold: true,
          fontSize: 7,
          color: 'black'
        },
        tableBody: {
          fontSize: 7
        }
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
