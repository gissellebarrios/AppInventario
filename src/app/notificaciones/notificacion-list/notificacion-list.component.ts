import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NotificacionesService } from '../service/notificaciones.service';

@Component({
  selector: 'app-notificacion-list',
  templateUrl: './notificacion-list.component.html',
  styleUrls: ['./notificacion-list.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule]

})
export class NotificacionListComponent implements OnInit {
  notifications: any[] = [];
  
  constructor(private notificacionesService:NotificacionesService){}

  ngOnInit(): void {
    this.loadNotificaciones();
  }

  loadNotificaciones(): void {
    this.notificacionesService.getBajoStock().subscribe((data:any[]) => {
      this.notifications = data;
    });
  }
  
}