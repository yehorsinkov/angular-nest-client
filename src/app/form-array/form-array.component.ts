import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.sass']
})
export class FormArrayComponent {
  myForm : FormGroup;
  private phoneValidators = [
    Validators.required, 
    Validators.pattern('^[0-9-+s.()]*$'),
    Validators.minLength(12),
    Validators.maxLength(12),
  ];
  constructor(){
      this.myForm = new FormGroup({
          "userName": new FormControl("Tom", [Validators.required]),
          "email": new FormControl("", [
              Validators.required, 
              Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,3}$')
          ]),
          "phones": new FormArray([
              new FormControl("+380", this.phoneValidators)
          ])
      });
  }
  getFormsControls() : FormArray{
      return this.myForm.controls['phones'] as FormArray;
  }
  addPhone(){
      (<FormArray>this.myForm.controls["phones"])
        .push(new FormControl("+380", this.phoneValidators ));
  }
  submit(){
      console.log(this.myForm);
  }
}
