import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An Error occurred';
        if (error.error instanceof ErrorEvent) {
          // Client-side errors
          errorMessage = error.error.message;
        } else {
          // Backend errors
          errorMessage = error.error.errorMessage || errorMessage
        }
        // Display the error message
        this.snackBar.open(errorMessage, 'close', {
          duration: 5000,
          panelClass: 'error-snackbar'
        });
        return throwError(errorMessage);
      })
    )
  }
}
