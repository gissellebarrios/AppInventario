import { Component, OnInit } from '@angular/core';
import { EstadisticasService } from './service/estadisticas.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit{
  estadisticas: any;

  constructor(private estadisticasService: EstadisticasService){}

  ngOnInit(): void {
    this.loadEstadisticas();
  }

  loadEstadisticas(){
    this.estadisticasService.getEstadisticas().subscribe(data => {
      this.estadisticas = data;
    })
  }

}
