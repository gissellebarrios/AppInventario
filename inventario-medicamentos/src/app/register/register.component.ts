import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule],
  standalone: true
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router){
  this.registerForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    firtsName: ['', Validators.required],
    lastName: ['', Validators.required],
    password:['', Validators.required],
    confirmpassword:['', Validators.required],
  })
  }
  onSubmit(): void {
    if(this.registerForm.valid) {
    console.log(this.registerForm.value)
    }
  }
}
