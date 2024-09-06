import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ReportesComponent } from './reportes/reportes.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { AppRoutingModule } from './app.routes';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register_user/register.component';
import { AlertSettingsComponent } from './notificaciones/alert-settings/alert-settings.component';
import { NotificacionListComponent } from './notificaciones/notificacion-list/notificacion-list.component';
import { InterceptorLoginService } from './login/service/login.interceptor';
import { csrfInterceptor } from './csrf.interceptor';


@NgModule({
    declarations:[
        AppComponent,
        ReportesComponent,
        MedicamentosComponent,
        EstadisticasComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule,
        LoginComponent,
        RegisterComponent,
        AlertSettingsComponent,
        NotificacionListComponent,
        RegisterComponent,
        MovimientosComponent,
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: InterceptorLoginService, multi: true},
        provideHttpClient(withInterceptors([csrfInterceptor]))
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}