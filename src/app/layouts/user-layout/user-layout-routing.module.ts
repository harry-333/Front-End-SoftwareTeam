import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'app/guards/role.guard';
import { AgendaVendedorComponent } from 'app/pages/agenda/agenda-vendedor/agenda-vendedor.component';
import { RegistroAgendaComponent } from 'app/pages/agenda/agenda-vendedor/registro-agenda/registro-agenda.component';
import { UserPublicComponent } from 'app/pages/home/user-public/user-public.component';
import { UserProfileComponent } from 'app/pages/profile/user-profile/user-profile.component';
import { PropiedadVendedorComponent } from 'app/pages/propiedad/propiedad-vendedor/propiedad-vendedor.component';
import { RegistroPropiedadComponent } from 'app/pages/propiedad/propiedad-vendedor/registro-propiedad/registro-propiedad.component';
import { PublicPropiedadesComponent } from 'app/pages/propiedad/public-propiedades/public-propiedades.component';
import { VerPropiedadComponent } from 'app/pages/propiedad/public-propiedades/ver-propiedad/ver-propiedad.component';


const routes: Routes = [
  { path: 'home', component: UserPublicComponent},
  { path: 'mis-propiedades', component: PropiedadVendedorComponent, canActivate: [RoleGuard], data: { expectedRole: 2}},
  { path: 'mis-propiedades/add', component: RegistroPropiedadComponent, canActivate: [RoleGuard], data: { expectedRole: 2}},
  { path: 'mis-propiedades/edit/:id', component: RegistroPropiedadComponent, canActivate: [RoleGuard], data: { expectedRole: 2}},

  { path: 'mi-agenda', component: AgendaVendedorComponent, canActivate: [RoleGuard], data: { expectedRole: 2}},
  { path: 'mi-agenda/add', component: RegistroAgendaComponent, canActivate: [RoleGuard], data: { expectedRole: 2}},
  { path: 'mi-agenda/edit/:id', component: RegistroAgendaComponent, canActivate: [RoleGuard], data: { expectedRole: 2}},

  { path: 'inmobiliarias', component: PublicPropiedadesComponent},
  { path: 'detalle-inmobiliaria/:id', component: VerPropiedadComponent},

  { path: 'mi-perfil', component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule { }
