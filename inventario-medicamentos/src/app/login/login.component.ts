import { Component,OnInit} from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './service/login.service';
import { HttpHeaders } from '@angular/common/http';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule],
  standalone: true
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router ){
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password:['', Validators.required]
    });
    }

    ngOnInit(): void {}
    
  onSubmit(){
    if(this.loginForm.valid){
      const {username, password} = this.loginForm.value;
      this.loginService.login(username,password).subscribe(
        (response) =>{
          this.loginService.saveTokens(response.access, response.refresh, username)
          this.router.navigate(['/medicamentos']);
        },
        (error) => {
          console.error('Login Failed', error);
        }
      )

    }
  }

}

