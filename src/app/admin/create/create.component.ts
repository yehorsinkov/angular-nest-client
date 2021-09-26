import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interface/user.interface';
import { CreateService } from '../create.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass']
})
export class CreateComponent {
  public form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private createService: CreateService,
  ) {
    this.form = this._createForm();
  }

  private _createForm() {
    return this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
			name: ['', Validators.required],
			family_name: ['', Validators.required],
		});
  }

  public onSubmit(): void {
    const user: User = this.form.getRawValue();
    this.createService.createAdmin(user)
      .subscribe(result =>  result && alert('New admin created!'))
  }
}
