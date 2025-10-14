import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
  AsyncValidatorFn,
  
  
} from '@angular/forms';
import { map, catchError, of } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  userForm!: FormGroup;

  constructor(private fb: FormBuilder, private http:HttpClient) {}

  ngOnInit(): void {
    this.userForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)], [this.usernameTakenValidator()]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
        phone: [''],
        preferredContact: ['', Validators.required]
      },
      {
        
        validators: [this.passwordsMatchValidator(), this.contactMethodValidator()]
      }
    );

    this.userForm.get('preferredContact')?.valueChanges.subscribe(value => {
      const phoneControl = this.userForm.get('phone');
      const emailControl = this.userForm.get('email');

      if (value === 'phone') {
       
        phoneControl?.setValidators([Validators.required]);
        emailControl?.setValidators([Validators.email]);
      } else if (value === 'email') {
        
        emailControl?.setValidators([Validators.required, Validators.email]);
        phoneControl?.clearValidators();
      } else {
        
        phoneControl?.clearValidators();
        emailControl?.clearValidators();
      }

      phoneControl?.updateValueAndValidity();
      emailControl?.updateValueAndValidity();
    });
  }

  passwordsMatchValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const password = form.get('password')?.value;
      const confirm = form.get('confirmPassword')?.value;
      return password && confirm && password !== confirm
        ? { passwordMismatch: true }
        : null;
    };
  }

  contactMethodValidator(): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
      const contact = form.get('preferredContact')?.value;
      if (!contact) {
        return { contactMissing: true };
      }
      return null;
    };
  }

  usernameTakenValidator(): AsyncValidatorFn{
    return (control:AbstractControl)=>{
      const enteredName=control.value?.trim();
      if(!enteredName){
        return of(null);
      }
      return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users').pipe(
        map(users=>{
          const taken = users.some(u=>u.username.toLowerCase()===enteredName.toLowerCase());
          return taken?{usernameTaken: true}:null;
        }),
        catchError(()=>of(null))
      )
    }
  }

  get f() {
    return this.userForm.controls;
  }



  
  onSubmit() {
    this.userForm.markAllAsTouched();
    this.userForm.updateValueAndValidity();

    if (this.userForm.invalid) {
      console.log('Form invalid:', this.userForm.errors);
      return;
    }

    console.log(' Form Submitted:', this.userForm.value);
    this.userForm.reset();
  }
}

