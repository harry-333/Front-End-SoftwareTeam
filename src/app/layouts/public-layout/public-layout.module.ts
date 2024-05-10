import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicLayoutRoutingModule } from './public-layout-routing.module';
import { LoginComponent } from 'app/pages/login/login.component';
import { RegisterComponent } from 'app/pages/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DataTablesModule } from 'angular-datatables';
import { PublicComponent } from '../../pages/home/public/public.component';
import { ResetPasswordComponent } from '../../pages/reset-password/reset-password.component';
import { ChangePasswordComponent } from '../../pages/reset-password/change-password/change-password.component';
import { HomePropiedadesComponent } from 'app/pages/propiedad/home-propiedades/home-propiedades.component';
import { ConfirmacionComponent } from '../../pages/info/confirmacion/confirmacion.component';
import { NotFoundComponent } from '../../pages/info/not-found/not-found.component';
import { ModalMfaVerificationComponent } from 'app/pages/login/modal-mfa-verification/modal-mfa-verification.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    PublicComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    HomePropiedadesComponent,
    ConfirmacionComponent,
    NotFoundComponent,
    ModalMfaVerificationComponent,
  ],
  imports: [
    CommonModule,
    PublicLayoutRoutingModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    DataTablesModule,
    MatSnackBarModule,
    MatDialogModule,
  ]
})
export class PublicLayoutModule { }
