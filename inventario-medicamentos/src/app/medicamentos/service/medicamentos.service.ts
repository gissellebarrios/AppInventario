import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicamentos } from '../module/medicamentos.module';


@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {
  private apiUrl = 'http://127.0.0.1:8000/api/medicamentos/';
  constructor(private http: HttpClient) { }
  
  getMedicamentos(): Observable<Medicamentos[]>{
    return this.http.get<Medicamentos[]>(this.apiUrl);
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
    const url = `${this.apiUrl}/${medicamento.id}/`;
    return this.http.put<Medicamentos>(url, medicamento,{
      headers: new HttpHeaders({
        'content-Type':'application/json'
      })
    });
  }

  deleteMedicamento(id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${id}/`,{
      headers: new HttpHeaders({
        'content-Type':'application/json'
      })
    });
  }

  getAll(): Observable<Medicamentos[]> {
    return this.http.get<Medicamentos[]>(this.apiUrl);
  }
}
