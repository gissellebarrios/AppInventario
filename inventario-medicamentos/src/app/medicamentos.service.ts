import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {
  private apiUrl = 'htpp://localhost:3000/api/medicamentos';
  constructor(private http: HttpClient) { }
  
  getMedicamentos(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  addMedicamento(medicamento: any): Observable<any>{
    return this.http.post<any>(this.apiUrl, medicamento);
  }

  updateMedicamento(id: number, medicamento: any): Observable<any>{
    return this.http.put<any>('${this.apiUrl}/${id}', medicamento);
  }

  deleteMedicamento(id: number): Observable<any>{
    return this.http.delete<any>('${this.apiUrl}/${id}');
  }
}
