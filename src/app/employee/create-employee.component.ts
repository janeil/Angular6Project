import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';
//import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  employeeForm: FormGroup;

  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domain should be domain.com.'
    },
    'confirmEmail': {
      'required': 'Confirm Email is required.'
    },
    'emailGroup': {
      'emailMismatch': 'Email does not match.'
    },
    'phone': {
      'required': 'Phone is required.'
    },
    'skillName': {
      'required': 'Skill Name is required.'
    },
    'experienceInYears': {
      'required': 'Experience is required.'
    },
    'proficiency': {
      'required': 'Proficiency is required.'
    }

  };

  formErrors = {
    'fullName': '',
    'email': '',
    'confirmEmail': '',
    'emailGroup': '',
    'phone': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: [''],
      emailGroup: this.fb.group({
        email: [''],
        confirmEmail: [''],
    },{validator: matchEmail}),
      phone: [''],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required]
      })
    });

    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPreferenceChange(data);
    });
    // When any of the form control value in employee form changes
    // our validation function logValidationErrors() is called
    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });
  }

  //Contact Preference
  onContactPreferenceChange(selectedValue: string) {
    const emailFormControl = this.employeeForm.controls.emailGroup.get('email');
    const confirmEmail = this.employeeForm.controls.emailGroup.get('confirmEmail');
    const phoneFormControl = this.employeeForm.get('phone');
    const emailGroup = this.employeeForm.get('emailGroup');
    const phone = this.employeeForm.get('phone');

    if (selectedValue == 'email') {
      emailFormControl.setValidators([Validators.required, CustomValidators.emailDomain('domain.com')]);
      confirmEmail.setValidators(Validators.required);
      // emailGroup.enable();
      // phone.disable();
    } else {
      emailFormControl.clearValidators();
    }
    emailFormControl.updateValueAndValidity();

    if (selectedValue == 'phone') {
      emailFormControl.setValidators(CustomValidators.emailDomain('domain.com'));
      phoneFormControl.setValidators(Validators.required);
      // emailGroup.disable();
      // phone.enable();
    } else {
      phoneFormControl.clearValidators();
    }
    phoneFormControl.updateValueAndValidity();
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      this.formErrors[key] = '';
        if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];

          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      if (abstractControl instanceof FormGroup) {
        //abstractControl.disable();

        //Recursively call the method to loop through nested formgroups
        this.logValidationErrors(abstractControl);
      }
    });
  }


  onLoadDataClick(): void {
    const formArray = new FormArray([
      new FormControl('John', Validators.required),
      new FormGroup({
        country: new FormControl('', Validators.required)
      }),
      new FormArray([])
    ]);

    const formArray1 = this.fb.array([
      new FormControl('John', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('', Validators.required)
    ]);

    const formGroup = this.fb.group([
      new FormControl('John', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('', Validators.required)
    ]);
    // formArray1.push(new FormControl('Mark', Validators.required));
    console.log(formArray1);
    console.log(formGroup);
    // console.log(formArray.length);
    // for (const control of formArray.controls){
    //   if (control instanceof FormControl){
    //     console.log('Control is FormControl');
    //   }
    //   if (control instanceof FormArray){
    //     console.log('Control is FormArray');
    //   }
    //   if (control instanceof FormGroup){
    //     console.log('Control is FormGroup');
    //   }
    }




  onSubmit(): void {
    console.log(this.employeeForm.touched);
    console.log(this.employeeForm.value);

    console.log(this.employeeForm.controls.fullName.touched);
    console.log(this.employeeForm.get('fullName').value);
  }

}

function matchEmail(group: AbstractControl): { [key: string]: any} | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');

  if(emailControl.value === confirmEmailControl.value || confirmEmailControl.pristine){
    return null;
  }else{
    return { 'emailMismatch': true };
  }
}

