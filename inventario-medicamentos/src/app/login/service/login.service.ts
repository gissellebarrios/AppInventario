import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://127.0.0.1:8000/api/api/login/';
  private refreshUrl = 'http://127.0.0.1:8000/api/api/token/refresh/';  
  constructor(private http: HttpClient) { }

  login(username:string, password:string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, {username,password});
  }

  saveTokens(access: string, refresh: string) {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
  }

  getToken(){
    return localStorage.getItem('access');
  }

  logout(){
    localStorage.removeItem('access');
  }

}




