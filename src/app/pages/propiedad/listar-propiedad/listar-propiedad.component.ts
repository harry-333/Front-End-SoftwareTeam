import { Component, OnInit } from '@angular/core';
import { PropiedadService } from 'app/services/propiedad.service';
import { Propiedad } from 'app/models/Propiedad';


@Component({
  selector: 'app-listar-propiedad',
  templateUrl: './listar-propiedad.component.html',
  styleUrls: ['./listar-propiedad.component.scss']
})
export class ListarPropiedadComponent implements OnInit {

  propiedades: Propiedad[] = [];
  dtOptions: DataTables.Settings = {};

  constructor(private propiedadService: PropiedadService) { 
    this.propiedadService.getPropiedads().subscribe((data: Propiedad[]) => {
      this.propiedades = data;
      console.log(this.propiedades);
    }, (error) => {
      console.error('Error al obtener la lista de propiedades:', error);
    });
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

}
