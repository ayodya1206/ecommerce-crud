import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiURL: string = ' http://localhost:3000/tenets';
  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    private _httpClient: HttpClient
  ) { }

  /* ------------------------------ CUSTOM-METHODS ----------------------------- */
  getAllTenets(): Observable<any> {
    debugger
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'cache-control': 'no-cache',
      'Authorization': 'my-auth-token',
      'Access-controls-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,OPTIONS',
      'Access-Control-Allow-Origin': '*'
    });
    const options = ({ headers: headers })
    return this._httpClient.get(this.apiURL, options);
  };
  //  TODO GET BY TENET ID
  proceedLogin(login:Login): Observable<any> {
    debugger
    // const headers = new HttpHeaders({
    //   'content-type': 'application/json',
    //   'cache-control': 'no-cache',
    //   'Authorization': 'my-auth-token',
    //   'Access-controls-Allow-Headers': 'Content-Type',
    //   'Access-Control-Allow-Methods': 'PUT,POST,GET,OPTIONS',
    //   'Access-Control-Allow-Origin': '*'
    // })
    // const options = ({ headers: headers });
    return this._httpClient.get(this.apiURL + '/' + 'email=' + login.email + '&' + 'password=' + login.password);
  }
  // TODO IS LOGEDIN
  isLoggedIn() {
    return localStorage.getItem('loginDetails') != null // TODO It will return true when local storage has loginDetails & It will return false Local Storage don't have LoginDetails
  }
  // TODO GET USER ROLE
  getUserRole() {
    return localStorage.getItem('userRole') != null ? localStorage.getItem('userRole')?.toString() : ''
  }
  getToke() {
    return localStorage.getItem('token') || ''
  }
}
