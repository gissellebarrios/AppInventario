import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../notificaciones.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.css']
})
export class NotificacionesComponent implements OnInit{
  alertas: any[] = [];

  constructor(private notificacionesService: NotificacionesService){}

  ngOnInit(): void {
    this.loadAlertas();
  }

  loadAlertas(){
    this.notificacionesService.getAlertas().subscribe(data =>{
      this.alertas = data;
    });
  }
}
