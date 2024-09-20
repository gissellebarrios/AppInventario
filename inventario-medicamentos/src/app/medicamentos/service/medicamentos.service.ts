import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicamentos } from '../module/medicamentos.module';
import { MedicamentosResponse } from '../module/medicamentos.module';
import { LoginService } from '../../login/service/login.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {
  private apiUrl = 'http://127.0.0.1:8000/api/medicamentos/';
  constructor(private http: HttpClient) { }
  
  getMedicamentos(): Observable<Medicamentos[]>{
 
    return this.http.get<MedicamentosResponse>(this.apiUrl).pipe(
      map(response => response.results)
    )

  }

addMedicamento(medicamento: Medicamentos): Observable<Medicamentos>{
    console.log(medicamento);
    return this.http.post<Medicamentos>(this.apiUrl, medicamento,{
      headers: new HttpHeaders({
        'content-type':'application/json'
      })
    });    
  }
  updateMedicamento(medicamento: Medicamentos): Observable<Medicamentos>{
   if(!medicamento.id){
    throw new Error('El id del medicamento es necesario para la actualizacion');
   } 
   const url = `${this.apiUrl}${medicamento.id}/`; 
    return this.http.put<Medicamentos>(url, medicamento,{
      headers: new HttpHeaders({
        'content-Type':'application/json'
      })
    });
  }

  MovMedicamento(medicamento:Medicamentos): Observable<Medicamentos>{
    if (!medicamento.id) {
      throw new Error('El id del medicamento es necesario para la actualización');
    }
    console.log('Update data:', medicamento);
    const url = `${this.apiUrl}${medicamento.id}/`;
    return this.http.put<Medicamentos>(url,medicamento, {
      headers: new HttpHeaders({
        'Content-Type':'application/json'
      })
    });
  }
    

  deleteMedicamento(medicamento: Medicamentos): Observable<void> {
    if (!medicamento.id) {
      throw new Error('El ID del medicamento es necesario para la eliminación');
    }
    const url = `${this.apiUrl}${medicamento.id}/`;
    console.log('URL de eliminación:', url); 
    return this.http.delete<void>(url);
  }

  getAll(): Observable<Medicamentos[]> {
    return this.http.get<MedicamentosResponse>(this.apiUrl).pipe(
      map(response => response.results)
    )
  }
}
