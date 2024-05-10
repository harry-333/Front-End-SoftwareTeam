import { Component, ElementRef, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nav-user',
  templateUrl: './nav-user.component.html',
  styleUrls: ['./nav-user.component.scss']
})
export class NavUserComponent implements OnInit {

  private toggleButton: any;
  private sidebarVisible: boolean;
  mobile_menu_visible: any = 0;
  private _router: Subscription;

  isAdministrator: boolean;
  isVendedor: boolean;
  isUsuario: boolean;

  constructor(private router: Router, private element: ElementRef, private authService: AuthService) {
    this.sidebarVisible = false;
    const role = this.authService.getUserRole(); // Debes implementar este método

    // Define las propiedades en función del rol
    this.isAdministrator = role === 1;
    this.isVendedor = role === 2;
    this.isUsuario = role === 3;
  }
  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;

    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
    this._router = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.sidebarClose();
    });
  }

  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const body = document.getElementsByTagName('body')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    body.classList.add('nav-open');

    this.sidebarVisible = true;
  };
  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  };
  sidebarToggle() {
    const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
      var $layer = document.createElement('div');
      $layer.setAttribute('class', 'close-layer');
      if (body.querySelectorAll('.wrapper-full-page')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
      } else if (body.classList.contains('off-canvas-sidebar')) {
        document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
      }
      setTimeout(function () {
        $layer.classList.add('visible');
      }, 100);
      $layer.onclick = function () { //asign a function
        body.classList.remove('nav-open');
        this.mobile_menu_visible = 0;
        $layer.classList.remove('visible');
        this.sidebarClose();
      }.bind(this);

      body.classList.add('nav-open');
    } else {
      document.getElementsByClassName("close-layer")[0].remove();
      this.sidebarClose();
    }
  }

  cerrarSesion() {
    Swal.fire({
      title: 'Cerrar Sesión',
      text: '¿Estás seguro de que deseas cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, llama al servicio de autenticación para cerrar la sesión (eliminar el token)
        this.authService.cerrarSesion();

        // Redirige al usuario a la página de inicio de sesión
        this.router.navigate(['/public/login']);
      }
    });
  }

}
