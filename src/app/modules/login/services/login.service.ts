import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
  proceedLogin(email: any, password: any): Observable<any> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'cache-control': 'no-cache',
      'Authorization': 'my-auth-token',
      'Access-controls-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'PUT,POST,GET,OPTIONS',
      'Access-Control-Allow-Origin': '*'
    })
    const options = ({ headers: headers });
    return this._httpClient.get(this.apiURL + '/' + 'email=' + email + '&' + 'password=' + password, options);
  }
  // TODO IS LOGEDIN
  isLoggedIn() {
    return localStorage.getItem('loginDetails') != null
  }
  // TODO GET USER ROLE
  getUserRole() {
    return localStorage.getItem('userRole') != null ? localStorage.getItem('userRole')?.toString() : ''
  }
}
