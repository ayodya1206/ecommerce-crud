import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConstantURL as constantURL } from '../../../../../shared/constants/constant-urls'
import { SubCategories } from '../models/sub-categories';
import { Category } from '../../categories/models/category';
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
export class SubCategoriesService {

  /* --------------------------------- FIELDS -------------------------------- */
  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    private _httpClient: HttpClient
  ) { }
  /* ----------------------------- NG-LIFE-CYCLES ----------------------------- */
  ngOnInit(): void {
  }
  /* ------------------------------ CUSTOM-METHODS ----------------------------- */
   // TODO GET ALL CATEGORIES
   getAllCategories(): Observable<Category[]> {
    return this._httpClient.get<Category[]>(constantURL.CONST_CATEGORIES_URL, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  // TODO ADD CATEGORIES
  addSubCategories(categoriesData: any): Observable<SubCategories> {
    return this._httpClient.post<SubCategories>(constantURL.CONST_SUB_CATEGORIES_URL, categoriesData, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  // TODO GET ALL CATEGORIES
  getAllSubCategories(): Observable<SubCategories[]> {
    return this._httpClient.get<SubCategories[]>(constantURL.CONST_SUB_CATEGORIES_URL, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  // TODO GET CATEGORIES BY ID
  getSubCategoriesByID(categoryId: any): Observable<SubCategories> {
    return this._httpClient.get<SubCategories>(constantURL.CONST_SUB_CATEGORIES_URL + '/' + categoryId, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  // TODO EDIT CATEGORIES METHOD
  updateSubCategoriesById(id: string, categoriesData: SubCategories): Observable<any> {
    return this._httpClient.put(constantURL.CONST_TENETS_URL + '/' + id, categoriesData, httpOptions).pipe(
      catchError(this.handleError)
    )
  }
  // TODO REMOVE CATEGORIES BY ID
  deleteSubCategoriesByID(categoryId: any): Observable<any> {
    return this._httpClient.delete(constantURL.CONST_SUB_CATEGORIES_URL + '/' + categoryId, httpOptions).pipe(
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
