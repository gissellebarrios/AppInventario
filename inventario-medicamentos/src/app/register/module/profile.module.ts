import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export interface Profile {
  first_name:string;
  last_name:string;
  tipo_documento:number;
  nit:string;
  direccion:string;
  phone_number:string;
  username?: string
 }

 export interface ProfileResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Profile[];
}