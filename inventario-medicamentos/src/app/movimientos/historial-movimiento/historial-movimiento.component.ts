import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicamentosService } from '../../medicamentos/service/medicamentos.service';
import { Movimiento } from '../module/movimiento.module';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-historial-movimiento',
  standalone: true,
  imports:  [ReactiveFormsModule, CommonModule],
  templateUrl: './historial-movimiento.component.html',
  styleUrl: './historial-movimiento.component.css'
})
export class HistorialMovimientoComponent implements OnInit{
  movimientos: Movimiento[]=[];
  medicamentoId: number | null =null;

  constructor(
    private medicamentosService: MedicamentosService,
    private route: ActivatedRoute,
    private location: Location
  ){}

  ngOnInit(): void {
    this.medicamentoId = Number(this.route.snapshot.paramMap.get('id'));
    if(this.medicamentoId){
      this.medicamentosService.getHistorialMovimientos(this.medicamentoId).subscribe(
        (data: any)=>{
          this.movimientos = data.results.filter((movimiemto:any) => movimiemto.medicamento === this.medicamentoId);
        },
        (error) => {
          console.error('Error al obtener el historial de movimientos', error);
        }
      );
    }
  }
  goBack(): void{
    this.location.back();
  }
}
