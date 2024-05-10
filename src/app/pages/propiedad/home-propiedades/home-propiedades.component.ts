import { Component, OnInit } from '@angular/core';
import { Propiedad } from 'app/models/Propiedad';
import { PropiedadService } from 'app/services/propiedad.service';

@Component({
  selector: 'app-home-propiedades',
  templateUrl: './home-propiedades.component.html',
  styleUrls: ['./home-propiedades.component.scss']
})
export class HomePropiedadesComponent implements OnInit {

  propiedades: Propiedad[] = [];
  dtOptions: DataTables.Settings = {};

  constructor(private propiedadService: PropiedadService) { 
    this.propiedadService.getPropsNoAuth().subscribe((data: Propiedad[]) => {
      this.propiedades = data;
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
