import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://127.0.0.1:8000/api-auth';
  constructor(private http: HttpClient) { }

  login(username:string, password:string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login/`, {username,password});
  }

  saveToken(token: string){
    localStorage.setItem('access_token', token);
  }

  getToken(){
    return localStorage.getItem('access_token');
  }

  logout(){
    localStorage.removeItem('access_token');
  }

}




