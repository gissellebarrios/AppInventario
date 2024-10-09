import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()

export class InterceptorLoginService implements HttpInterceptor{

  private excludeUrls =['http://127.0.0.1:8000/api/register/',
    'http://127.0.0.1:8000/api/empresas/',
    'http://127.0.0.1:8000/api/login/',
    'http://127.0.0.1:8000/api/medicamentos/'
  ]

  constructor(private loginService: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.excludeUrls.some(url => req.url.includes(url))) {
      return next.handle(req); // Pasar la solicitud sin modificar
    }

    const token = this.loginService.getToken();
    if (token){
      const cloned = req.clone({
        headers: req.headers.set('Authorization',`Bearer ${token}`)
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
