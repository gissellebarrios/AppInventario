import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-notificacion-list',
  templateUrl: './notificacion-list.component.html',
  styleUrls: ['./notificacion-list.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]

})
export class NotificacionListComponent implements OnInit {
  notifications = [
    // Datos de ejemplo, puedes cargar datos reales aquí
    { name: 'Paracetamol', currentStock: 5, threshold: 10 },
    { name: 'Ibuprofeno', currentStock: 3, threshold: 5 }
  ];

  ngOnInit(): void {
    // Lógica para cargar las notificaciones de bajo stock
  }
}