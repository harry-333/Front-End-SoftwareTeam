import { Component, OnInit } from '@angular/core';
import { Agenda } from 'app/models/Agenda';
import { AgendaService } from 'app/services/agenda.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { logoBase64 } from 'assets/img/logoBase64';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-informe-propiedad',
  templateUrl: './informe-propiedad.component.html',
  styleUrls: ['./informe-propiedad.component.scss']
})
export class InformePropiedadComponent implements OnInit {
  selectedPropiedad: string = '';
  fechaInicial: Date;
  fechaFinal: Date;
  informe: any[] = [];

  constructor(private agendaService: AgendaService) { }

  ngOnInit(): void {
    this.agendaService.getInformePropiedades().subscribe((data) => {
      this.informe = data;
    });
  }

  loadInforme() {
    if (this.selectedPropiedad && this.fechaInicial && this.fechaFinal) {
      const fechaInicio = this.formatDate(this.fechaInicial);
      const fechaFin = this.formatDate(this.fechaFinal);

      this.agendaService.getInformePropiedad(this.selectedPropiedad, fechaInicio, fechaFin).subscribe((data) => {
        this.informe = data;
      });
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
  }

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
          text: 'Informe de propiedades',
          style: 'subheader',
          margin: [0, 10, 0, 10],
          alignment: 'center'
        },
        {
          table: {
            headerRows: 1,
            widths: ['auto', 'auto', '*', 'auto', '*', 'auto', 'auto', 'auto', '*', 'auto', 'auto', 'auto'],
            body: [
              [
                { text: 'Código propiedad', style: 'tableHeader' },
                { text: 'Tipo de negocio', style: 'tableHeader' },
                { text: 'Título', style: 'tableHeader' },
                { text: 'Ciudad', style: 'tableHeader' },
                { text: 'Dirección', style: 'tableHeader' },
                { text: 'Precio', style: 'tableHeader' },
                { text: 'Nº Habitaciones', style: 'tableHeader' },
                { text: 'Nº Baños', style: 'tableHeader' },
                { text: 'Descripción', style: 'tableHeader' },
                { text: 'Tipo de propiedad', style: 'tableHeader' },
                { text: 'Área construida', style: 'tableHeader' },
                { text: 'Fecha y Hora', style: 'tableHeader' }
              ],
              ...this.informe.map(propiedad => [
                { text: propiedad.id_propiedad, style: 'tableBody' },
                { text: propiedad.desc_Neg, style: 'tableBody' },
                { text: propiedad.titulo, style: 'tableBody' },
                { text: propiedad.ciudad, style: 'tableBody' },
                { text: propiedad.direccion, style: 'tableBody' },
                { text: propiedad.precio, style: 'tableBody' },
                { text: propiedad.No_habitaciones, style: 'tableBody' },
                { text: propiedad.No_banos, style: 'tableBody' },
                { text: propiedad.desc_Prop, style: 'tableBody' },
                { text: propiedad.desc_tipoProp, style: 'tableBody' },
                { text: propiedad.area_construida, style: 'tableBody' },
                { text: propiedad.fecha_hora, style: 'tableBody' }
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
          fontSize: 6,
          color: 'black'
        },
        tableBody: {
          fontSize: 6
        }
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }
}
