import { SharedService } from './../../../../shared/services/shared.service';
import { LoginService } from './../../services/login.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /* --------------------------------- FIELDS -------------------------------- */
  loginForm!: FormGroup;
  subscription: Array<Subscription> = [];
  loginData: any;
  loginDetails: any;
  userEmail: any;
  userRole: any;
  userStatus: any;
  rolesArray: any;
  rolesDetails: any;
  rolesObject: any;
  currentUserRole: any;
  menuAccessRole: any;
  pushRoleAccessToArray: any[] = [];
  loginContent:boolean = false;
  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    private _router: Router,
    private _formBuilder: FormBuilder,
    private _toaster: ToastrService,
    private _loginService: LoginService,
    private _sharedService: SharedService
  ) {
      if(localStorage.getItem('loginDetails')){
        this.loginContent = true;
      }
  }
  /* ----------------------------- NG-LIFE-CYCLES ----------------------------- */
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]],
      // role: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  /* ------------------------------ CUSTOM-METHODS ----------------------------- */
  // TODO ROUTE TO SIGNUP PAGE
  goToSignup() {
    // this._router.navigate(['../../signup']);
  }
  // TODO LOGIN FUNCTIONALITY
  onSubmitLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this._toaster.warning('Please enter valid data')
      return
    } try {
      if (this.loginForm.valid) {
        // TODO LOGIN SET IN LOCAL STORAGE
        this._loginService.getAllTenets().subscribe(
          (res: any) => {
            const user = res.find(
              (u: any) => {
                return u.email === this.loginForm.value.email && u.password === this.loginForm.value.password
              });
            if (user) {
              console.log(user);
              this._toaster.success('LoggedIn Successfully');
              this._router.navigate(['./home']);
              this.loginDetails = {
                'userName': user.tenetName,
                'userEmail': user.email,
                'userRole': user.role,
                'userStatus': user.status,
              }
              this.currentUserRole = user.role;
              // console.log('LoggedIn User Role');
              // console.log(this.currentUserRole);
              localStorage.setItem('userRole', user.role);
              if (!localStorage.getItem('loginDetails')) {
                localStorage.setItem('loginDetails', JSON.stringify(this.loginDetails));
              }

            } else {
              this.loginForm.markAllAsTouched();
              this._toaster.error('The credentials are not match with data base');
            }
          }
        );
        // TODO ROLES SET IN LOCAL STORAGE        
        this._sharedService.getRoleAccess().subscribe(
          (res: any) => {
            this.rolesDetails = res;
            // console.log(this.rolesDetails);
            this.rolesObject = this.rolesDetails;
            // console.log('Roles Object  Details');
            // console.log(this.rolesObject);
            for (let i = 0; i < this.rolesDetails.length; i++) {
              this.menuAccessRole = this.rolesDetails[i].role;
              if (this.currentUserRole == this.menuAccessRole) {
                // console.log(this.menuAccessRole);
                this.rolesObject = {
                  'menu': this.rolesDetails[i].menu_id,
                  'haveMenuAccess': this.rolesDetails[i].haveMenuAccess,
                  'haveAddAccess': this.rolesDetails[i].haveAdd,
                  'haveViewAccess': this.rolesDetails[i].haveView,
                  'haveEditAccess': this.rolesDetails[i].haveEdit,
                  'haveDeleteAccess': this.rolesDetails[i].haveDelete,
                }

                // console.log(this.rolesObject);
                this.pushRoleAccessToArray.push(this.rolesObject);
                // console.warn('This roles Array');
                // console.log(this.pushRoleAccessToArray);
                // if (localStorage.getItem(this.loginDetails)) { }
                // console.log(this.pushRoleAccessToArray);
                // console.log(this.pushRoleAccessToArray.length);
                localStorage.setItem('accessCheckByRoles', JSON.stringify(this.pushRoleAccessToArray));
              }
            }
          }
        );
      } else {
        this._toaster.warning('You enter invalid credentials')
      }
    } catch (error) {
      console.log(error)
    }
  }
  /* ---------------------------------  GETTERS --------------------------------- */

  get email() {
    return this.loginForm.get('email') as FormControl;
  }
  get password() {
    return this.loginForm.get('password') as FormControl;
  }
}
