import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Propiedad } from 'app/models/Propiedad';
import { PropiedadService } from 'app/services/propiedad.service';

@Component({
  selector: 'app-ver-propiedad',
  templateUrl: './ver-propiedad.component.html',
  styleUrls: ['./ver-propiedad.component.scss']
})
export class VerPropiedadComponent implements OnInit {

  propiedad: Propiedad;

  constructor(
    private propiedadService: PropiedadService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.id) {
        // Cargar la propiedad con el ID proporcionado en los parámetros
        this.propiedadService.getPropiedad(params.id).subscribe((data) => {
          if (data.length > 0) {
            this.propiedad = data[0];
          }
        });
      }
    });
  }

}
