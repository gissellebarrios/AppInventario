import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { ReportesComponent } from './reportes/reportes.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { RegistroMedicamentosComponent } from './registro-medicamentos/registro-medicamentos.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: 'medicamentos', component: MedicamentosComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'reportes', component: ReportesComponent },
  { path: 'registros', component: RegistroMedicamentosComponent },
  { path: 'notificaciones', component: NotificacionesComponent },
  { path: 'movimientos', component: MovimientosComponent },
  { path: 'estadisticas', component: EstadisticasComponent },
  { path: 'login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
