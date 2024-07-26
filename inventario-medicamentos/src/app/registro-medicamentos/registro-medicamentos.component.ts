import { Component } from '@angular/core';


@Component({
  selector: 'app-registro-medicamentos',
  templateUrl: './registro-medicamentos.component.html',
  styleUrls: ['./registro-medicamentos.component.css'],
})
export class RegistroMedicamentosComponent {
  medicamento = {
    codigo:'',
    nombre:'',
    descripcion:'',
    cantidad:0,
    precio:0,
    lote:'',
    fechaCaducidad:''
  };
  onSubmit(){
    console.log('Medicamento registrado:', this.medicamento);
  }
}
