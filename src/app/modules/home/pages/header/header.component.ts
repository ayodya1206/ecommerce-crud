import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  /* --------------------------------- FIELDS -------------------------------- */
  showCart: boolean = false;
  notificationsCount: number = 0;
  userName!: string;
  userLoginDetails!: any;
  isLoggedIn:boolean = false;
  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    private _router: Router
  ) { }
  /* ----------------------------- NG-LIFE-CYCLES ----------------------------- */
  ngOnInit(): void {
    // TODO SET WHO AM I USER
    this.userLoginDetails = localStorage.getItem('loginDetails');
    console.log(this.userLoginDetails)
    if(this.userLoginDetails) {
      this.isLoggedIn = true;
    }else{
      this.isLoggedIn = false;
    }
  }
  /* ------------------------------ CUSTOM-METHODS ----------------------------- */
  // TODO LOGIN METHOD
  gotoLogin() {
    this._router.navigate(['/login'])
  }
  // TODO LOGOUT METHOD
  logOut(){
    this._router.navigate(['./home']);
    localStorage.clear();
    localStorage.removeItem('user Role');
  }
  /* --------------------------------- GETTERS --------------------------------- */
}
