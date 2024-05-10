import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ChangePasswordService } from 'app/services/change-password.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private resetPassService: ChangePasswordService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  user = { email: '' }; // Modelo para el formulario

  forgetPassword() {
    
  
    const navigationExtras: NavigationExtras = {
      queryParams: {
        correo: this.user.email
      },
      queryParamsHandling: 'merge'
    };
  
    // Llama a tu servicio de cambio de contraseña y pasa el correo
    this.resetPassService.forgetPassword({ correo: this.user.email }).subscribe(
      (response) => {
        // Maneja la respuesta del backend (éxito o error)
        if (response) {
          // Redirige al usuario a la página de confirmación y pasa el correo como parámetro
          this.router.navigate(['/public/confirmacion'], navigationExtras);
          this.mostrarNotificacion('Solicitud de restablecimiento de contraseña enviada con éxito');
        } else {
          // Muestra un mensaje de error
          this.mostrarNotificacion('Error al enviar la solicitud de restablecimiento de contraseña', true);
        }
      },
      (error) => {
        console.error('Error al enviar la solicitud de restablecimiento de contraseña', error);
        this.mostrarNotificacion('Error al enviar la solicitud de restablecimiento de contraseña', true);
      }
    );
  }
  private mostrarNotificacion(mensaje: string, esError: boolean = false) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      panelClass: esError ? ['error-notificacion'] : null,
    });
  }
  

  ngOnInit(): void {
  }

}
