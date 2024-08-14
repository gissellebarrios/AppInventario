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
  profileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
  ){
  this.profileForm = this.fb.group({
    username: [{value:'', disabled: true}],
    firts_name: ['', Validators.required],
    last_name: ['', Validators.required],
    tipo_documento: ['', Validators.required],
    nit: ['', Validators.required],
    direccion: ['', Validators.required],
    phone_number: ['', [Validators.required, Validators.pattern('[^[0-9]{10}$')]],
  });
  }
ngOnInit() {
  this.profileService.getProfile().subscribe(
    (data) => {
      this.profileForm.patchValue(data);
    },
    (error) => {
      console.error('Error al obtener el perfil:', error);
    }
  )
}

  onSubmit(){
    if(this.profileForm.valid){
      this.profileService.updateProfile(this.profileForm.getRawValue()).subscribe(
        (response) => {
          console.log('Perfil actualizado con éxito:', response);
          alert('Perfil Actualizado con éxito');
        },
        error => {
          console.error('Error al actualizar el perfil',error);
          alert('Hubo un error al actualizar el perfil');
        }
      );
    }
  }
}