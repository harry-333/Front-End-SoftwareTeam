import { Component, OnInit } from '@angular/core';
import { Propiedad } from 'app/models/Propiedad';
import { AuthService } from 'app/services/auth.service';
import { PropiedadService } from 'app/services/propiedad.service';

@Component({
  selector: 'app-mis-propiedades',
  templateUrl: './mis-propiedades.component.html',
  styleUrls: ['./mis-propiedades.component.scss']
})
export class MisPropiedadesComponent implements OnInit {

  propiedades: Propiedad[] = [];
  dtOptions: DataTables.Settings = {};

  usuarioId: number | null;

  constructor(private propiedadService: PropiedadService,
    private authService: AuthService) { }

  ngOnInit(): void {
    
    this.usuarioId = this.authService.getUsuarioId();

    // Llama al servicio para obtener las propiedades del usuario logueado
    this.propiedadService.getMisPropiedades(this.usuarioId).subscribe((data: Propiedad[]) => {
      this.propiedades = data;
    }, (error) => {
      console.error('Error al obtener la lista de propiedades del usuario:', error);
    });

    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
  }

}
