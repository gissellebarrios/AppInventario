import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export interface Movimiento {
  id: number;
  medicamento: number;
  cantidad: number;
  fecha: string;
  motivo: string;
}
