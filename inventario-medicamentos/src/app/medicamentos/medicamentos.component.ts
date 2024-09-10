import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Medicamentos } from './module/medicamentos.module';
import { MedicamentosService } from './service/medicamentos.service';



@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css'],
})

export class MedicamentosComponent implements OnInit {
  medicamentos: Medicamentos[] = [];
  medicamentosForm: FormGroup;
  selectedMedicamento: any = {};
  editMode = false;

  @ViewChild('medicamentoModal') medicamentoModal: any;
  
constructor(
  private fb: FormBuilder,
  private medicamentosService: MedicamentosService, 
  private modalService: NgbModal
) {
  this.medicamentosForm = this.fb.group({
    nombre:['', Validators.required],
    codigo:['', Validators.required],
    precio:[0, Validators.required],
    cantidad:[0, Validators.required],
    fechacaducidad:['', Validators.required],
    lote:[''],

  })
}

  ngOnInit(): void {
    this.loadMedicamentos();
  }

  loadMedicamentos() {
    this.medicamentosService.getMedicamentos().subscribe(data => {
      this.medicamentos = data;
    });
  }
  openModal(medicamento?: any){
    if (medicamento){
      this.selectedMedicamento = {...medicamento};
      this.editMode = true;
      this.medicamentosForm.patchValue(this.selectedMedicamento);
    } else {
      this.selectedMedicamento = { nombre:'', codigo:'', precio:0, cantidad:0, fechacaducidad:'', lote: '' };
      this.editMode = false;
      this.medicamentosForm.reset();
    }
    this.modalService.open(this.medicamentoModal)
  }

  saveMedicamento() {
    if(this.medicamentosForm.valid){
      const medicamentoData = this.medicamentosForm.value;
      if (this.editMode && this.selectedMedicamento.id){
        medicamentoData.id = this.selectedMedicamento.id;
        this.medicamentosService.updateMedicamento(medicamentoData).subscribe(() => {
          this.loadMedicamentos();
          this.modalService.dismissAll();
        },
      error => {
        console.error('Error al actualizar medicamento:', error);
      });
      } else {
          this.medicamentosService.addMedicamento(medicamentoData).subscribe(() =>{
            this.loadMedicamentos();
            this.modalService.dismissAll();
          },
        error => {
          console.error('Error al agregar medicamento:', error);
        });
      }
    }
  }

  deleteMedicamento(id: number) {
    const medicamento = this.medicamentos.find(m => m.id === id);
    if (medicamento) {
      this.medicamentosService.deleteMedicamento(medicamento).subscribe(
        () => {
          this.loadMedicamentos(); // Recarga la lista de medicamentos
        },
        error => {
          console.error('Error al eliminar medicamento:', error);
        }
      );
    } else {
      console.error('Medicamento no encontrado');
    }
  }
}