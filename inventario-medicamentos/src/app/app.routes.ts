import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { ReportesComponent } from './reportes/reportes.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register_user/register.component';
import { AlertSettingsComponent } from './notificaciones/alert-settings/alert-settings.component';
import { NotificacionListComponent } from './notificaciones/notificacion-list/notificacion-list.component';
import { ProfileComponent } from './register/profile/profile.component';

export const routes: Routes = [
  { path: 'medicamentos', component: MedicamentosComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'reportes', component: ReportesComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'movimientos', component: MovimientosComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'configuracionalerta', component: AlertSettingsComponent },
  { path: 'listalertas', component: NotificacionListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
