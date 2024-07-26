import { Component, OnInit } from '@angular/core';
import { MovimientosService } from '../movimientos.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css'],
})
export class MovimientosComponent implements OnInit {
  movimientos: any[] = [];
  movimiento = {
    medicamentoId:0,
    cantidad:0,
    tipo:'',
    fecha:new Date().toISOString()
  };
  constructor(private movimientoService: MovimientosService){}

  ngOnInit(): void {
    this.loadMovimientos();
  }

  loadMovimientos(){
    this.movimientoService.getMovimientos().subscribe(data =>{
      this.movimientos = data;
    })
  }

  addMovimiento(){
    this.movimientoService.addMovimiento(this.movimiento).subscribe(()=>{
      this.loadMovimientos();
      this.movimiento = { medicamentoId:0, cantidad: 0, tipo: '', fecha: new Date().toISOString() }
    })
  }
}
