import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginService } from './login/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Sistema de Inventario de Medicamentos';
  username: string | null = '';
  rol: string | null ='';
  constructor(private loginService: LoginService, private router: Router){}
  ngOnInit(): void {
    this.username = this.loginService.getUsername();
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']); 
  }

  viewProfile() {
    this.loginService.getProfile().subscribe(profile => {
      this.router.navigate(['/profile']);
    });
  }
}
