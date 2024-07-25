import { Component, OnInit } from '@angular/core';
import { MedicamentosService } from '../medicamentos.service';

@Component({
  selector: 'app-medicamentos',
  templateUrl: './medicamentos.component.html',
  styleUrls: ['./medicamentos.component.css']
})
export class MedicamentosComponent implements OnInit {
  medicamentos: any[] = [];
  filteredMedicamentos: any[] = [];
  searchTerm: string = '';
  isAddFormVisible = false;

  constructor(private medicamentosService: MedicamentosService) {}

  ngOnInit(): void {
    this.loadMedicamentos();
  }

  loadMedicamentos() {
    this.medicamentosService.getMedicamentos().subscribe(data => {
      this.medicamentos = data;
      this.applyFilters();
    });
  }

  applyFilters(){
    this.filteredMedicamentos = this.medicamentos.filter(medicamento =>
      medicamento.nombre.toLowerCase().includes(this.searchTerm.toLowerCase())||
      medicamento.codigo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
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
