import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://127.0.0.1:8000/api/api/login/';
  private refreshUrl = 'http://127.0.0.1:8000/api/api/token/refresh/';  
  private profileUrl = 'http://127.0.0.1:8000/api/profile/';
  constructor(private http: HttpClient) { }

  login(username:string, password:string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, {username,password});
  }

  saveTokens(access: string, refresh: string, username:string) {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('username', username); 
  }
  getUsername() {
    return localStorage.getItem('username'); // Obtener el nombre de usuario
  }

  getToken(){
    return localStorage.getItem('access');
  }

  logout(){
    localStorage.removeItem('access');
    localStorage.removeItem('username');
  }

  getProfile(): Observable<any> {
    const token = this.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any>(this.profileUrl, { headers });
  }

}




