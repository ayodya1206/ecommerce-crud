import { Tenets } from './../models/tenets';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantURL as constantURL } from '../../../../../shared/constants/constant-urls'
import { catchError, map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token',
    'cache-control': 'no-cache',
    'Access-controls-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,OPTIONS',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TenetsService {
  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    private _httpClient: HttpClient,
  ) {

  }
  /* ------------------------------ CUSTOM-METHODS ----------------------------- */
  // TODO GET ALL TENETS SERVICE METHOD
  getAllTenets(): Observable<any> {
    return this._httpClient.get(constantURL.CONST_TENETS_URL, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  // TODO GET TENETS BY ID SERVICE METHOD
  getTenetByID(id: any): Observable<any> {
    return this._httpClient.get(constantURL.CONST_TENETS_URL + '/' + id, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  // TODO ADD TENETS SERVICE METHOD
  addTenets(inputData: any): Observable<Tenets> {
    return this._httpClient.post<Tenets>(constantURL.CONST_TENETS_URL, inputData, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  // TODO EDIT TENETS SERVICE METHOD
  updateTenetById(id: string, inputData: Tenets): Observable<any> {
    return this._httpClient.put(constantURL.CONST_TENETS_URL + '/' + id, inputData, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  // TODO DELETE TENET BY ID
  deleteTenetByID(id: any):Observable<any> {
   return this._httpClient.delete(constantURL.CONST_TENETS_URL + '/' + id, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  extractData(res: Response) {
    const body = res.json();
    return body;
  }
  private handleError(error: any): Promise<any> {
    console.log('An error occured ', error);
    return Promise.reject(error.message || error);
  }
}
