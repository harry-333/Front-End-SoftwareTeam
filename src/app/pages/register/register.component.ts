import { Component, OnInit } from '@angular/core';
import { Usuario } from 'app/models/Usuario';
import { RegisterService } from 'app/services/register.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js';

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
    const encryptedPassword = this.encryptPassword(this.usuario.contrasena);
    const usuarioConEncriptacion = {
      ...this.usuario,
      contrasena: encryptedPassword
    };

    this.registerService.register(usuarioConEncriptacion).subscribe(
      (data) => {
        // Registro exitoso, maneja la respuesta aquí si es necesario
        this.registrando = false;
        this.router.navigate(['/public/login']);
      },
      (error) => {
        // Error en el registro, maneja el error aquí si es necesario
        this.registrando = false;
        if (error.status === 400) {
          this.mostrarNotificacion('Error: el correo ya está en uso', true);
        } else {
          this.mostrarNotificacion('Error interno del servidor, por favor contactar con el soporte técnico', true);
        }
      }
    );
  }

  encryptPassword(password: string): string {
    const secretKey = 'udec'; 
    return CryptoJS.AES.encrypt(password, secretKey).toString();
  }

  private mostrarNotificacion(mensaje: string, esError: boolean = false) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      panelClass: esError ? ['error-notificacion'] : null,
    });
  }
}
