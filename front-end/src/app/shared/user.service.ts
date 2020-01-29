import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BaseURI } from '../models/BaseURI.model';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  formModel = this.fb.group({
    username: ['', Validators.required],
    Passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let pass = fb.get('password');
  let confirmPass = fb.get('confirmPass');

    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('password').value != confirmPswrdCtrl.value){       
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      }
      else{
        confirmPswrdCtrl.setErrors(null);
        console.log(fb.get('password').value == fb.get('ConfirmPassword').value);
      }
    }

  }

  register() {    
    var body = {
      username: this.formModel.value.username,
      password: this.formModel.value.Passwords.password,
    };
    console.log(body);
    return this.http.post(BaseURI + 'auth/register', body);
  }

  login(formData) {
    return this.http.post(BaseURI + 'auth/login', formData)
  }

  getUserProfile() {
    // return this.http.get(BaseURI + 'auth/getusers');
    return this.http.get(BaseURI + 'profile');
  }

   tokenExists() : boolean{
    let token = localStorage.getItem('token'); 
     if (token == null || token == undefined) {
       return false
     }
     else{
        return true
     }
  } 

  getDecodedToken(){
    let token = localStorage.getItem('token'); 
    return jwt_decode(token);
  }

}
