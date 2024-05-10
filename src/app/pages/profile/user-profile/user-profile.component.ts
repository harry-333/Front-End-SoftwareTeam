import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'app/models/Usuario';
import { AuthService } from 'app/services/auth.service';
import { UsuarioService } from 'app/services/usuario.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  datosPerfil: Usuario = new Usuario; 
  contrasenas: { nueva: string, confirmar: string } = { nueva: '', confirmar: '' };


  usuarioId: number | null;

  constructor(
    private usuarioService: UsuarioService, 
    private snackBar: MatSnackBar,
    private authService : AuthService
  ) { }

  ngOnInit(): void {

    this.usuarioId = this.authService.getUsuarioId();

    this.cargarData();
    
    // Lógica para cargar datos del usuario al iniciar la página
    // this.usuarioService.obtenerDatosUsuario().subscribe((usuario) => { this.datosPerfil = usuario; });
  }

  cargarData(){
    this.usuarioService.getUsuario(this.usuarioId).subscribe((data: any) => {
      console.log(data);
        this.datosPerfil = data[0];
    }, (error) => {
      console.error('Error al obtener los datos del usuario:', error);
    })
  }

  guardarInformacionBasica() {
    this.usuarioService.actualizarInformacionBasica(this.datosPerfil).subscribe(
      () => {
        this.mostrarNotificacion('Información básica actualizada con éxito');
      },
      (error) => {
        console.error('Error al actualizar información básica:', error);
        this.mostrarNotificacion('Error al actualizar información básica', true);
      }
    );
  }

  guardarContrasena() {
    // Validar que las contraseñas coincidan
    if (this.contrasenas.nueva !== this.contrasenas.confirmar) {
      this.mostrarNotificacion('Las contraseñas no coinciden', true);
      return;
    }
  
    // Asignar la nueva contraseña al objeto principal
    this.datosPerfil.contrasena = this.contrasenas.nueva;
  
    // Llamar al servicio para actualizar la contraseña
    this.usuarioService.actualizarContrasena(this.datosPerfil).subscribe(
      () => {
        this.mostrarNotificacion('Contraseña actualizada con éxito');
      },
      (error) => {
        console.error('Error al actualizar contraseña:', error);
        this.mostrarNotificacion('Error al actualizar contraseña', true);
      }
    );
  }

  private mostrarNotificacion(mensaje: string, esError: boolean = false) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      panelClass: esError ? ['error-notificacion'] : null,
    });
  }

}
