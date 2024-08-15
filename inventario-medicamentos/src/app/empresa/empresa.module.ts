import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export interface EmpresaModule { 
  id: number;
  nombre:string;
}

export interface EmpresaResponse{
  count: number;
  next: string | null;
  previous: string | null;
  results: EmpresaModule[];
}
