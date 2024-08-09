import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule],
  standalone: true
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ){
  this.registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password:['', Validators.required],
  });
  }
  onSubmit(){
    this.submitted = true;

    if(this.registerForm.invalid){
      return;
    }
    this.registerService.register(this.registerForm.value).subscribe(
      response => {
        this.router.navigate(['./']);
      },
      error => {
        console.error('Error en el registro del usuario',error)
      }
    )   
  }
}
