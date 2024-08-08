import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private apiUrl = 'htpp://localhost:8000/api/alertas';
  constructor(private http: HttpClient) { }

  getAlertas(): Observable<any[]>{
    return this.http.get<any[]>(this.apiUrl);
  }
}
