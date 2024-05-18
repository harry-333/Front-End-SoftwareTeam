import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { AuthService } from 'app/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ModalMfaVerificationComponent } from './modal-mfa-verification/modal-mfa-verification.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = {
    correo: '',
    contrasena: ''
  }

  private toggleButton: any;
  private sidebarVisible: boolean;
  private nativeElement: Node;

  constructor(private element: ElementRef,
              private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;
  }

  ngOnInit() {
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('login-page');
    body.classList.add('off-canvas-sidebar');
    const card = document.getElementsByClassName('card')[0];
    setTimeout(() => {
      card.classList.remove('card-hidden');
    }, 700);
  }

  sidebarToggle() {
    var toggleButton = this.toggleButton;
    var body = document.getElementsByTagName('body')[0];
    var sidebar = document.getElementsByClassName('navbar-collapse')[0];
    if (!this.sidebarVisible) {
      setTimeout(() => {
        toggleButton.classList.add('toggled');
      }, 500);
      body.classList.add('nav-open');
      this.sidebarVisible = true;
    } else {
      this.toggleButton.classList.remove('toggled');
      this.sidebarVisible = false;
      body.classList.remove('nav-open');
    }
  }

  ngOnDestroy() {
    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-page');
    body.classList.remove('off-canvas-sidebar');
  }

  login() {  
    const encryptedPassword = this.encryptPassword(this.user.contrasena);
    const userWithEncryptedPassword = {
      correo: this.user.correo,
      contrasena: encryptedPassword
    };

    this.authService.singin(userWithEncryptedPassword).subscribe(
      (res: any) => {
        const decoded: any = jwtDecode(res.token);
        const role = decoded.role_id;

        if (res.mfa_enabled) {
          const dialogRef = this.dialog.open(ModalMfaVerificationComponent, {
            width: '400px',
            data: { usuarioId: decoded.id }
          });

          dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
              localStorage.setItem('token', res.token);
              this.redireccionarSegunRol(role);
            }
          });
        } else {
          localStorage.setItem('token', res.token);
          this.redireccionarSegunRol(role);
        }
      },
      (error) => {
        if (error.status === 400) {
          this.mostrarNotificacion('Error: Usuario o contraseña incorrectos', true);
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

  redireccionarSegunRol(role: number): void {
    if (role === 1) {
      this.router.navigate(['/home']);
    } else if (role === 2 || role === 3) {
      this.router.navigate(['/user/home']);
    } else {
      this.router.navigate(['/public/login']);
    }
  }

  private mostrarNotificacion(mensaje: string, esError: boolean = false) {
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 5000,
      panelClass: esError ? ['error-notificacion'] : null,
    });
  }
}
