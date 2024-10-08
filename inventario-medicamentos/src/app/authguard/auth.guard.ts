import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { LoginService } from '../login/service/login.service';

@Injectable({ 
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userRole = this.loginService.getRole();
    const allowedRoles = route.data['roles'] as Array<string>;
    if (this.loginService.isauthenticated()) {
      if(allowedRoles && userRole && allowedRoles.includes(userRole)){
        return true;
      } else {
        alert("Este usuario no tiene rol de Administrador para ingresar a este modulo.")
        this.router.navigate(['/medicamentos']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
