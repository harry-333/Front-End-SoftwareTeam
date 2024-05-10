import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'app/services/auth.service';
import { UsuarioService } from 'app/services/usuario.service';

@Component({
  selector: 'app-modal-deshabilitar-mfa',
  templateUrl: './modal-deshabilitar-mfa.component.html',
})
export class ModalDeshabilitarMfaComponent {

  usuarioId: number | null;

  constructor(
    public dialogRef: MatDialogRef<ModalDeshabilitarMfaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(){
    this.usuarioId = this.authService.getUsuarioId();
  }

  confirmar(): void {
         
        // Llamar al servicio para deshabilitar la autenticación de dos pasos
        this.usuarioService.deshabilitarMFA(this.usuarioId).subscribe(
          (response: any) => {
            console.log();
            this.snackBar.open('Autenticación de dos factores deshabilitada correctamente', 'Cerrar', {
              duration: 3000,
            });
            // Cerrar el modal
            this.dialogRef.close();
          },
          (error) => {
            console.error('Error al deshabilitar la autenticación de 2 pasos:', error);
            // Mostrar mensaje de error
            this.snackBar.open('Error al deshabilitar la autenticación de 2 pasos', 'Cerrar', {
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        );
      
    
  }

  cancelar(): void {
    this.dialogRef.close(); 
  }

}
