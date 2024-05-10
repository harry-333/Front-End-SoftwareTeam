import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'app/models/Usuario';
import { AuthService } from 'app/services/auth.service';
import { UsuarioService } from 'app/services/usuario.service';
import { ModalHabilitarMfaComponent } from './modal-habilitar-mfa/modal-habilitar-mfa.component';
import { ModalDeshabilitarMfaComponent } from './modal-deshabilitar-mfa/modal-deshabilitar-mfa.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  datosPerfil: Usuario = new Usuario; 
  contrasenas: { nueva: string, confirmar: string } = { nueva: '', confirmar: '' };


  usuarioId: number | null;

  constructor(
    private usuarioService: UsuarioService, 
    private snackBar: MatSnackBar,
    private authService : AuthService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {

    this.usuarioId = this.authService.getUsuarioId();

    this.cargarData();
    
  }

  cargarData(){
    this.usuarioService.getUsuario(this.usuarioId).subscribe((data: any) => {
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

  habilitarDeshabilitarMFA(): void {
    // Verificar si la autenticación de dos pasos está habilitada
    if (this.datosPerfil.mfa_enabled) {
      // Abrir modal de confirmación para deshabilitar la autenticación de dos pasos
      const dialogRef = this.dialog.open(ModalDeshabilitarMfaComponent, {
        width: '400px',
        data: { mensaje: '¿Está seguro de que desea deshabilitar la autenticación de dos pasos?' }
      });

      // Suscribirse al resultado del modal
      dialogRef.afterClosed().subscribe(() => {
        // Actualizar datos del usuario
        this.cargarData();
      });
  
    } else {
      // Abrir modal para habilitar la autenticación de dos pasos
      const dialogRef = this.dialog.open(ModalHabilitarMfaComponent, {
        width: '600px',
      });
  
      // Suscribirse al resultado del modal
      dialogRef.afterClosed().subscribe(() => {
        // Actualizar datos del usuario
        this.cargarData();
      });
    }
  }
  

  private mostrarNotificacion(mensaje: string, esError: boolean = false) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      panelClass: esError ? ['error-notificacion'] : null,
    });
  }

}
