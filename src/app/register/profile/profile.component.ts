import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from './service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [ReactiveFormsModule],
  standalone: true
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  constructor(private fb: FormBuilder,private profileService: ProfileService){
    this.profileForm = this.fb.group({
      username: [{value: '', disabled: true}], 
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      tipo_documento: [0, Validators.required],
      nit: ['', Validators.required],
      direccion: ['', Validators.required],
      phone_number: ['', Validators.required],
    });
  }

  ngOnInit(): void {  
    this.loadProfile();
  }

  loadProfile(): void{
    this.profileService.getProfile().subscribe(
      (data:any) => {
        if(data){
          const profileData =data[0];
          this.profileForm.patchValue(profileData);
        }
        else {
          console.log('No se encontro el perfil del usuario.');
        }
      },
      error => {
        console.error('Error al obtener el perfil:', error);
      }
    );
  }


  onSubmit() {
    if(this.profileForm.valid){
      this.profileService.createProfile(this.profileForm.value).subscribe(
        response => {
          console.log('Perfil creado con éxito:', response);
          alert('Perfil Creado con éxito');
        },
        error => {
          console.error('Error al Creado el perfil',error);
          alert('Hubo un error al Creado el perfil');
        }
      );
    }
    else{
      console.log('El formulario no es valido', this.profileForm.errors);
    }
  }
}