import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {
  private apiUrl = 'htpp://localhost:3000/movimientos';
  constructor(private http: HttpClient) { }
  
  getMovimientos(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }

  addMovimiento(movimiento: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, movimiento);
  }
}
