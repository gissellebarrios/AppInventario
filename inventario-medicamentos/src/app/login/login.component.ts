import { Component,OnInit} from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule],
  standalone: true
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, routes: Router ){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password:['', Validators.required]
    });
    }
    ngOnInit(): void {
      
    }

  onSubmit(): void{
    if(this.loginForm.valid){
    console.log(this.loginForm.value);
    }
  }
}

