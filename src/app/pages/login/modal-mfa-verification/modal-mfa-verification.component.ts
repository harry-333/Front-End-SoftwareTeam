import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'app/services/auth.service';


@Component({
  selector: 'app-modal-mfa-verification',
  templateUrl: './modal-mfa-verification.component.html',
  styleUrls: ['./modal-mfa-verification.component.scss']
})
export class ModalMfaVerificationComponent implements OnInit {
  codigoAutenticacion: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModalMfaVerificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  confirmar(): void {
    // Llamar al servicio para verificar el código de autenticación
    this.authService.validarMFA(this.data.usuarioId, this.codigoAutenticacion).subscribe(
      (response: any) => {
        // Cerrar el modal con éxito
        this.dialogRef.close(true);
      },
      (error) => {
        console.error('Error al verificar el código de autenticación:', error);
        // Mostrar mensaje de error
        this.snackBar.open('Error al verificar el código de autenticación', 'Cerrar', {
          duration: 3000,
          panelClass: ['error-snackbar']
        });
      }
    );
  }

  cancelar(): void {
    // Cerrar el modal sin hacer nada
    this.dialogRef.close(false);
  }
}
