import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { ConfirmationGuard } from 'app/guards/confirmation.guard';
import { VerifytokenGuard } from 'app/guards/verifytoken.guard';
import { PublicComponent } from 'app/pages/home/public/public.component';
import { ConfirmacionComponent } from 'app/pages/info/confirmacion/confirmacion.component';
import { LoginComponent } from 'app/pages/login/login.component';
import { HomePropiedadesComponent } from 'app/pages/propiedad/home-propiedades/home-propiedades.component';
import { RegisterComponent } from 'app/pages/register/register.component';
import { ChangePasswordComponent } from 'app/pages/reset-password/change-password/change-password.component';
import { ResetPasswordComponent } from 'app/pages/reset-password/reset-password.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'home',component: PublicComponent},
  { path: 'reset-password', component: ResetPasswordComponent},
  {path: 'change-password/:token', component: ChangePasswordComponent, canActivate: [VerifytokenGuard]},

  {path: 'inmobiliarias', component: HomePropiedadesComponent},
  {path: 'confirmacion', component: ConfirmacionComponent, canActivate: [ConfirmationGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicLayoutRoutingModule { }
