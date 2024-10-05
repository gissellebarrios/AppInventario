import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, catchError, throwError, tap, switchMap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://127.0.0.1:8000/api/login/';
  private refreshUrl = 'http://127.0.0.1:8000/api/api/token/refresh/';  
  private profileUrl = 'http://127.0.0.1:8000/api/profile/';
 
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { username, password })
      .pipe(
        tap(response => {
          // Verificar si la respuesta contiene los tokens
          if (response && response.token) {
            const accessToken = response.token.access
            const refreshToken = response.token.refresh
            // Guardar el accessToken y refreshToken correctamente
            localStorage.setItem('accessToken', accessToken); 
            localStorage.setItem('refreshToken', refreshToken); 
            localStorage.setItem('username', username);
            localStorage.setItem('rol', response.rol);
          } else {
            console.error('Error: Respuesta de login no contiene token.');
          }
        }),
        catchError(this.handleError)
      );
  }
  saveTokens(access: string, refresh: string, username: string, rol: string,) {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('username', username);
      localStorage.setItem('rol', rol); 
  }
  getUsername(): string | null {
    return localStorage.getItem('username'); 
  }
  getRole(): string | null {
    return localStorage.getItem('rol'); 
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  logout(){
    localStorage.removeItem('access');
    localStorage.removeItem('username');
  }

  getProfile(): Observable<any> {
    if(this.isTokenExpired()){
      return this.refreshAccessToken().pipe(
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

  refreshAccessToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError('Refresh token not available')
    }
      return this.http.post<any>(this.refreshUrl, { refresh : refreshToken })
        .pipe(
          tap(tokens  => {
            // Guardar el nuevo token de acceso
            localStorage.setItem('accessToken', tokens.access);
          }),
          catchError(error => {
            console.error('Error al refrescar el token:', error);
            return throwError(error);  // Manejar errores de renovación
          })
        );
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const expiry = tokenPayload.exp;
    const now = Math.floor(new Date().getTime() / 1000);

    return now > expiry;
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}





