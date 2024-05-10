import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';


const routes: Routes =[
  {
    path: '',
    redirectTo: '/public/home',
    pathMatch: 'full',
  },

  {
    path: '',
    component: PublicLayoutComponent, // Diseño para usuarios no autenticados
    children: [
      {
        path: 'public',
        loadChildren: () => import('./layouts/public-layout/public-layout.module').then(m => m.PublicLayoutModule),
      }
    ]
  },

  {
    path: '',
    component: UserLayoutComponent, // Diseño para usuarios y vendedores
    canActivate: [AuthGuard],
    children: [{
      path: 'user',
      loadChildren: () => import('./layouts/user-layout/user-layout.module').then(m => m.UserLayoutModule)
    }]
  },
  
  {
    path: '',
    component: AdminLayoutComponent, // Diseño para el administrador
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRole: 1},
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  }
];

@NgModule({
  imports: [
  
  CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
