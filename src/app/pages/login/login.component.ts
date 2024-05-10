import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
    public dialog: MatDialog
  ) {
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
    setTimeout(function () {
      // after 1000 ms we add the class animated to the login/register card
      card.classList.remove('card-hidden');
    }, 700);
  }
  sidebarToggle() {
    var toggleButton = this.toggleButton;
    var body = document.getElementsByTagName('body')[0];
    var sidebar = document.getElementsByClassName('navbar-collapse')[0];
    if (this.sidebarVisible == false) {
      setTimeout(function () {
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
    this.authService.singin(this.user).subscribe(
      (res: any) => {
        // Manejo del éxito
        const decoded: any = jwtDecode(res.token);
        const role = decoded.role_id;
        
        // Verificar si la autenticación de dos pasos está habilitada
        if (res.mfa_enabled) {
          // Mostrar modal para ingresar código de autenticación
          const dialogRef = this.dialog.open(ModalMfaVerificationComponent, {
            width: '400px',
            data: { usuarioId: decoded.id }
          });
  
          dialogRef.afterClosed().subscribe((result: boolean) => {
            if (result) {
              // Token válido, redireccionar al usuario a la página del sistema
              localStorage.setItem('token', res.token);
              this.redireccionarSegunRol(role);
            } else {
              // Cerrar sesión o realizar alguna otra acción
            }
          });
        } else {
          // No se requiere autenticación de dos pasos, asignar token y redireccionar
          localStorage.setItem('token', res.token);
          this.redireccionarSegunRol(role);
        }
      },
      (error) => {
        // Manejo de errores
        if (error.status === 400) {
          // Mensaje personalizado para el error 400
          this.mostrarNotificacion('Error: Usuario o contraseña incorrectos', true);
        } else {
          // Otro manejo de errores
          this.mostrarNotificacion('Error interno del servidor, por favor contactar con el soporte técnico', true);
        }
      }
    );
  }
  
  redireccionarSegunRol(role: number): void {
    // Redirigir al diseño correspondiente según el rol
    if (role === 1) {
      this.router.navigate(['/home']);
    } else if (role === 2 || role === 3) {
      this.router.navigate(['/user/home']);
    } else {
      // Redirigir a una página predeterminada en caso de otro rol desconocido
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
