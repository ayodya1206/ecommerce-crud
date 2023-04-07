import { Router } from '@angular/router';
import { SignupService } from './../../services/signup.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  /* --------------------------------- FIELDS -------------------------------- */
  signUpForm!: FormGroup;
  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    private _formBuilder: FormBuilder,
    private _toaster: ToastrService,
    private _signupService: SignupService,
    private _router: Router
  ) { }
  /* ----------------------------- NG-LIFE-CYCLES ----------------------------- */
  ngOnInit(): void {
    this.signUpForm = this._formBuilder.group({
      tenetName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['+91', [Validators.required, Validators.pattern(/(\+91)[5-9]{1}[0-9]{9}/)]],
      gender: ['MALE', Validators.required],
      role: [''],
      status: ['']
    });
  }
  /* ------------------------------ CUSTOM-METHODS ----------------------------- */
  async onSubmitSignUp(): Promise<any> {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      this._toaster.warning('Please fill the valid details');
      return
    } try {
      if (this.signUpForm.valid) {
        this._signupService.proceedSignup(this.signUpForm.value).subscribe(
          (res: any) => {
            if (res) {
              this.signUpForm.reset();
              this._toaster.success('Signup successfully completed');
              this.signUpForm.markAsPristine();
              this.signUpForm.markAllAsTouched();
              this._router.navigate(['/login'])
            } else {
              this._toaster.warning('Unable to signup')
            }
          }
        )
      }
    } catch (error: any) {
      console.log(error);
      this.signUpForm.reset();
    }
  }
  goToSignIn() {
    this._router.navigate(['./login']);
  }
  /* --------------------------------- GETTERS --------------------------------- */
  // GETTERS
  get tenetName() {
    return this.signUpForm.get('tenetName') as FormControl;
  }
  get email() {
    return this.signUpForm.get('email') as FormControl;
  }
  get password() {
    return this.signUpForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword') as FormControl;
  }
  get phone() {
    return this.signUpForm.get('phone') as FormControl;
  }
  get gender() {
    return this.signUpForm.get('gender') as FormControl;
  }

}
