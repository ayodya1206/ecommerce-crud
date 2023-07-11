import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantURL as constantURL } from '../../../../../shared/constants/constant-urls'
import { Banner } from '../model/banner';
import { Observable } from 'rxjs';

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
export class BannerService {
  /* --------------------------------- FIELDS -------------------------------- */
  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    private _http: HttpClient
  ) { }
  /* ------------------------------ CUSTOM-METHODS ----------------------------- */
  // TODO GET ALL BANNER SERVICE METHOD
  getAllBanner(): Observable<Banner[]> {
    return this._http.get<Banner[]>(constantURL.CONST_BANNER_URL, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  // TODO ADD BANNER SERVICE METHOD
  addBanner(bannerData: any): Observable<Banner> {
    return this._http.post<Banner>(constantURL.CONST_BANNER_URL, bannerData, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  // TODO EDIT BANNER BY ID SERVICE METHOD
  updateBannerByID(id:any){
    return this._http.put(constantURL.CONST_BANNER_URL + '/' + id, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
    // TODO DELETE BANNER BY ID SERVICE METHOD
    deleteBannerByID  (id:any){
      return this._http.delete(constantURL.CONST_BANNER_URL + '/' + id, httpOptions).pipe(
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
