import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ReportesComponent } from './reportes/reportes.component';
import { MedicamentosComponent } from './medicamentos/medicamentos.component';
import { MovimientosComponent } from './movimientos/movimientos.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { RegistroMedicamentosComponent } from './registro-medicamentos/registro-medicamentos.component';
import { AppRoutingModule } from './app.routes';

@NgModule({
    declarations:[
        AppComponent,
        ReportesComponent,
        MedicamentosComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        CommonModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {}