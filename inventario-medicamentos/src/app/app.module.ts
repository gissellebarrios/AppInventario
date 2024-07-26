import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ReportesComponent } from './reportes/reportes.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { RegistroMedicamentosComponent } from './registro-medicamentos/registro-medicamentos.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { AppRoutingModule } from './app.routes';

@NgModule({
    declarations:[
        AppComponent,
        ReportesComponent,
        MedicamentosComponent,
        MovimientosComponent,
        NotificacionesComponent,
        RegistroMedicamentosComponent,
        EstadisticasComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {}