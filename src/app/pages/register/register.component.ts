import { Component, OnInit } from '@angular/core';
import { Usuario } from 'app/models/Usuario';
import { UsuarioService } from 'app/services/usuario.service';
import { Router } from '@angular/router';
import { RegisterService } from 'app/services/register.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registrando: boolean = false;
  usuario: Usuario = new Usuario();

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {}

  registrarUsuario() {
    this.registrando = true;
    this.registerService.register(this.usuario).subscribe(
      (data) => {
        // Registro exitoso, maneja la respuesta aquí si es necesario
        this.registrando = false;
        this.router.navigate(['/public/login']);
      },
      (error) => {
        // Error en el registro, maneja el error aquí si es necesario
        this.registrando = false;
        if (error.status === 400) {
          // Mensaje personalizado para el error 400
          this.mostrarNotificacion('Error: el correo ya esta en uso', true);
        } else {
          // Otro manejo de errores
          this.mostrarNotificacion('Error interno del servidor, por favor contactar con el soporte técnico', true);
        }
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
