import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTablesModule } from 'angular-datatables';

import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UserPublicComponent } from '../../pages/home/user-public/user-public.component';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { FormsModule } from '@angular/forms';
import { PropiedadVendedorComponent } from 'app/pages/propiedad/propiedad-vendedor/propiedad-vendedor.component';
import { RegistroPropiedadComponent } from '../../pages/propiedad/propiedad-vendedor/registro-propiedad/registro-propiedad.component';
import { AgendaVendedorComponent } from '../../pages/agenda/agenda-vendedor/agenda-vendedor.component';
import { RegistroAgendaComponent } from '../../pages/agenda/agenda-vendedor/registro-agenda/registro-agenda.component';
import { PublicPropiedadesComponent } from '../../pages/propiedad/public-propiedades/public-propiedades.component';
import { VerPropiedadComponent } from '../../pages/propiedad/public-propiedades/ver-propiedad/ver-propiedad.component';
import { ModalPropiedadComponent } from '../../pages/agenda/agenda-vendedor/modal-propiedad/modal-propiedad.component';
import { UserProfileComponent } from '../../pages/profile/user-profile/user-profile.component';



@NgModule({
  declarations: [
    UserPublicComponent,
    PropiedadVendedorComponent,
    RegistroPropiedadComponent,
    AgendaVendedorComponent,
    RegistroAgendaComponent,
    PublicPropiedadesComponent,
    VerPropiedadComponent,
    ModalPropiedadComponent,
    UserProfileComponent,
    
  ],

  imports: [
    CommonModule,
    UserLayoutRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    DataTablesModule,
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule
  ]
})
export class UserLayoutModule { }
