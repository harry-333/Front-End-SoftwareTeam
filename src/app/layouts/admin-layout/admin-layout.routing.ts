import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { HomeComponent } from 'app/pages/home/home.component';
import { ListarUsuarioComponent } from 'app/pages/usuario/listar-usuario/listar-usuario.component';
import { EditarUsuarioComponent } from 'app/pages/usuario/editar-usuario/editar-usuario.component';
import { ListarTipoNegComponent } from './../../pages/tipo-negocio/listar-tipo-neg/listar-tipo-neg.component';
import { ListarTipoPropComponent } from 'app/pages/tipo-propiedad/listar-tipo-prop/listar-tipo-prop.component';
import { ListarPropiedadComponent } from 'app/pages/propiedad/listar-propiedad/listar-propiedad.component';
import { MisPropiedadesComponent } from 'app/pages/propiedad/mis-propiedades/mis-propiedades.component';
import { EditarPropiedadComponent } from 'app/pages/propiedad/editar-propiedad/editar-propiedad.component';
import { MostrarPropiedadComponent } from 'app/pages/propiedad/mostrar-propiedad/mostrar-propiedad.component';
import { ListarAgendasComponent } from 'app/pages/agenda/listar-agendas/listar-agendas.component';
import { EditarAgendaComponent } from 'app/pages/agenda/editar-agenda/editar-agenda.component';
import { InformeVendedorComponent } from 'app/pages/informes/informe-vendedor/informe-vendedor.component';
import { InformePropiedadComponent } from 'app/pages/informes/informe-propiedad/informe-propiedad.component';
import { ProfileComponent } from 'app/pages/profile/profile.component';


export const AdminLayoutRoutes: Routes = [
    
    { path: 'dashboard', component: DashboardComponent },
    { path: 'home', component: HomeComponent},
    { path: 'profile', component: ProfileComponent},
    { path: 'usuarios', component: ListarUsuarioComponent},
    { path: 'usuarios/add', component: EditarUsuarioComponent},
    { path: 'usuarios/edit/:id', component: EditarUsuarioComponent},

    { path: 'propiedades', component: ListarPropiedadComponent},
    { path: 'misprops', component: MisPropiedadesComponent},
    { path: 'propiedades/add', component: EditarPropiedadComponent},
    { path: 'propiedades/edit/:id', component: EditarPropiedadComponent},
    { path: 'propiedades/:id', component: MostrarPropiedadComponent},

    { path: 'agenda', component: ListarAgendasComponent},
    { path: 'agenda/add', component: EditarAgendaComponent},
    { path: 'agenda/edit/:id', component: EditarAgendaComponent},


    { path: 'configuracion', children: [
        {path:'tipo-neg', component: ListarTipoNegComponent},
        {path:'tipo-prop', component: ListarTipoPropComponent}
    ]},

    { path: 'informes', children: [
        {path:'info-vend', component: InformeVendedorComponent},
        {path:'info-prop', component: InformePropiedadComponent}
    ]}
];
