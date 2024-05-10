import { LOCALE_ID, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MAT_DATE_LOCALE, MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxQRCodeModule } from 'ngx-qrcode2';

import { ListarUsuarioComponent } from '../../pages/usuario/listar-usuario/listar-usuario.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { HomeComponent } from '../../pages/home/home.component';
import { EditarUsuarioComponent } from '../../pages/usuario/editar-usuario/editar-usuario.component';
import { DataTablesModule } from 'angular-datatables';
import { ListarTipoNegComponent } from '../../pages/tipo-negocio/listar-tipo-neg/listar-tipo-neg.component';
import { EditarTipoNegComponent } from '../../pages/tipo-negocio/editar-tipo-neg/editar-tipo-neg.component';
import { ListarTipoPropComponent } from '../../pages/tipo-propiedad/listar-tipo-prop/listar-tipo-prop.component';
import { EditarTipoPropComponent } from '../../pages/tipo-propiedad/editar-tipo-prop/editar-tipo-prop.component';
import { ListarPropiedadComponent } from '../../pages/propiedad/listar-propiedad/listar-propiedad.component';
import { EditarPropiedadComponent } from '../../pages/propiedad/editar-propiedad/editar-propiedad.component';
import { MisPropiedadesComponent } from '../../pages/propiedad/mis-propiedades/mis-propiedades.component';
import { MostrarPropiedadComponent } from '../../pages/propiedad/mostrar-propiedad/mostrar-propiedad.component';
import { ListarAgendasComponent } from '../../pages/agenda/listar-agendas/listar-agendas.component';
import { EditarAgendaComponent } from '../../pages/agenda/editar-agenda/editar-agenda.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { InformeVendedorComponent } from '../../pages/informes/informe-vendedor/informe-vendedor.component';
import { InformePropiedadComponent } from '../../pages/informes/informe-propiedad/informe-propiedad.component';
import { UsuariosModalComponent } from '../../pages/agenda/editar-agenda/usuariosmodal/usuariosmodal.component';
import { PropiedadesModalComponent } from '../../pages/agenda/editar-agenda/propiedadesmodal/propiedadesmodal.component';
import { ProfileComponent } from 'app/pages/profile/profile.component';
import { ModalHabilitarMfaComponent } from 'app/pages/profile/modal-habilitar-mfa/modal-habilitar-mfa.component';import { ModalDeshabilitarMfaComponent } from 'app/pages/profile/modal-deshabilitar-mfa/modal-deshabilitar-mfa.component';
11



@NgModule({
  imports: [
  
  CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    DataTablesModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatSnackBarModule,
    NgxQRCodeModule
  ],
  declarations: [
    DashboardComponent,
    HomeComponent,
    ListarUsuarioComponent,
    EditarUsuarioComponent,
    ListarTipoNegComponent,
    EditarTipoNegComponent,
    ListarTipoPropComponent,
    EditarTipoPropComponent,
    ListarPropiedadComponent,
    EditarPropiedadComponent,    
    MisPropiedadesComponent, 
    MostrarPropiedadComponent,
    ListarAgendasComponent,
    EditarAgendaComponent,
    InformeVendedorComponent,
    InformePropiedadComponent,
    UsuariosModalComponent,
    PropiedadesModalComponent,
    ProfileComponent,
    ModalHabilitarMfaComponent,
    ModalDeshabilitarMfaComponent,
  ],

  /*
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-CO' }, // Reemplaza 'es-ES' por tu localización
    { provide: LOCALE_ID, useValue: 'es-CO' }, // Reemplaza 'es-ES' por tu localización
  ]
  */
})

export class AdminLayoutModule {}
