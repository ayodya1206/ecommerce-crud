import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const API_KEY ='API_KEY_96767175125_007';
    const httpReqHeader = request.clone({
      setHeaders: {
        'API_URL': request.url,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
        'Authorization': 'my-auth-token',
        'Access-controls-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,OPTIONS',
        'Access-Control-Allow-Origin': '*',
        'api_key': API_KEY,
      }
    })
    return next.handle(httpReqHeader);
  }
}
