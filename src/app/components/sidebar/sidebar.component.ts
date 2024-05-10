import { Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


declare const $: any;

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

//Menu Items
export const ROUTES: RouteInfo[] = [{
    path: '/dashboard',
    title: 'Dashboard',
    type: 'link',
    icontype: 'dashboard'
},
{
    path: '/home',
    title: 'Inicio',
    type: 'link',
    icontype: 'home'
},
{
    path: '/usuarios',
    title: 'Usuarios',
    type: 'link',
    icontype: 'person'
},
{
    path: '/propiedades',
    title: 'Propiedades',
    type: 'link',
    icontype: 'apartments'
},
{
    path: '/misprops',
    title: 'Mis Propiedades',
    type: 'link',
    icontype: 'home_work'
},
{
    path: '/agenda',
    title: 'Agenda',
    type: 'link',
    icontype: 'calendar_month'
},
{
    path: '/configuracion',
    title: 'Configuración',
    type: 'sub',
    icontype: 'apps',
    collapse: 'components',
    children: [
        { path: 'tipo-neg', title: 'Tipo de negocio', ab: 'TN' },
        { path: 'tipo-prop', title: 'Tipo de propiedad', ab: 'TP' },
    ]
},
{
    path: '/informes',
    title: 'Informes',
    type: 'sub',
    icontype: 'analytics',
    collapse: 'informes',
    children: [
        { path: 'info-vend', title: 'Informe vendedores', ab: 'IV' },
        { path: 'info-prop', title: 'Informe propiedades', ab: 'IP' },
    ]
}
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

    nombreUsuario: string;

    constructor(private authService: AuthService,
        private router: Router) {

    }
    public menuItems: any[];
    ps: any;
    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };

    ngOnInit() {
        
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar .sidebar-wrapper');
            this.ps = new PerfectScrollbar(elemSidebar);
        }
    }
    updatePS(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
            this.ps.update();
        }
    }
    isMac(): boolean {
        let bool = false;
        if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
            bool = true;
        }
        return bool;
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
