import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MedicamentosService } from '../medicamentos.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css']
})
export class MovimientosComponent implements OnInit {
  medicamentos: any[] = [];
  selectedMedicamento: any = {};
  movimientoForm: FormGroup;

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
      // Handle the form submission logic here, like saving to a service or backend
      console.log(movimiento);
      this.modalService.dismissAll();
    }
  }
}