import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe( 
      map( (event: HttpEvent<any>) => {
        if(event instanceof HttpResponse){
          const formatResponse = this.formatResponse(event.body);
          return event.clone( {body: formatResponse} );
        }
        return event
      } )
    )
  }

  private formatResponse(response:any):any {
    return this.convertKeysToCamelCase(response)
  }
  private convertKeysToCamelCase(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map(item => this.convertKeysToCamelCase(item));
    }

    return Object.keys(obj).reduce((acc, key) => {
      const camelCaseKey = this.toCamelCase(key);
      acc = this.convertKeysToCamelCase(obj[key]);
      return acc;
    }, {});
  }
  private toCamelCase(key: string): string {
    return key.replace(/([-_][a-z])/gi, ($1) => $1.toUpperCase().replace('-', '').replace('_', ''));
  }
}
