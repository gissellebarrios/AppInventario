import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule],
  standalone: true
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password:['', Validators.required]
    });
    }

  onSubmit(){
    if(this.loginForm.valid){
    console.log('this.loginForm.value');
    }
  }
}

