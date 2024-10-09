import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators, AsyncValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './service/register.service';
import { EmpresasService } from '../../empresa/services/empresas.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  empresas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private empresaService: EmpresasService

  ){
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password:['', Validators.required],
      empresa: [null, Validators.required],
      rol:['', Validators.required],
    });
   }

  ngOnInit() {
    this.empresaService.getEmpresas().subscribe(data => {
      this.empresas = data;
    });
  }

  onSubmit(){
    if(this.registerForm.valid){
      this.registerService.register(this.registerForm.value).subscribe(
        response => {
          alert("Usuario Registrado con Exito")
          this.router.navigate(['./']);
        },
      error => {
        console.error('Error en el registro del usuario:',error)
      }
    )
  }   
  }
}
