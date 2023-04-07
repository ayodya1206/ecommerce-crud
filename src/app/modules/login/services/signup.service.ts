import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signup } from '../models/signup';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  apiURL: string = ' http://localhost:3000/tenets';

  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    private _http: HttpClient
  ) { }

  /* ------------------------------ CUSTOM-METHODS ----------------------------- */
  // TODO SIGNUP USERS
  proceedSignup(inputData: any): Observable<Signup> {
    const options = {
      headers: new HttpHeaders(
        {
          "Content-Type": "application/json",
          "cache-control": "no-cache",
          "Access-Control-Allow-Headers": "Content-Type",
          "Access-Control-Allow-Method": "PUT,POST,GET,OPTIONS",
          "Access-Control-Allow-Origin": "*"
        }
      )
    }
    return this._http.post<Signup>(this.apiURL, inputData, options);
  }
}
