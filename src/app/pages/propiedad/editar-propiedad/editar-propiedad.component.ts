import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Propiedad } from 'app/models/Propiedad';
import { TipoNeg } from 'app/models/TipoNeg';
import { TipoProp } from 'app/models/TipoProp';
import { AuthService } from 'app/services/auth.service';
import { PropiedadService } from 'app/services/propiedad.service';
import { TipoNegService } from 'app/services/tipo-neg.service';
import { TipoPropService } from 'app/services/tipo-prop.service';

@Component({
  selector: 'app-editar-propiedad',
  templateUrl: './editar-propiedad.component.html',
  styleUrls: ['./editar-propiedad.component.scss']
})
export class EditarPropiedadComponent implements OnInit {

  id = '';
  actualizando: boolean = false;
  propiedad: Propiedad = new Propiedad();

  tiposNegocio: TipoNeg[] = [];
  tiposPropiedad: TipoProp[] = [];

  
  usuarioId: number | null;

  constructor(
    private propiedadService: PropiedadService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private tipoNegocioService: TipoNegService,
    private tipoPropService: TipoPropService
  ) {}

  ngOnInit(): void {
    this.usuarioId = this.authService.getUsuarioId();
    
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.actualizando = true;
        this.propiedadService.getPropiedad(params.id).subscribe((data) => {
          if (data.length > 0) {
            this.propiedad = data[0];
            //console.log(this.propiedad.id_tipoNeg);
          }
        });
      }
    });

    this.cargarTiposNegocio();
    this.cargarTiposPropiedad();

  }

  guardarPropiedad() {
    
    if (this.propiedad.id_propiedad) {
      this.propiedadService.updatePropiedad(this.propiedad).subscribe((data) => {
        this.router.navigate(['/propiedades']);
      });
    } else {
      this.propiedad.id_vendedor = this.usuarioId;
      this.propiedadService.addPropiedad(this.propiedad).subscribe((data) => {
        this.router.navigate(['/propiedades']);
      });
    }
  }

  cargarTiposNegocio() {
    this.tipoNegocioService.getTipoNegs().subscribe(
      (data) => {
        this.tiposNegocio = data;
      },
      (error) => {
        console.error('Error al cargar tipos de negocio', error);
      }
    );
  }

  cargarTiposPropiedad() {
    this.tipoPropService.getTipoProps().subscribe(
      (data) => {
        this.tiposPropiedad = data;
      },
      (error) => {
        console.error('Error al cargar tipos de propiedad', error);
      }
    );
  }
}
