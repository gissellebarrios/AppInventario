import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private apiUrl = 'http://127.0.0.1:8000/api/empresas/'
  constructor(private http: HttpClient) { }

  getEmpresas(): Observable<any[]> {
    return this.http.get<{ results: any[] }>(this.apiUrl).pipe(
      map(response => response.results)
    )
  }
}
