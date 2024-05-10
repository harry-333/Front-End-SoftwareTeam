import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'app/services/auth.service';
import { UsuarioService } from 'app/services/usuario.service';

@Component({
  selector: 'app-modal-habilitar-mfa',
  templateUrl: './modal-habilitar-mfa.component.html',
  styleUrls: ['./modal-habilitar-mfa.component.scss']
})
export class ModalHabilitarMfaComponent implements OnInit {
  codigoVerificacion: string = '';
  codigoQRUrl: string = '';

  usuarioId: number | null;

  constructor(
    public dialogRef: MatDialogRef<ModalHabilitarMfaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.usuarioId = this.authService.getUsuarioId();
    this.obtenerCodigoQR();
  }

  obtenerCodigoQR(): void {
    this.usuarioService.habilitarMFA(this.usuarioId).subscribe(
      (response: any) => {
        // Obtener la URL del código QR del backend
        this.codigoQRUrl = response.qrCode;
        //console.log(response);
      },
      (error) => {
        console.error('Error al obtener la URL del código QR:', error);
        this.snackBar.open('Error al obtener la URL del código QR', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  confirmar(): void {
    // Llamar al servicio para verificar el código de verificación
    this.usuarioService.verificarMFA(this.usuarioId, this.codigoVerificacion).subscribe(
      (response: any) => {
        // Mostrar mensaje de éxito
        console.log(response);
        this.snackBar.open('Autenticación de dos factores habilitada correctamente', 'Cerrar', {
          duration: 3000,
        });
        // Cerrar el modal
        this.dialogRef.close();
      },
      (error) => {
        console.error('Error al verificar el código de verificación:', error);
        // Mostrar mensaje de error
        this.snackBar.open('Error al verificar el código de verificación', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }
  

  cancelar(): void {
    // Cerrar el modal sin hacer nada
    this.dialogRef.close();
  }
}
