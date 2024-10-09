import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MedicamentosService } from '../../medicamentos/service/medicamentos.service';
import { NotificacionesService } from '../service/notificaciones.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alert-settings',
  templateUrl: './alert-settings.component.html',
  styleUrls: ['./alert-settings.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
})
export class AlertSettingsComponent implements OnInit {
  medicamentos: any[] = [];
  alertas: any[] = [];
  selectedAlerta: any = null;
  alertasForm: FormGroup;
  isEdite: boolean = false;


  constructor(
    private medicamentosService: MedicamentosService,
    private notificacionesService: NotificacionesService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {
    this.alertasForm = this.fb.group({
      medicamento: [{value:'', disabled: this.isEdite}, Validators.required],
      umbral_stock: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loadMedicamentos();
    this.loadAlertas();
  }

  loadMedicamentos(): void {
    this.medicamentosService.getAll().subscribe((data: any[]) => {
      this.medicamentos = data;
    });
  }
  loadAlertas(): void{
    this.notificacionesService.getAll().subscribe((response: any[]) => {
      this.alertas = response;
    })
  }


  openModal(content: any, alerta: any =null): void {
    if(alerta){
      this.isEdite = true;
      this.selectedAlerta = alerta;
      console.log('Alerta:', alerta);  
      this.alertasForm.patchValue({
        medicamento: alerta.medicamento,
        umbral_stock: alerta.umbral_stock
      });
      this.alertasForm.get('medicamento')?.disable();
    }
    else {
      this.isEdite = false;
      this.alertasForm.reset();
      this.alertasForm.get('medicamento')?.enable();
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
  }

  onSubmit(): void {
    if (this.alertasForm.valid) {
      if(this.isEdite){
        this.alertasForm.get('medicamento')?.enable();
      }
      const alertaData = {
        medicamento: this.alertasForm.value.medicamento,
        umbral_stock: this.alertasForm.value.umbral_stock
      };
      if(this.isEdite){
        this.notificacionesService.update(this.selectedAlerta.id, alertaData).subscribe(() => {
          this.loadAlertas();
          this.modalService.dismissAll();
        });
      }else {
        this.notificacionesService.create(alertaData).subscribe(()=>{
          this.loadAlertas();
          this.modalService.dismissAll();
        });
      }
      if(this.isEdite){
        this.alertasForm.get('medicamento')?.disable();
      }
    }
  }
}