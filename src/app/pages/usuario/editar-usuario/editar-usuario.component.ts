import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'app/models/Usuario';
import { UsuarioService } from 'app/services/usuario.service';


@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss']
})
export class EditarUsuarioComponent implements OnInit {

  id = ''
  actualizando: boolean = false;
  usuario: Usuario = new Usuario();

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params.id) {
        this.actualizando = true;
        // Si se proporciona un ID en la URL, obtén el usuario existente
        this.usuarioService.getUsuario(params.id).subscribe((data) => {
          if (data.length > 0) {
            this.usuario = data[0];
          }
        });
      }
    });
  }

  guardarUsuario() {
    if (this.usuario.id) {
      // Si ya tienes un ID, actualiza el usuario existente
      this.usuarioService.updateUsuario(this.usuario).subscribe((data) => {
        // Lógica después de la actualización
        this.router.navigate(['/usuarios'])
      });
    } else {
      // Si no tienes un ID, agrega un nuevo usuario
      this.usuarioService.addUsuario(this.usuario).subscribe((data) => {
        // Lógica después de agregar el usuario
        this.router.navigate(['/usuarios'])
      });
    }
  }

}
