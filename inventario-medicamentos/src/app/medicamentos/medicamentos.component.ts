import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicamentosService } from '../medicamentos.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css'],
})

export class MedicamentosComponent implements OnInit {
  medicamentos: any[] = [];
  selectedMedicamento = { nombre:'', codigo:'', precio: 0, cantidad: 0};
  editMode = false;

  @ViewChild('medicamentoModal') medicamentoModal: any;
  
constructor(
  private medicamentosService: MedicamentosService, 
  private modalService: NgbModal
) {}

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
    } else {
      this.selectedMedicamento = { nombre:'', codigo:'', precio:0, cantidad:0 };
      this.editMode = false;
    }
    this.modalService.open(this.medicamentoModal)
  }

  saveMedicamento() {
    if (this.editMode){
      this.medicamentosService.updateMedicamento(this.selectedMedicamento).subscribe(() => {
        this.loadMedicamentos();
      });
    } else {
        this.medicamentosService.addMedicamento(this.selectedMedicamento).subscribe(() =>{
          this.loadMedicamentos();
        })
    }
    this.modalService.dismissAll();
  }

  deleteMedicamento(id: number) {
    this.medicamentosService.deleteMedicamento(id).subscribe(() => {
      this.loadMedicamentos();
    });
  }
}
