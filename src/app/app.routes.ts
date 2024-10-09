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
import { AuthGuard } from './authguard/auth.guard';
import { InicioComponent } from './inicio/inicio.component';
import { HistorialMovimientoComponent } from './movimientos/historial-movimiento/historial-movimiento.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path:'inicio', component: InicioComponent},
  //{ path: '**', redirectTo: '/inicio' },
  { path: 'medicamentos', component: MedicamentosComponent, canActivate:[AuthGuard], data: { roles: ['admin', 'emp']} },
  { path: 'reportes', component: ReportesComponent, canActivate:[AuthGuard], data:{ roles:['admin']} },
  { path: 'profile', component: ProfileComponent, canActivate:[AuthGuard], data: { roles: ['admin', 'emp']} },
  { path: 'movimientos', component: MovimientosComponent, canActivate:[AuthGuard], data: { roles: ['admin', 'emp']} },
  { path: 'login', component: LoginComponent, data: { roles: ['admin', 'emp']} },
  { path: 'register', component: RegisterComponent, canActivate:[AuthGuard], data:{ roles:['admin']} },
  { path: 'configuracionalerta', component: AlertSettingsComponent, canActivate:[AuthGuard], data: { roles: ['admin', 'emp']} },
  { path: 'listalertas', component: NotificacionListComponent, canActivate:[AuthGuard], data: { roles: ['admin', 'emp']} },
  { path: 'historial-movimientos/:id', component:HistorialMovimientoComponent, canActivate:[AuthGuard], data: { roles: ['admin', 'emp']}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
