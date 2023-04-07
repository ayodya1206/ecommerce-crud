import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { ConstantURL as constantURL } from '../../../../../shared/constants/constant-urls'
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
export class CategoriesService {

  /* --------------------------------- FIELDS -------------------------------- */
  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    private _httpClient: HttpClient
  ) { }
  /* ----------------------------- NG-LIFE-CYCLES ----------------------------- */
  ngOnInit(): void {
  }
  /* ------------------------------ CUSTOM-METHODS ----------------------------- */
  // TODO ADD CATEGORIES
  addCategories(categoriesData: any): Observable<Category> {
    return this._httpClient.post<Category>(constantURL.CONST_CATEGORIES_URL, categoriesData, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  // TODO GET ALL CATEGORIES
  getAllCategories(): Observable<Category[]> {
    return this._httpClient.get<Category[]>(constantURL.CONST_CATEGORIES_URL, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  // TODO GET CATEGORIES BY ID
  getCategoriesByID(categoryId: any): Observable<Category> {
    return this._httpClient.get<Category>(constantURL.CONST_CATEGORIES_URL + '/' + categoryId, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  // TODO EDIT CATEGORIES METHOD
  updateCategoriesById(id: string, categoriesData: Category): Observable<any> {
    return this._httpClient.put(constantURL.CONST_TENETS_URL + '/' + id, categoriesData, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  // TODO REMOVE CATEGORIES BY ID
  deleteCategoriesByID(categoryId: any): Observable<any> {
    return this._httpClient.delete(constantURL.CONST_CATEGORIES_URL + '/' + categoryId, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  /* --------------------------------- GETTERS --------------------------------- */
  extractData(res: Response) {
    const body = res.json();
    return body;
  }
  private handleError(error: any): Promise<any> {
    console.log('An error occured ', error);
    return Promise.reject(error.message || error);
  }
}
