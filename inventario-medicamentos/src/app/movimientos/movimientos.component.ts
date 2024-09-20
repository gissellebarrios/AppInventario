import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MedicamentosService } from '../medicamentos/service/medicamentos.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true
})
export class MovimientosComponent implements OnInit {
  medicamentos: any[] = [];
  selectedMedicamento: any = {};
  movimientoForm: FormGroup;

  motivos = ['Venta','Reabastecimiento','Donación','Vencimiento']

  constructor(
    private medicamentosService: MedicamentosService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.movimientoForm = this.fb.group({
      nombre: [''],
      cantidad: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      motivo: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadMedicamentos();
  }

  loadMedicamentos(): void {
    this.medicamentosService.getAll().subscribe((data: any[]) => {
      this.medicamentos = data;
    });
  }

  openModal(content: any, medicamento: any): void {
    this.selectedMedicamento = medicamento;
    this.movimientoForm.patchValue({
      nombre: medicamento.nombre
    });
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit(): void {
    if (this.movimientoForm.valid) {
      const movimiento = this.movimientoForm.value;
      console.log('Medicamento seleccionado:', this.selectedMedicamento);
      if(movimiento.cantidad > this.selectedMedicamento.cantidad){
        console.error('La cantidad a mover excede el stock disponible');
        return;
      }
      if(this.selectedMedicamento && this.selectedMedicamento.id){
        this.selectedMedicamento.cantidad -= movimiento.cantidad;
        this.medicamentosService.MovMedicamento(this.selectedMedicamento)
        .subscribe(()=>{
            console.log('Medicamento actualizado con éxito');
          }, error => {
              console.error('Error al actualizar el medicamento', error);
          });
          this.modalService.dismissAll();
        } else {
          console.error('El id del medicamento es necesario para la actualizacion');
        }
    }
  }
}