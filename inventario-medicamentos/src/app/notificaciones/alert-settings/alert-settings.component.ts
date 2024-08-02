import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-alert-settings',
  templateUrl: './alert-settings.component.html',
  styleUrls: ['./alert-settings.component.css'],
  imports: [ReactiveFormsModule],
  standalone: true,
})
export class AlertSettingsComponent implements OnInit {
  alertForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.alertForm = this.fb.group({
      threshold: [0] // Valor inicial
    });
  }

  onSubmit(): void {
    // Lógica para guardar el umbral de bajo stock
    console.log('Umbral de Bajo Stock:', this.alertForm.value.threshold);
  }
}