import { catchError } from 'rxjs/operators';
import { ConstantURL } from './../constants/constant-urls';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantURL as constantURL } from '../../shared/constants/constant-urls';
import { Observable } from 'rxjs';
import { TentImage } from 'src/app/modules/dashboard/modules/user-management/models/tenets';
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
export class SharedService {
  /* --------------------------------- FIELDS -------------------------------- */
  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    private _httpClient: HttpClient
  ) { }
  /* ------------------------------ CUSTOM-METHODS ----------------------------- */
  // TODO GET ALL ROLE ACCESS
  getRoleAccess(): Observable<any> {
    return this._httpClient.get(constantURL.CONST_ROLE_ACCESS_URL, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  // TODO GET ALL ROLE
  getRole(): Observable<any> {
    return this._httpClient.get(constantURL.CONST_ROLES_URL, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  // TODO GET ALL IMAGES
  addImages(imgData: any): Observable<TentImage> {
    return this._httpClient.post<TentImage>(constantURL.CONST_IMAGES_ULR, imgData).pipe(
      catchError(this.handleError)
    )
  }
  // TODO GET ALL IMAGES
  getImageAllImages(): Observable<any> {
    return this._httpClient.get(constantURL.CONST_IMAGES_ULR).pipe(
      catchError(this.handleError)
    )
  }
  //  TODO DELETE IMAGE BY ID
  removeImageByPhone(phone:any):Observable<any> {
    return this._httpClient.delete(constantURL.CONST_IMAGES_ULR+'/'+phone).pipe(
      catchError(this.handleError)
    )
  }
  private handleError(error: any): Promise<any> {
    console.log('An error occured ', error);
    return Promise.reject(error.message || error);
  }
}
