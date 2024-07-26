import { Component, OnInit } from '@angular/core';
import { MedicamentosService } from '../medicamentos.service';


@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css'],
})

export class MedicamentosComponent implements OnInit {
  medicamentos: any[] = [];
  isAddFormVisible = false;
  nuevoMedicamento = { nombre:'', codigo:'', precio: 0, cantidad: 0};

  
constructor(private medicamentosService: MedicamentosService) {}

  ngOnInit(): void {
    this.loadMedicamentos();
  }

  loadMedicamentos() {
    this.medicamentosService.getMedicamentos().subscribe(data => {
      this.medicamentos = data;
    });
  }
  showAddForm() {
    this.isAddFormVisible = !this.isAddFormVisible;
  }

  addMedicamento(medicamento: any) {
    this.medicamentosService.addMedicamento(medicamento).subscribe(() => {
      this.loadMedicamentos();
      this.showAddForm();
    });
  }

  editMedicamento(medicamento: any) {
    // Implementar lógica para editar medicamento
  }

  deleteMedicamento(id: number) {
    this.medicamentosService.deleteMedicamento(id).subscribe(() => {
      this.loadMedicamentos();
    });
  }
}
