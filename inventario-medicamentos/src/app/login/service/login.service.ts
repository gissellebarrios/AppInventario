import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, throwError, tap, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://127.0.0.1:8000/api/api/login/';
  private refreshUrl = 'http://127.0.0.1:8000/api/api/token/refresh/';  
  private profileUrl = 'http://127.0.0.1:8000/api/profile/';
  private userprofileUrl = 'http://127.0.0.1:8000/api/user-profile/'
  constructor(private http: HttpClient) { }

  login(username:string, password:string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, {username,password})
    .pipe(
      tap(response => {
        this.saveTokens(response.access, response.refresh,username, response.rol);
      }),
      catchError(this.handleError)
    )
  }
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
  saveTokens(access: string, refresh: string, username: string, rol: string,) {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('username', username);
    localStorage.setItem('rol', rol); 
  }
  getUsername(): string | null {
    return localStorage.getItem('username'); // Obtener el nombre de usuario
  }
  getRole(): string | null {
    const token = this.getToken();
    if(!token) return null;
    const tokenPayload = JSON.parse(atob(token.split('.')[1]))
    return tokenPayload.rol || null;
  }

  getToken(): string | null {
    return localStorage.getItem('access');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh');
  }

  logout(){
    localStorage.removeItem('access');
    localStorage.removeItem('username');
  }

  getProfile(): Observable<any> {
    if(this.isTokenExpired()){
      return this.refreshToken().pipe(
        switchMap(() => {
          const token =this.getToken();
          const headers = { Authorization: `Bearer ${token}`};
          return this.http.get<any>(this.profileUrl, {headers});
        }),
        catchError(this.handleError)
      )
    } else {
      const token =this.getToken();
      const headers = { Authorization: `Bearer ${token}`};
      return this.http.get<any>(this.profileUrl, {headers})
      .pipe(
        catchError(this.handleError)
      )
    }
  }

  isauthenticated(): boolean{
    return !!localStorage.getItem('access');
  }

  refreshToken(): Observable<any> {
    const refresh = this.getRefreshToken();
    if (refresh) {
      return this.http.post<any>(this.refreshUrl, { refresh })
        .pipe(
          tap(response => {
            // Guardar el nuevo token de acceso
            localStorage.setItem('access', response.access);
          }),
          catchError(this.handleError)  // Manejar errores de renovación
        );
    } else {
      return throwError('No refresh token found');
    }
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const expiry = tokenPayload.exp;
    const now = Math.floor(new Date().getTime() / 1000);

    return now > expiry;
  }
}




