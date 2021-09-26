import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent {
  public form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: Router,
  ) {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
      name: '',
      family_name: '',

    })
  }

  public submit(): void {
    const payload = this.form.getRawValue();
    this.authService.registration(payload)
      .subscribe(() => this.route.navigate(['/login']));
  }

  public toLogin() : void {
    this.route.navigate(['/login'])
  }
}
