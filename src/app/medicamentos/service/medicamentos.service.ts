import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Medicamentos } from '../module/medicamentos.module';
import { MedicamentosResponse } from '../module/medicamentos.module';
import { Movimiento } from '../../movimientos/module/movimiento.module';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LoginService } from '../../login/service/login.service';


@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {
  private apiUrl = 'http://127.0.0.1:8000/api/medicamentos/';
  constructor(private http: HttpClient, private loginService: LoginService) { }
 
  private getAuthHeaders(): HttpHeaders {
    const token = this.loginService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
  
  
  getMedicamentos(): Observable<Medicamentos[]>{
    const headers = this.getAuthHeaders();
    return this.http.get<MedicamentosResponse>(this.apiUrl, { headers }).pipe(
      map(response => response.results)
    )

  }


  addMedicamento(medicamento: Medicamentos): Observable<Medicamentos>{
    const headers = this.getAuthHeaders();
    console.log(medicamento);
    return this.http.post<Medicamentos>(this.apiUrl, medicamento,{ headers });    
  }

  updateMedicamento(medicamento: Medicamentos): Observable<Medicamentos>{
    if(!medicamento.id){
    throw new Error('El id del medicamento es necesario para la actualizacion');
    } 
    const headers = this.getAuthHeaders();
    const url = `${this.apiUrl}${medicamento.id}/`; 
    return this.http.put<Medicamentos>(url, medicamento,{ headers });
  }

  MovMedicamento(medicamento:Medicamentos): Observable<Medicamentos>{
    if (!medicamento.id) {
      throw new Error('El id del medicamento es necesario para la actualización');
    }
    const headers = this.getAuthHeaders();
    console.log('Update data:', medicamento);
    const url = `${this.apiUrl}${medicamento.id}/`;
    return this.http.put<Medicamentos>(url,medicamento, { headers });
  }

  registerMovimiento(movimientoData: any): Observable<any> {
    const headers = this.getAuthHeaders(); 
    return this.http.post<any>('http://127.0.0.1:8000/api/movimientos/', movimientoData, { headers });
  }

  getHistorialMovimientos(medicamentoId: number): Observable<Movimiento[]> {
    const headers = this.getAuthHeaders(); 
    const url = `http://127.0.0.1:8000/api/movimientos/?medicamento=${medicamentoId}`;
    return this.http.get<Movimiento[]>(url, {headers});
  }

  obtenerEmpresa(empresaId: number): Observable<any>{
    return this.http.get<any>(`http://127.0.0.1:8000/api/empresas/${empresaId}/`)
  }
  
  deleteMedicamento(medicamento: Medicamentos): Observable<void> {
    if (!medicamento.id) {
      throw new Error('El ID del medicamento es necesario para la eliminación');
    }
    const headers = this.getAuthHeaders(); 
    const url = `${this.apiUrl}${medicamento.id}/`;
    console.log('URL de eliminación:', url); 
    return this.http.delete<void>(url, { headers });
  }

  getAll(): Observable<Medicamentos[]> {
    const headers = this.getAuthHeaders(); 
    return this.http.get<MedicamentosResponse>(this.apiUrl, { headers }).pipe(
      map(response => response.results)
    )
  }
}
