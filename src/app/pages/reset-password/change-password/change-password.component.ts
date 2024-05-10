import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChangePasswordService } from 'app/services/change-password.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  token: string;
  user = {
    newPassword: '',
    confirmPassword: '',
  }

  constructor(private route: ActivatedRoute, private resetPassService: ChangePasswordService, private router: Router) { }

  ngOnInit(): void {
    this.token = this.route.snapshot.params.token; // Obtiene el token de la URL
  }

  resetPassword() {
    // Valida que las contraseñas coincidan
    if (this.user.newPassword === this.user.confirmPassword) {
      // Llama a tu servicio de autenticación para enviar la solicitud de cambio de contraseña
      this.resetPassService.resetPassword(this.token, {
        contrasena: this.user.newPassword,
      }).subscribe(
        (response) => {
          // Maneja la respuesta del backend (éxito o error)
          if (response.success) {
            this.router.navigate(['/public/login']);
          } else {
            console.error('Error al cambiar la contraseña');
          }
        },
        (error) => {
          console.error('Error al cambiar la contraseña', error);
        }
      );
    } else {
      // Muestra un mensaje al usuario de que las contraseñas no coinciden
    }
  }
}
