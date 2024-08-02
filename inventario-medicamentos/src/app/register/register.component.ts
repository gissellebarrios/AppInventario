import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule],
  standalone: true
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder){
  this.registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    password:['', Validators.required],
    rol:['', Validators.required]
  })
  }
  onSubmit(){
    if(this.registerForm.valid) {
    console.log(this.registerForm.value)
    }
  }
}
