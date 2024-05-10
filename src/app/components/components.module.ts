import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavPublicComponent } from './public/nav-public/nav-public.component';
import { FooterPublicComponent } from './public/footer-public/footer-public.component';
import { MatButtonModule } from '@angular/material/button';
import { FixedpluginComponent } from './fixedplugin/fixedplugin.component';
import { NavUserComponent } from './user-public/nav-user/nav-user.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NavPublicComponent,
    FooterPublicComponent,
    FixedpluginComponent,
    NavUserComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    NavPublicComponent,
    FooterPublicComponent,
    FixedpluginComponent,
    NavUserComponent
  ]
})
export class ComponentsModule { }
