import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medicamentos } from '../module/medicamentos.module';


@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {
  private apiUrl = 'http://127.0.0.1:8000/api/medicamentos';
  constructor(private http: HttpClient) { }
  
  getMedicamentos(): Observable<Medicamentos[]>{
    return this.http.get<Medicamentos[]>(this.apiUrl);
  }

  addMedicamento(medicamento: Medicamentos): Observable<Medicamentos>{
    return this.http.post<Medicamentos>(this.apiUrl, medicamento);
  }

  updateMedicamento(medicamento: Medicamentos): Observable<Medicamentos>{
    return this.http.put<Medicamentos>('${this.apiUrl}/${id}', medicamento);
  }

  deleteMedicamento(id: number): Observable<any>{
    return this.http.delete<any>('${this.apiUrl}/${id}');
  }

  getAll(): Observable<Medicamentos[]> {
    return this.http.get<Medicamentos[]>(this.apiUrl);
  }
}
