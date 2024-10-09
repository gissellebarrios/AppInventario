import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export interface Alertas {
  id?: number;
  medicamento: string;
  medicamento_nombre: string;
  umbral_stock: number;
 }

 export interface AlertasResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Alertas[];
}