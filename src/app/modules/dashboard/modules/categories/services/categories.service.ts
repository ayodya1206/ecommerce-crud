import { catchError } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { ConstantURL as constantURL } from '../../../../../shared/constants/constant-urls'
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Content-Type': 'application/json',
//     'Authorization': 'my-auth-token',
//     'cache-control': 'no-cache',
//     'Access-controls-Allow-Headers': 'Content-Type',
//     'Access-Control-Allow-Methods': 'PUT,POST,GET,OPTIONS',
//     'Access-Control-Allow-Origin': '*'
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categories:Array<any> = [];
  newSubject = new Subject();
 public newSubscriber = this.newSubject.asObservable();


  /* --------------------------------- FIELDS -------------------------------- */
  /* ------------------------------- CONSTRUCTOR ------------------------------ */
  constructor(
    private _httpClient: HttpClient
  ) { 
    this.categories = [
      {
        id:1,
        name:'Mobile'
      },
      {
        id:2,
        name:'TV'
      },
      {
        id:3,
        name: 'Fans'
      }
    ]
  }
  /* ----------------------------- NG-LIFE-CYCLES ----------------------------- */
  ngOnInit(): void {
  }
  /* ------------------------------ CUSTOM-METHODS ----------------------------- */
  // TODO DATA SENDING THROUGH THE SUBJECT
      emitData(data:any) {
      this.newSubject.next(this.categories)
    }
  // TODO ADD CATEGORIES
  addCategories(categoriesData: any): Observable<Category> {
    return this._httpClient.post<Category>(constantURL.CONST_CATEGORIES_URL, categoriesData).pipe(
      catchError(this.handleError)
    )
  }
  // TODO GET ALL CATEGORIES
  getAllCategories(): Observable<Category[]> {
    return this._httpClient.get<Category[]>(constantURL.CONST_CATEGORIES_URL).pipe(
      catchError(this.handleError)
    )
  }
  // TODO GET CATEGORIES BY ID
  getCategoriesByID(categoryId: any): Observable<Category> {
    return this._httpClient.get<Category>(constantURL.CONST_CATEGORIES_URL + '/' + categoryId).pipe(
      catchError(this.handleError)
    )
  }
  // TODO EDIT CATEGORIES METHOD
  updateCategoriesById(id: string, categoriesData: Category): Observable<any> {
    return this._httpClient.put(constantURL.CONST_TENETS_URL + '/' + id, categoriesData).pipe(
      catchError(this.handleError)
    )
  }
  // TODO REMOVE CATEGORIES BY ID
  deleteCategoriesByID(categoryId: any): Observable<any> {
    return this._httpClient.delete(constantURL.CONST_CATEGORIES_URL + '/' + categoryId).pipe(
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
