import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Alertas, AlertasResponse } from '../module/notificaciones.module';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private apiUrl = "http://127.0.0.1:8000/api/alertas/";
  private apiUrlbj = "http://127.0.0.1:8000/api/bajo-stock/"

  constructor(private http: HttpClient) { }

  getAll(): Observable<Alertas[]>{
 
    return this.http.get<AlertasResponse>(this.apiUrl).pipe(
      map(response => response.results)
    )

  }
  create(alerta: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, alerta);
  }

  update(id: number, alerta: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${id}/`, alerta);
  }
  getBajoStock():Observable<any[]>{
    return this.http.get<any[]>(this.apiUrlbj);
  }
}
