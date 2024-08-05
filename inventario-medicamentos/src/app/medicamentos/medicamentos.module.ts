import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export interface Medicamentos {
  id?: number;
  nombre: string;
  codigo: string;
  precio: number;
  cantidad: number;
  fechacaducidad: string;
  lote: string;
 }
