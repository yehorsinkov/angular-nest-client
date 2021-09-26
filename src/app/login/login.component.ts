import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {
  public authForm: FormGroup;
  isSubmitted  =  false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.authForm  =  this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  public get formControls() {
    return this.authForm.controls;
  }

  public signIn(): void {
    this.isSubmitted = true;
    if(this.authForm.invalid){
      return;
    }
    this.authService.login(this.authForm.value)
      // .subscribe(res => {
      //   if (res) {
      //     const expireTime = 60;
      //     this.authService.setToken(res.token);
			//     this.authService.setTokenExpireTime(expireTime);
      //     this.router.navigateByUrl('/dashboard');
      //   }
    // });
  }

  public toRegistration(): void {
    this.router.navigateByUrl('/register');
  } 

}
